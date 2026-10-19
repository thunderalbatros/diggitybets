# 📚 Libro Completo: Atomic Design (Edición Español)

**Alcance:** Fuente bibliográfica completa sobre Metodología Atomic Design: Átomos, Moléculas, Organismos, Plantillas y Páginas para Sistemas de Diseño Web (Atomic Design (Edición Español) — Brad Frost). Aplicable a la Software Factory Web y DiggityBets. NO sustituye los contratos de API de Kick ni las reglas específicas de negocio en `CANON_*`.

> **Autor:** Brad Frost  
> **Dominio:** Metodología Atomic Design: Átomos, Moléculas, Organismos, Plantillas y Páginas para Sistemas de Diseño Web  
> **Archivo Fuente:** `Atomic-Design-Brad-Frost-Spanish.pdf`  
> **Páginas Originales:** 178  
> **Secciones Extraídas:** 89  
> **Fecha de Ingesta:** 2026-10-19  

---

## Sección 1: Foundations & Introduction

Diseño atómico
Brad Frost

-- 1 of 178 --

Diseño atómico
Brad Frost

-- 2 of 178 --

Tabla de contenido
1. Diseño de sistemas Crea sistemas de diseño, no páginas 8
2. Metodología de diseño atómico Átomos, moléculas, organismos, plantillas y
páginas. 38
3. Herramientas del oficio Pattern Lab y las cualidades de las guías de estilo
efectivas 64
4. El flujo de trabajo atómico Personas, procesos y cómo hacer realidad los
sistemas de diseño 94
5. Mantenimiento de sistemas de diseño Hacer que los sistemas de diseño resistan la prueba del tiempo 142
Gracias y agradecimientos
Recursos
184
Sobre el Autor 191

-- 3 of 178 --

Copyright © 2016 Brad Frost Todos los derechos reservados
Editorial: Brad Frost
Redactor: Owen Gregory
Diseñador de libros impresos: Rachel Arnold Sager
Diseñador de libros electrónicos: Rachel Andrew
ISBN: 978-0-9982966-0-9
Creado con orgullo en Pittsburgh, Pensilvania

-- 4 of 178 --

6 DISEÑO ATÓMICO
Prefacio
Era 2013 y nos acurrucamos con Brad Frost y Jennifer Brook alrededor de una mesa de
cocina iluminada por el sol en Brooklyn. Los cuatro acabábamos de comenzar a trabajar en
un nuevo sitio web para TechCrunch, y estábamos dibujando estructuras alámbricas en el
apartamento de Jennifer, luchando con las nuevas demandas del diseño receptivo. Brad
sacó su computadora portátil: "He estado jugando con una nueva idea".
La pantalla de Brad parecía como si una página web hubiera explotado. Los bits y las piezas de la
interfaz de usuario flotaban libres entre sí, sin ataduras por un diseño o una jerarquía unificados.
Parecía un montón de piezas de repuesto de un garaje web.
Brad mostró su sonrisa loca y asintió con la cabeza, "Genial, ¿verdad?" Los tres le
devolvimos la mirada sin comprender. Alguien tosió.
Y luego Brad Frost, el desarrollador front-end, comenzó a hablar como Brad
Frost el químico. Habló de átomos, moléculas y organismos.
- acerca de cómo las piezas grandes de diseño se pueden dividir en piezas más
pequeñas e incluso recombinarlas en diferentes piezas grandes. En lugar de
de visualizar la receta terminada para el diseño, en otras palabras, nos estaba
mostrando los ingredientes. Y nos iluminamos: este fue un cambio de perspectiva,
una forma de dejar de concebir el diseño de un sitio web como una colección de
plantillas de página estáticas y, en cambio, como un sistema dinámico de
componentes adaptables. Fue una forma inspirada de abordar este sitio web
receptivo, y todos los proyectos receptivos para el caso.
La nueva idea de Brad fue el diseño atómico y cambió la forma en que trabajamos en
este mundo asombrosamente multidispositivo. Al pensar en interfaces
simultáneamente tanto a nivel grande (página) como a nivel pequeño (atómico),
optimizamos nuestro proceso: introdujimos un pensamiento más riguroso en el papel
de cada elemento; caímos en hábitos que mejoraron la consistencia de nuestra UX; y lo
que es más importante, comenzamos a trabajar mucho más rápido y de manera más
colaborativa. El diseño atómico fue nuestro superpoder.
En las primeras etapas del rediseño de TechCrunch, hubo un momento en el que
hablamos sobre lo que queríamos que fuera la página del artículo. En una hora,
Brad tenía una versión totalmente receptiva conectada a su kit de piezas. Ese fue
el momento en que nos dimos cuenta de lo rápido que íbamos a poder
movernos, un caso poderoso para invertir en este enfoque modular inteligente.
Casi cuatro años después, no hemos mirado atrás. Brad continuó
refinando sus técnicas y herramientas en los proyectos que siguieron,

-- 5 of 178 --

ADELANTE 7
incluyendo sitios de gran éxito para Entertainment Weekly y Time, Inc. Hemos
utilizado estas lecciones para ayudar a los equipos de productos internos a hacer
sitios más rápidos y con mayor calidad, construir sistemas de diseño masivos para
organizaciones que buscan centralizar su trabajo de diseño y desarrollo en oficinas
internacionales, y mucho más.
El diseño atómico nos dio velocidad, libertad creativa y flexibilidad.
Cambió todo. Creemos que también hará lo mismo por usted.
Este maravilloso libro explica la filosofía, la práctica y el
mantenimiento de los sistemas de diseño atómico. Y lo hace con la
generosidad alegre y servicial que así describe al propio Brad.
La energía y el gran entusiasmo de Brad por la web y sus creadores son
ilimitados. Durante años, Brad ha trabajado a la vanguardia de la técnica de
diseño receptivo, y lo ha compartido todo a lo largo del camino. Su sitio This Is
Responsive es el recurso de referencia para encontrar soluciones receptivas a
cualquier problema de UX. Su blog y los feeds de Twitter comparten sus
obstáculos y sus soluciones. Cuando los diseñadores y desarrolladores siguen a
Brad Frost, obtienen un flujo rápido y denso de información práctica y
apasionada para crear sitios web hermosos y resistentes. Este libro se duplica
en todo eso.
Si tuviera la oportunidad, Brad llamaría a la puerta de cada diseñador y
desarrollador para entregar personalmente su mensaje. Hemos visto con asombro
(y una leve envidia) cómo este derviche giratorio ha viajado por todo el mundo
para compartir sus consejos con cientos de equipos y organizaciones en seis
continentes. (
¡Diseño atómico, próximamente en la Antártida!) Pero incluso Brad
Frost no puede estar en todas partes a la vez, y estamos encantados de que haya
detallado sus ideas con tanta profundidad y buen humor en este libro.
El diseño atómico está explotando en todo el mundo; transformó nuestra
práctica de diseño; y estamos emocionados de que también traiga la misma
combustión creativa a su proceso.
- Josh Clark y Dan Mall , Colaboradores frecuentes de Brad y sus mayores
admiradores

-- 6 of 178 --

8 DISEÑO ATÓMICO
7 http://www.uie.com/articles/magic_escalator/
8 http://en.wikipedia.org/wiki/Scrum_%28software_development%29
Crea sistemas de diseño, no páginas
Diseño
Sistemas

---

## Sección 2: CAPÍTULO 1 / DISEÑO DE SISTEMAS 9

-- 7 of 178 --

Hace mucho, mucho tiempo, existían estas cosas llamadas
libros.
¿Recuerdalos? Estos artilugios eran pesados y voluminosos y estaban
hechos de la pulpa de árboles muertos. Dentro de estos libros había
cosas llamadas
páginas. Los volteaste y te cortaron los dedos.
Cosas horribles. Estoy muy contento de que estos libros con sus páginas
nítidas ya no estén disponibles.
Oh espera…
Nuestro pasado paginado
La página ha estado con nosotros durante mucho tiempo. En realidad, unos milenios.
Los primeros libros fueron gruesas losas de arcilla creadas hace unos 4.000 años, pronto
reemplazadas por rollos como la forma preferida de consumir la palabra escrita. Y
aunque la tecnología de lectura ha recorrido un largo camino, desde el papiro hasta el
pergamino, el libro de bolsillo y los píxeles, el concepto de página se mantiene fuerte
hasta el día de hoy.
La metáfora de la página se ha incorporado al léxico de la web desde el
principio. Tim Berners-Lee inventó la World Wide Web para que él, sus
colegas del CERN y otros académicos pudieran compartir y vincular
fácilmente su mundo de
documentos. Esta génesis académica de la web
basada en documentos es la razón por la que el concepto de página está tan
profundamente arraigado en el vocabulario de Internet.
¿Y qué?
Como veremos a lo largo de este libro, la forma en que se nombran las cosas tiene un
gran impacto en la forma en que se perciben y utilizan. Pensar en la web como páginas
tiene ramificaciones reales en la forma en que las personas interactúan con las
experiencias web e influye en la forma en que creamos interfaces web.
Desde el principio, la metáfora de la página proporcionó a los usuarios un lenguaje
familiar con el que navegar por esta nueva y valiente World Wide Web. Conceptos como
los marcadores y la paginación ayudaron a los nuevos usuarios de la web a explorar y
eventualmente dominar un medio completamente nuevo usando convenciones con las
que ya se sentían cómodos.

-- 8 of 178 --

10 DISEÑO ATÓMICO
La página fue, y sigue siendo, una metáfora muy visible y útil para los
usuarios de la web. También tiene una profunda influencia en cómo se
crean las experiencias web.
En los primeros días de la web, las empresas que buscaban conectarse a Internet
simplemente traducían sus materiales impresos a sus sitios web. Pero a pesar de
que estos sitios web de folletos ofrecían una perspectiva muy unidimensional de
lo que la web podía ofrecer, ver los sitios web como representaciones digitales de
la página impresa era fácil de entender para los creadores.
Pero ahora llevamos 25 años en este nuevo medio, y esta forma de expresión que
alguna vez fue necesaria ha superado su bienvenida. Desafortunadamente, el La
metáfora de la página sigue siendo profunda con respecto a cómo alcanzamos
y ejecutamos nuestros proyectos web. Aquí hay algunos ejemplos que escucho
con regularidad:
“Somos una startup que busca lanzar cinco
página sitio web este
octubre ... "
"Brad, ¿cuánto tiempo durará la casa
página tomar para construir? "
“¿Cómo vamos a rediseñar este sitio web de la universidad que
contiene más de 30.000
páginas? "
El navegador Chrome muestra el mensaje "Esta página web no está disponible".

-- 9 of 178 --

---

## Sección 3: CAPÍTULO 1 / DISEÑO DE SISTEMAS 11

Todas las afirmaciones anteriores cometen el error fundamental de
asumir que una página es algo uniforme, aislado y cuantificable. La
realidad es que la web es un medio fluido, interactivo e
interdependiente. Tan pronto como aceptamos este hecho, la noción de
página se erosiona rápidamente como un medio útil de alcance y
creación de experiencias web.
¿Cuánto tiempo tardará en construirse una página de inicio? Bueno, eso
depende de lo que contenga, ¿verdad? Tal vez la página de inicio simplemente
consista en un lema y una imagen de fondo, lo que significa que podría estar
listo para el almuerzo. O tal vez esté repleto de carruseles, formas dinámicas e
integraciones de terceros. En ese caso, es posible que la página de inicio tarde
varios meses en completarse.
En cuanto al sitio web de la universidad de 30.000 páginas, podría ser
tentador declarar: “¡¿Miles de páginas ?! ¡Vaya, eso suena desafiante! " Pero
en realidad, esas 30.000 páginas pueden constar de tres tipos de contenido
y dos diseños generales.
En última instancia, el nivel de esfuerzo de un proyecto está mucho mejor
determinado por la funcionalidad y componentes contenido dentro de esas
páginas, en lugar de en la cantidad de páginas en sí.
La metáfora de la página ha cumplido su propósito de ayudar a los usuarios a
familiarizarse con la web y ha proporcionado a los creadores el lenguaje de
transición necesario con el que crear para un medio completamente nuevo. Pero
para construir interfaces bien pensadas destinadas a servir a una multitud de
dispositivos conectados, ha llegado el momento de evolucionar más allá de la
página.
Rompiendo la página
Afortunadamente, la comunidad web está trabajando arduamente
para establecer principios y prácticas que nos ayuden a hablar y crear
para la web de manera eficaz. Y hay un concepto que sigue
apareciendo en cada conversación sobre cómo crear experiencias web
exitosas: modularidad.
La modularidad es mucho más antigua que la web. La Revolución
Industrial trajo consigo piezas intercambiables y la línea de montaje de
Henry Ford transformó para siempre la fabricación de automóviles.

-- 10 of 178 --

12 DISEÑO ATÓMICO
proceso. Los primeros automóviles y componentes se fabricaron
individualmente, lo que provocó muchas pesadillas de seguridad y
mantenimiento. Ford dividió el automóvil en sus partes componentes y
modificó el proceso de ensamblaje. Los resultados hablaron por sí mismos:
coches más uniformes, más fiables y seguros salieron de fábrica y en un
tiempo récord.
A medida que la era de las máquinas se convirtió en la era de las computadoras, los
informáticos comenzaron a practicar la programación orientada a objetos y a establecer
conceptos modulares importantes como
separación de intereses y el
principio de
responsabilidad única. Es de este mundo que nació la World Wide Web, por lo que no es
de extrañar que diseño modular se convirtió rápidamente en un principio de diseño
para la arquitectura de la web.
De forma lenta, pero segura, estos conceptos se abrieron camino en los flujos de trabajo de los
diseñadores web. A principios de la década de 2000, vimos la introducción de bibliotecas como YUI y interfaz
de usuario de jQuery que proporcionó a los desarrolladores un conjunto de herramientas de widgets y
patrones para crear interfaces de usuario más consistentes.
Si la modularidad ha existido durante tanto tiempo, ¿por qué estamos
hablando de eso ahora?
La respuesta corta es que la modularidad es más importante que nunca. En este
momento, toda nuestra industria se está ahogando en un mar de dispositivos,
tamaños de ventanas gráficas y entornos en línea. Y las cosas no se están
desacelerando pronto.
La disrupción solo se acelerará. La cantidad y diversidad de
dispositivos conectados. -
muchos de los cuales aún no hemos
imaginado, explotarán, al igual que la cantidad y diversidad de
personas en todo el mundo que los utilizan. Nuestros estándares,
flujos de trabajo e infraestructura existentes no se mantendrán. La
avalancha de dispositivos de hoy ya los está llevando al límite. No
pueden soportar lo que se avecina.
- El manifiesto favorable al futuro

-- 11 of 178 --

---

## Sección 4: CAPÍTULO 1 / DISEÑO DE SISTEMAS 13

Nos guste o no, este universo multidispositivo es nuestra realidad. Ya era bastante difícil lograr que
nuestras páginas web se mostraran de manera consistente en un puñado de navegadores de escritorio,
pero ahora tenemos la tarea de garantizar que nuestras experiencias web se vean y funcionen
maravillosamente en una increíble variedad de teléfonos inteligentes, tabletas, phablets, netbooks,
computadoras portátiles y computadoras de escritorio. , Televisores, consolas de juegos y más.
Para abordar esta realidad mientras mantenemos nuestra cordura, es
absolutamente necesario que demos un paso atrás y dividamos estas
responsabilidades gigantes en partes más pequeñas y manejables.
Y eso es exactamente lo que está haciendo la gente. El espíritu de modularidad se
está abriendo camino en todos los aspectos del proceso de creación web y tiene
efectos profundos en la estrategia, el proceso, el contenido, el diseño y el
desarrollo de las organizaciones.
Una estrategia manejable
Todas las organizaciones finalmente se están dando cuenta de que
arrasar todo su sitio web y reemplazarlo con un sitio web New-And-Shiny
™ cada tres a ocho años no es (y nunca fue) una solución óptima.
Estos son solo algunos de los dispositivos conectados de los que debemos preocuparnos.

-- 12 of 178 --

14 DISEÑO ATÓMICO
¡Afuera con lo viejo! ¡Entra con lo nuevo! Sin duda, es una perspectiva atractiva.
Pero incluso antes de que se levante el confeti de la fiesta de lanzamiento,
comienzan a llegar las llamadas. "¡Moviste mi queso!" gritan los usuarios, que
pasaron años aprendiendo la interfaz y la funcionalidad anteriores.
Cuando se lanzan rediseños masivos con cambios significativos en la
experiencia, los usuarios se ven afectados por lo que Jared Spool llama el
"Escalera mágica del conocimiento adquirido" . Los grandes rediseños son una sacudida para el
sistema, y los usuarios recientemente frustrados tienen que dedicar una gran cantidad de
tiempo y energía a volver a aprender la experiencia para volver a subir lentamente esa escalera
mecánica de conocimientos adquiridos.
Además de desorientar a los usuarios, estos rediseños monolíticos no
llegan a la raíz organizativa del problema. Sin un cambio fundamental en
el proceso, la historia se repetirá, y lo que es New-And-Shiny ™ hoy se
convierte en Old-AndCrusty ™ mañana. El ciclo se repite a medida que las
empresas impulsan actualizaciones menores hasta el próximo gran
rediseño, que finalmente se paralizan y frustran a los usuarios en el
proceso.
Afortunadamente, incluso las organizaciones masivas están tomando señales del
mundo de las startups más pequeñas y ágiles y se esfuerzan por sacar las cosas más
rápido. Por crear
productos mínimos viables y el envío a menudo para mejorar
iterativamente la experiencia, las organizaciones pueden abordar mejor los
comentarios de los usuarios y mantenerse al día con el panorama web en constante
cambio.
Alejarse de los rediseños al estilo de Ron Popeil, configurarlo y olvidarlo,
requiere cambios deliberados en la estructura organizacional y el flujo de
trabajo. Lo cual es muchísimo más fácil decirlo que hacerlo.
Un proceso iterativo
Si tuviera una moneda de veinticinco centavos por cada vez que escuche a algún interesado
declarar "Estamos tratando de ser más ágiles", estaría orbitando la Tierra en mi nave
espacial privada en lugar de escribir este libro.
Querer ser más ágil es encomiable. Pero
ágil es un término cargado, con
grandes diferencias entre mayúsculas-A Agile y minúsculas-a ágiles.
Capital-A Agile es una metodología específica para el desarrollo de
software, equipada con un manifiesto y marcos de acompañamiento como Melé
y Inclinarse .

-- 13 of 178 --

---

## Sección 5: CAPÍTULO 1 / DISEÑO DE SISTEMAS 15

Minúsculas: ágil es más un deseo informal de crear un proceso eficiente.
Este deseo ciertamente puede implicar la adopción de
principios de capital-A Agile, pero puede que no implique la adopción del
proceso Agile en su totalidad. El gerente de proyecto Brett Harned explica:
Queremos ser más ágiles; estamos adoptando el cambio, la mejora continua,
siendo lo más flexibles posible y adaptándonos como mejor nos parezca. La
cuestión es que nunca seremos verdaderamente ágiles, como dice el Manifiesto.
Está bien, siempre y cuando digamos lo que seremos.
- Brett Harned
La estructura organizativa, las relaciones con los clientes, las personalidades, etc.,
juegan un papel importante en la determinación del proceso de un proyecto. El truco
consiste en encontrar el proceso que mejor funcione para usted, sus limitaciones
organizativas y sus oportunidades.
Aunque puede ser imposible adoptar un proceso verdaderamente ágil, sigue siendo una
buena idea trabajar en equipos interdisciplinarios, ingresar al entorno final más rápido,
enviar temprano y con frecuencia, y dividir las tareas más grandes en componentes más
pequeños. En el capítulo 4, detallaremos cómo establecer un flujo de trabajo eficaz
basado en patrones.
Modularización de contenido: estoy en Team Chunk
Prepara tu contenido para ir a cualquier lugar, porque irá a
todas partes.
- Por una Web amigable para el futuro
Publicar contenido para la web solía ser una tarea bastante sencilla, ya que la web de
escritorio era el único juego en la ciudad. Oh, como han cambiado las cosas. Hoy en día,
nuestro contenido es consumido por una gran cantidad de teléfonos inteligentes, teléfonos
tontos, netbooks, computadoras portátiles, tabletas, lectores electrónicos, relojes
inteligentes, televisores, consolas de juegos, señalización digital, tableros de instrumentos
de automóviles y más.
Para abordar adecuadamente este panorama digital cada vez más diverso y
ecléctico, debemos revisar drásticamente nuestra percepción del contenido y las
herramientas que utilizamos para administrarlo.

-- 14 of 178 --

dieciséis DISEÑO ATÓMICO
En el futuro, lo que creo es que vamos a tener una mejor gestión de
contenido y herramientas de publicación de contenido. Tendremos
formas de tomar contenido bien estructurado, fragmentos de
contenido bien diseñados que luego podremos descubrir cómo
queremos reestructurar, publicar y mostrar de una manera que sea
adecuada para la plataforma adecuada.
- Karen McGrane
Afortunadamente, este futuro comienza a tomar forma. Las organizaciones están
reconociendo la necesidad de crear contenido modular para llegar mejor a su audiencia
donde sea que se encuentren. Y los sistemas de administración de contenido están
evolucionando más allá de las raíces de su plataforma de publicación web hacia
herramientas que pueden crear y mantener contenido modular de manera elegante. Si
bien durante años existen sofisticados sistemas de gestión de contenido en forma de
soluciones personalizadas como Plataforma COPE (Create Once, Publish Everywhere) de
NPR , el pensamiento modular inteligente se está abriendo camino en los sistemas de
gestión de contenido convencionales.
Código elegante
La modularidad ha sido durante mucho tiempo un principio básico en el mundo de
la informática, como comentamos anteriormente. Si bien este principio existía
mucho antes de que se inventara la web, ha llevado algún tiempo que la
modularidad se arraigue en las mentes y corazones de los desarrolladores web.
A pesar de existir desde 1995, JavaScript, el lenguaje de programación de la web,
primero tuvo que soportar algunos dolores de crecimiento para madurar y
convertirse en el lenguaje respetado y capaz que es hoy. Ahora que JavaScript ha
crecido, los desarrolladores pueden aplicar esos principios de informática
probados y verdaderos a sus flujos de trabajo de desarrollo web. Como resultado,
vemos que la gente desarrolla sofisticados Patrones de JavaScript y arquitecturas.
Aplicar principios de programación modular a JavaScript es un poco obvio,
ya que JavaScript es en sí mismo un lenguaje de programación. Pero el
pensamiento orientado a objetos también se está abriendo camino en
otros aspectos de la web, incluido CSS, el lenguaje de estilo de la web.
Metodologías como OOCSS , SMACSS , y BEM han surgido para ayudar a los
diseñadores web a crear y mantener arquitecturas CSS modulares.

-- 15 of 178 --

---

## Sección 6: CAPÍTULO 1 / DISEÑO DE SISTEMAS 17

Reparado visualmente
La modularidad no solo se está infiltrando en el lado del código del estilo en la web, sino
que está revolucionando la forma en que los diseñadores visuales abordan el diseño web
moderno.
A medida que prolifera la cantidad de ventanas gráficas y entornos, resulta
insostenible producir maquetas estáticas de cada página de una experiencia
web. Como bromeó Stephen Hay, presentar composiciones de Photoshop
completamente horneadas "es la forma más efectiva de mostrar a sus clientes
cómo nunca se verá su sitio web".
Eso no quiere decir que las herramientas de diseño estático como Photoshop y Sketch
no sean importantes. Lejos de ahi. Pero es la forma en que usamos estas herramientas
lo que ha cambiado drásticamente. Si bien la creación de cientos de composiciones
completas no es realista, estas herramientas estáticas se destacan al proporcionar un
patio de juegos para establecer lo que Andy Clarke llama "atmósfera de diseño":
Atmosphere describe los sentimientos que obtenemos que son evocados por
el color, la textura y la tipografía. Puede que ya pienses en la atmósfera en
términos diferentes. Podría llamarlo "sentir", "estado de ánimo" o incluso
"identidad visual". Independientemente de las palabras que elija, la atmósfera
de un diseño no depende del diseño. Es independiente de la disposición y la
ubicación visual. Se verá o se sentirá en todos los tamaños de pantalla y en
todos los dispositivos.
- Andy Clarke
Establecer una atmósfera de diseño temprano es fundamental para el éxito de un
proyecto, por lo que los diseñadores han encontrado formas de facilitar estas
importantes conversaciones sin tener que generar maquetas completas. La diseñadora
Samantha Warren desarrolló artefactos de diseño llamados
azulejos de estilo , que muestran exploraciones de color, tipo y textura en un
bonito paginador encapsulado. El diseñador Dan Mall se basó en la idea de
Samantha con un concepto llamado collages de elementos , que demuestran
exploraciones de la atmósfera de diseño en un collage ampliado de elementos de
interfaz.

-- 16 of 178 --

18 DISEÑO ATÓMICO
Al dividir las exploraciones visuales en partes más pequeñas, los diseñadores ahorran
tiempo y esfuerzo al tiempo que evitan presentar diseños prematuros e irreales a los
clientes. Más importante aún, estos enfoques alejan a las partes interesadas de
simplemente reaccionar ante una imagen bonita y, en cambio, facilitan
conversaciones cruciales sobre la dirección general del diseño y cómo se relacionan
con los objetivos del proyecto. Discutiremos estos conceptos con más detalle en el

---

## Sección 7: capítulo 4, pero basta con decir que el flujo de trabajo de diseño visual está

cambiando a lo grande.
Diseño de interfaz de usuario sistemático
No estamos diseñando páginas, estamos diseñando sistemas de
componentes.
- Stephen Hay
¿De qué está hecha una interfaz? ¿Cuáles son nuestros ladrillos Lego?
¿Cuáles son nuestras piezas de sándwich Subway que combinamos en
millones de deliciosas combinaciones? Son estas preguntas las que nos
hemos estado haciendo cada vez más ahora que enviamos nuestras
interfaces a más y más lugares.
Hace unos años, Ethan Marcotte nos presentó la idea de
diseño web adaptable y sus tres principios básicos: cuadrículas fluidas, medios
flexibles y consultas de medios CSS. Estos tres ingredientes proporcionaron una
base muy necesaria para que los diseñadores creen diseños flexibles.
Los mosaicos de estilo, un concepto creado por la diseñadora Samantha Warren, permiten a los
diseñadores explorar el color, la tipografía y la textura sin tener que desarrollar composiciones completamente realizadas.

-- 17 of 178 --

---

## Sección 8: CAPÍTULO 1 / DISEÑO DE SISTEMAS 19

que se adaptan inteligentemente a cualquier tamaño de pantalla. Quizás lo más
importante es que el diseño receptivo ayudó a que los diseñadores se entusiasmaran con
la creación de experiencias web reflexivas, adaptables y multidispositivo.
Como descubrieron rápidamente los diseñadores, crear experiencias web
multidispositivo implica mucho más que crear páginas blandas. Cada pieza
individual de una interfaz contiene sus propios desafíos y oportunidades
únicos para que se vea y funcione a la perfección en muchos tamaños de
pantalla y entornos.
¿Cómo podemos presentar la navegación principal, que generalmente se muestra
como una lista horizontal en pantallas grandes, de una manera reflexiva en pantallas
más pequeñas? ¿Cómo se traducen las cajas de luz, las rutas de exploración y los
carruseles en ventanas gráficas más pequeñas y tipos de entrada alternativos? Son
estas preguntas las que me llevaron a crear Esto es receptivo , una muestra de patrones
receptivos que demuestran las diversas formas en que un componente en particular
podría ejecutarse en un entorno receptivo.
Si bien This Is Responsive tiene éxito en articular cómo estos patrones de
interfaz pueden escalar a través de tamaños de pantalla y entornos,
todavía depende de los diseñadores y desarrolladores poner estos
patrones en acción. Y resulta que eso es mucho trabajo.
Marcos de interfaz de usuario, en teoría y en la práctica
Los diseñadores y desarrolladores ya tienen poco tiempo y recursos, y ahora
tienen la tarea de crear interfaces que se vean y funcionen
maravillosamente en cualquier entorno. Esa es una tarea muy difícil.
Esta necesidad de abordar la creciente diversidad de dispositivos y, al mismo
tiempo, sacar los proyectos de forma sensata ha dado lugar a marcos
frontend como Fundación por Zurb y Oreja . Estos marcos de interfaz de
usuario proporcionan a los diseñadores una colección de patrones HTML
preensamblados, estilos CSS y JavaScript para agregar funcionalidad a
componentes interactivos como menús desplegables y carruseles. En
esencia, estos marcos son prácticos kits de herramientas para ensamblar
interfaces rápidamente.

-- 18 of 178 --

20 DISEÑO ATÓMICO
Y vaya, estas cosas son populares. Mientras escribo esto, Bootstrap es el repositorio
más popular en el sitio de intercambio de código. GitHub , con más de 77.000 estrellas y
30.000 bifurcaciones. La popularidad de estos marcos es un testimonio del hecho de
que los diseñadores y desarrolladores están buscando un terreno sólido en el que
pararse en este panorama web siempre complejo.
Uno de los aspectos más atractivos de estos marcos es
velocidad.
Los marcos como Bootstrap permiten a los diseñadores hacer despegar ideas
rápidamente, crear prototipos rápidamente y lanzar sitios antes. Debido a que los
patrones proporcionados por un kit de herramientas ya están probados en varios
navegadores, los desarrolladores pueden dedicar su tiempo a tareas más importantes
en lugar de golpearse la cabeza contra una mesa probando alguna versión arcaica de
Internet Explorer. Y en caso de que los diseñadores se atasquen, las comunidades de
estos marcos pueden brindar apoyo y consejos útiles.
Para los autónomos, este aumento de velocidad podría significar que pueden asumir uno o tres
proyectos adicionales, lo que les brinda más estabilidad financiera para el año. Y en el mundo de
las startups, un lugar donde Bootstrap está
Bootstrap proporciona una colección de componentes de UI para acelerar el desarrollo.

-- 19 of 178 --

---

## Sección 9: CAPÍTULO 1 / DISEÑO DE SISTEMAS 21

omnipresente: los productos mínimos viables pueden lanzarse antes, lo que lleva a
respuestas más rápidas con respecto a la viabilidad de los productos.
Por lo tanto, los marcos como Bootstrap son sistemas de diseño increíblemente
populares que brindan componentes bien probados, lo que da como resultado
diseños consistentes y lanzamientos más rápidos. ¿Qué no se podría amar?
Bueno, como casi todo en la vida, hay contras junto con los pros.
Problemas en el marco del paraíso
Cuando era niño, veía películas y programas de televisión de ciencia ficción con
una extraña fascinación. Había una pregunta que nunca pude quitarme del todo:
¿Por
qué están todos vestidos igual?
Solo puedo adivinar que, dado el tiempo suficiente,
resolver la moda. “¡Dime,
estos monos son bastante elegantes y cómodos también! Vamos a usarlos
todos de ahora en adelante ". "¡Suena bien para mí!"
Por supuesto, no es así como funcionan los seres humanos. Todos tenemos gustos,
metas y deseos diferentes. La variedad, como dicen, es la sal de la vida, y la moda, la
música y el diseño reflejan nuestra naturaleza diversa. Sin embargo, en la web
tendemos a caer en la trampa de querer que todos hagan las cosas de la misma
manera. "¿Por qué no todos los navegadores simplemente se estandarizan en WebKit?"
"¿Por qué los fabricantes de dispositivos no pueden usar los mismos tamaños de
pantalla?" "¡Utilice siempre jQuery!" "¡Nunca uses jQuery!" "¡Solo usa frameworks!"
"¡Nunca uses frameworks!"
En el futuro, todos se visten igual. Crédito de la ilustración: Melissa Frost.

-- 20 of 178 --

22 DISEÑO ATÓMICO
Al igual que en el mundo real, las diversas necesidades, objetivos y deseos de los
proyectos web conducen a una miríada de soluciones diferentes. Por supuesto, hay un
momento y un lugar para todo, y los diseñadores y desarrolladores necesitan
discernimiento para saber qué herramientas usar y cuándo.
Los marcos de front-end son herramientas que brindan una solución específica
y una apariencia y sensación particulares. Si bien esas soluciones ayudan a
acelerar el desarrollo, las experiencias resultantes terminan pareciéndose a
esos monos de ciencia ficción. Cuando todos usan los mismos botones,
cuadrículas, menús desplegables y componentes, las cosas naturalmente
comienzan a verse iguales. Si Nike, Adidas, Puma y Reebok rediseñaran sus
respectivos sitios utilizando Bootstrap, se verían sustancialmente similares.
Ciertamente, eso no es lo que buscan estas marcas. Claro, cada marca puede
modificar y extender el aspecto y la sensación predeterminados, pero después
de un tiempo, la personalización significa luchar contra la estructura, el estilo y
la funcionalidad del marco.
Además de los problemas de semejanza, estos marcos pueden agregar una hinchazón
innecesaria a una experiencia. Es fantástico que los marcos proporcionen muchos
componentes y funcionalidades prediseñados, pero un gran porcentaje de diseñadores
y desarrolladores no adoptarán todos los aspectos del marco. Desafortunadamente, los
usuarios todavía tienen que descargar CSS y JavaScript no utilizados del marco, lo que
resulta en cargas de página más lentas y frustración.
Por otro lado, es posible que los marcos no vayan lo suficientemente lejos, lo que
hace que los desarrolladores necesiten crear una cantidad sustancial de código
personalizado para lograr los objetivos de sus proyectos. En algún momento, se
cruza un umbral donde los beneficios iniciales de usar
un marco, es decir, el desarrollo, se ven compensados por el tiempo
dedicado a modificar, ampliar y arreglar el marco.
Y luego está el problema con los nombres. Usar un marco significa suscribirse a
las convenciones de estructura, nomenclatura y estilo de otra persona. Por
supuesto, es importante establecer un léxico de interfaz útil, pero lo que tiene
sentido para una organización puede no ser lo que sale de la caja de un marco.
Yo, por mi parte, me resistiría a la idea de usar el componente predeterminado
de Bootstrap para un área de contenido destacado que llaman "jumbotron". La
forma en que las convenciones de nomenclatura de un marco concuerdan con
una base de código y un flujo de trabajo existentes debe discutirse
adecuadamente antes de abordar el tren del marco.

-- 21 of 178 --

---

## Sección 10: CAPÍTULO 1 / DISEÑO DE SISTEMAS 23

Ahora que hemos superado los marcos, es importante dar un paso atrás y
reconocer que, conceptualmente, estos marcos son muy acertados. Es una
excelente idea trabajar con un kit de herramientas de diseño que promueve
la coherencia y acelera el tiempo de desarrollo. Mientras discutía el
rediseño de la página de inicio de Microsoft por parte de la tienda web Con
sede en Austin Paravel, el desarrollador Dave Rupert enfatizó la importancia
de crear y entregar un sistema de diseño a su cliente. Dave expresó
maravillosamente que no se trata necesariamente de usar Bootstrap para
cada cliente, sino de crear "Bootstraps diminutos para cada cliente".
Los entregables receptivos deben parecerse mucho a los sistemas de estilo
Bootstrap de Twitter completamente funcionales y personalizados para las
necesidades de sus clientes. Estos ejemplos de código vivo son guías de estilo
autodocumentadas que se extienden para adaptarse a las necesidades de un cliente,
así como a las necesidades de la web multidispositivo en constante evolución.
- Dave Rupert
No se trata solo de utilizar un sistema de diseño, se trata de crear
tu sistema.
Los sistemas de diseño salvan el día
Entonces, ¿cómo se ven los sistemas de diseño robustos? ¿Qué forma
toman? ¿Cómo los crea, mantiene y aplica?
Los pilares de los buenos sistemas de diseño son
guías de estilo, que documentan
y organizan los materiales de diseño al tiempo que proporcionan pautas, uso y
barandas.
Da la casualidad de que hay muchos sabores de guías de estilo , incluida la
documentación de identidad de marca, redacción, voz y tono, código, lenguaje de
diseño y patrones de interfaz de usuario. Este libro no detallará todas las
categorías de guías de estilo, pero es importante echar un vistazo a cada una
para comprender mejor cómo cada guía de estilo influye en las demás y cómo las
guías de estilo para la web encajan en un ecosistema más amplio.

-- 22 of 178 --

24 DISEÑO ATÓMICO
Identidad de la marca
Las pautas de identidad de marca definen los activos y materiales que hacen que
una empresa sea única. Los logotipos, la tipografía, las paletas de colores, los
mensajes (como declaraciones de misión y lemas), material adicional (como
tarjetas de presentación y plantillas de PowerPoint) y más se agregan y describen
en las pautas de identidad de marca.
Es esencial que una marca se presente de manera coherente en un número
cada vez mayor de medios, canales y puntos de contacto. ¿Cómo pueden todos
los miembros de una organización hablar con una sola voz y sentirse parte de
una entidad singular? ¿Cómo saben los terceros qué colores Pantone utilizar y
cómo utilizar correctamente el logotipo de la marca? Las pautas de identidad
de marca brindan respuestas a estas preguntas fundamentales en un centro
centralizado.
Históricamente, las pautas de identidad de marca estaban contenidas en libros
de tapa dura (recuerde, ¿esas cosas con las páginas?), Pero como con todo lo
demás, las guías de estilo de marca se abren camino en línea.
Guía de estilo de marca de la Universidad de West Virginia.

-- 23 of 178 --

---

## Sección 11: CAPÍTULO 1 / DISEÑO DE SISTEMAS 25

Lenguaje de diseño
Si bien las pautas de identidad de marca son bastante táctiles, las pautas del lenguaje de
diseño son un poco más difíciles de precisar. Las guías de estilo del lenguaje de diseño
articulan una dirección de diseño general, una filosofía y un enfoque para proyectos o
productos específicos.
Para presentarse de manera coherente en una gama cada vez mayor de
productos y medios, Google desarrolló un lenguaje de diseño llamado
diseño de materiales. El guía de estilo de diseño de materiales define su filosofía de
diseño general, sus objetivos y sus principios generales, al tiempo que proporciona
aplicaciones específicas del lenguaje de diseño de materiales.
Las guías de estilo del lenguaje de diseño pueden (y generalmente lo hacen) incorporar
aspectos de otras categorías de guías de estilo para hacer que los conceptos de alto nivel
sean un poco más tangibles.
Las pautas del lenguaje de diseño no están escritas en piedra como lo son las pautas de la
marca. Por ejemplo, es probable que algún día Google desarrolle un nuevo lenguaje de diseño
para reemplazar el diseño de materiales, por lo que mientras la marca general de Google
permanecerá intacta, el vocabulario de diseño en torno a sus productos cambiará.
Lenguaje de diseño de materiales de Google.

-- 24 of 178 --

26 DISEÑO ATÓMICO
Voz y tono
Las personas interactúan con las marcas a través de una gran variedad de canales y
medios. Además de los medios digitales que hemos discutido hasta ahora, las marcas
también operan en canales impresos, minoristas, al aire libre, radio, televisión y otros
canales. Cuando una marca debe comunicarse a través de tantos puntos de contacto
variados, hablar de manera unificada y coherente se vuelve fundamental para el éxito
de una marca.
La voz de una marca permanece igual día a día, pero su tono tiene que cambiar
todo el tiempo, dependiendo tanto de la situación como de los sentimientos
del lector.
- Kate Kiefer Lee
La voz es un aspecto elemental de la identidad de una marca, por lo que, por lo general,
las pautas de identidad de la marca incluyen alguna referencia a la voz de la marca. Sin
embargo, estas pautas generalmente no tienen muchos matices, por lo que las pautas
de voz y tono son tan importantes.
Las pautas de voz y tono entran en la maleza al articular cómo la voz y el
tono de la empresa deben cambiar en una variedad de escenarios. Las
brillantes pautas de voz y tono de MailChimp definir
Pautas de voz y tono de MailChimp

-- 25 of 178 --

---

## Sección 12: CAPÍTULO 1 / DISEÑO DE SISTEMAS 27

cómo cambia el tono de la marca según los tipos de contenido, de modo que cuando se
rechaza la tarjeta de crédito de un usuario, los escritores saben que deben alejarse de
su tono de voz generalmente descarado y juguetón y adoptar un tono más serio.
Escritura
El auge de la web y los sitios web gestionados por contenido hace que a muchas
personas de una organización les resulte más fácil que nunca publicar contenido. Esto,
por supuesto, puede ser un arma de doble filo, ya que mantener un estilo de escritura
consistente para una organización con muchas voces puede ser un desafío. Las guías
de estilo de escritura proporcionan a cada autor algunas pautas y medidas de
seguridad para contribuir con el contenido.
Las guías de estilo de escritura pueden ser extremadamente granulares, definiendo detalles en
torno a la puntuación y la gramática, pero no siempre tienen que ser tan detalladas. Guía de
estilo de escritura de la Universidad de Dalhousie proporciona una lista concisa de principios y
mejores prácticas que deben seguir los contribuyentes de contenido.
La guía de estilo de escritura de The Economist.

-- 26 of 178 --

28 DISEÑO ATÓMICO
Guías de estilo de código
Es esencial que los equipos escriban código legible, escalable y fácil de mantener.
Pero sin una forma de promover y hacer cumplir la coherencia del código, es fácil que
las cosas se desmoronen y dejen que cada desarrollador se las arregle por sí mismo.
Las guías de estilo de código proporcionan convenciones, patrones y ejemplos de
cómo los equipos deben abordar su código. Estas pautas y medidas de seguridad
ayudan a controlar la locura para que los equipos puedan concentrarse en producir
un gran trabajo juntos en lugar de refactorizar un montón de código descuidado e
inconsistente.
La guía de estilo de código de GitHub proporciona las mejores prácticas para escribir HTML, CSS, JavaScript y
Ruby dentro de su organización.

-- 27 of 178 --

---

## Sección 13: CAPÍTULO 1 / DISEÑO DE SISTEMAS 29

Bibliotecas de patrones
Y ahora para el evento principal. Las bibliotecas de patrones, también conocidas como guías
de estilo frontend, bibliotecas de UI o bibliotecas de componentes, se están convirtiendo
rápidamente en una piedra angular del diseño de interfaces modernas.
El resto de este libro se concentrará en cómo abordar el diseño de
interfaces de manera sistemática y detallará cómo establecer y mantener
bibliotecas de patrones.
Beneficios de la guía de estilo
Hacer que las IU funcionen en una gran variedad de tamaños de pantalla,
dispositivos, navegadores y entornos es una tarea difícil en sí misma. Pero una vez
que tiene en cuenta a otros miembros del equipo, clientes, partes interesadas y
peculiaridades de la organización, las cosas comienzan a verse bien.
intimidante.
Las guías de estilo son herramientas importantes que ayudan a prevenir el caos,
tanto desde el punto de vista del diseño y desarrollo como desde la perspectiva
organizacional. He aquí por qué las guías de estilo son ahora herramientas
esenciales para el diseño y desarrollo web moderno.
Código para la biblioteca de patrones de Estados Unidos

-- 28 of 178 --

30 DISEÑO ATÓMICO
Constantemente asombroso
Las guías de estilo web promueven la coherencia y la cohesión a través de una
interfaz de usuario. Esta coherencia beneficia tanto a las personas que crean estas
interfaces como a sus usuarios.
Recientemente visité el sitio web de mi proveedor de seguro médico para pagar
mi factura. En el transcurso de cinco clics, me encontré con cuatro diseños de
interfaz distintos, algunos de los cuales parecían haber sido tocados por última
vez en 1999. Esta experiencia inconsistente puso la carga sobre mí, el usuario,
para averiguar qué fue, dónde y cómo interpretar elementos de interfaz dispares.
Cuando llegué al formulario de pago, sentí que no podía confiar en que la
compañía procesara mi pago de manera exitosa y segura.
Las guías de estilo ayudan a solucionar estas inconsistencias al fomentar la
reutilización de los elementos de la interfaz. Los diseñadores y desarrolladores
pueden consultar los patrones existentes para asegurarse de que el trabajo que
están produciendo sea coherente con lo que ya se ha establecido.
Incluso los terceros responsables de hacer coincidir sus interfaces de usuario con la
apariencia de las interfaces de usuario internas de una empresa pueden hacer un gran uso
de una guía de estilo. Las experiencias alojadas externamente, como los portales de pago o
los sitios localizados, pueden coincidir mejor con la apariencia de la experiencia principal
aplicando los estilos definidos en la guía.
Hacer que las guías de estilo sean fundamentales para su proceso da como resultado
interfaces de usuario que se sienten más unidas y confiables, lo que ayuda a los
usuarios a realizar sus tareas más rápido y les permite dominar la interfaz.
Un vocabulario compartido
¿Qué significa "barra de herramientas de utilidades"? ¿Todos entienden lo que es un
"héroe deslizante táctil"?
A medida que aumenta el número de personas que trabajan en un proyecto, es muy
fácil que se produzcan interrupciones en la comunicación. No es raro que diferentes
disciplinas tengan diferentes nombres para el mismo módulo y que las personas se
vuelvan deshonestas e inventen sus propias convenciones de nomenclatura. Para que
se produzca una verdadera colaboración, es fundamental que los equipos hablen un
idioma común. Las guías de estilo están ahí para ayudar a establecer ese vocabulario
compartido.

-- 29 of 178 --

---

## Sección 14: CAPÍTULO 1 / DISEÑO DE SISTEMAS 31

Las guías de estilo establecen un vocabulario coherente y compartido entre
todos los involucrados en un proyecto, Fomentar la colaboración entre
disciplinas y reducir las fallas en la comunicación.
Educación
En su libro
Guías de estilo de front-end , Anna Debenham explica hábilmente las
muchas ventajas de crear guías de estilo, incluido uno de los beneficios más
importantes: la educación.
La educación es tan importante como la documentación. Una guía de estilo puede
mostrar a los clientes que los sitios web son sistemas en lugar de colecciones de
páginas.
- Anna Debenham
Las guías de estilo demuestran a los clientes, las partes interesadas y otras
disciplinas que hay mucho trabajo realmente reflexivo en el diseño y desarrollo
de un sitio web más allá del simple "Oye, hagamos un nuevo sitio web". Una
biblioteca de patrones comunica el lenguaje de diseño de una manera
muy tangible, lo que ayuda a las partes interesadas a comprender que un
sistema subyacente está determinando la interfaz final.
Las guías de estilo pueden ayudar a aliviar lo que yo llamo
síndrome especial del copo de nieve,
donde ciertos departamentos de una organización piensan que tienen
problemas únicos y, por lo tanto, exigen soluciones únicas. Al exponer el
sistema de diseño en forma de guía de estilo, estos copos de nieve
especiales pueden apreciar mejor la coherencia y comprender por qué sus
solicitudes de diseños personalizados reciben rechazo.
Dar nombres a patrones como 'Blocks Three-Up' en la guía de estilo de Starbucks ayuda a los miembros del
equipo a hablar el mismo idioma.

-- 30 of 178 --

32 DISEÑO ATÓMICO
Un flujo de trabajo empático
La educación no solo es importante para los clientes y las partes interesadas. Una buena guía
de estilo ayuda a informar a los diseñadores y desarrolladores de las herramientas que tienen
en su caja de herramientas y proporciona reglas y mejores prácticas sobre cómo usarlas
correctamente.
Al convertir una guía de estilo en la piedra angular de su flujo de trabajo (que
detallaremos en el capítulo 4), los diseñadores y desarrolladores se ven obligados a
pensar en cómo sus decisiones afectan el sistema de diseño más amplio. Se vuelve
más difícil volverse pícaro y más fácil pensar en el bien mayor. Y aquí es exactamente
donde quieres que estén los miembros del equipo.
Una guía de estilo proporciona un hogar para que cada disciplina contribuya con sus
respectivas consideraciones y preocupaciones por los patrones. Al recopilar todas estas
consideraciones bajo un mismo techo, la guía de estilo se convierte en un centro para
todos los involucrados en el proyecto, lo que ayuda a cada disciplina a comprender
mejor el sistema de diseño desde muchas perspectivas.
Pruebas, pruebas, 1-2-3
¿La página de inicio está rota, dices? Bueno, ¿qué es exactamente lo que lo está rompiendo?
La capacidad de separar una interfaz en sus partes componentes hace que las pruebas sean
mucho más fáciles. Una guía de estilo le permite ver los patrones de la interfaz de forma
aislada, lo que permite a los desarrolladores concentrarse en las causas de los errores, las
inconsistencias del navegador o los problemas de rendimiento.
Velocidad
Anteriormente en el capítulo discutimos cómo
diseño y desarrollo más rápidos
es una de las principales razones por las que los marcos de interfaz de usuario como Bootstrap
son tan populares. Estamos bajo presión para sacar proyectos tan pronto como sea
humanamente posible. Al desarrollar su propio sistema de diseño, puede obtener las mismas
recompensas de velocidad que los kits de herramientas de interfaz de usuario listos para usar.
Es cierto que diseñar un sistema de diseño de interfaz y crear una biblioteca de
patrones personalizados inicialmente requiere mucho tiempo, pensamiento y

-- 31 of 178 --

---

## Sección 15: CAPÍTULO 1 / DISEÑO DE SISTEMAS 33

esfuerzo. Pero una vez que se establece la biblioteca de patrones, el diseño y el
desarrollo posteriores se vuelven mucho más rápidos, lo que tiende a hacer
felices a todos.
Federico Holgado, desarrollador líder de UX en MailChimp, explicado cómo la
biblioteca de patrones de MailChimp inicialmente consistía en patrones creados a
partir de las cuatro pantallas principales de su aplicación. Pero una vez que
pasaron a otras áreas del sitio, se dieron cuenta de que podían usar patrones
existentes en lugar de tener que generar patrones completamente nuevos desde
cero cada vez.
... Una vez que hicimos eso, mientras estábamos implementando cosas en
otras páginas, comenzamos a darnos cuenta: hombre, este sistema realmente
funcionará aquí y este sistema realmente funcionará aquí y aquí.
- Federico Holgado
En él para el largo plazo
No hay duda de que las guías de estilo ayudan a los equipos a hacer las cosas de
forma eficaz aquí y ahora. Pero al igual que un buen vino, las guías de estilo
aumentan de valor con el tiempo. Lo hermoso de los sistemas de diseño de
interfaces es que pueden y deben modificarse, ampliarse y perfeccionarse
durante los próximos años.
Como se mencionó anteriormente, la creación de una biblioteca de patrones
personalizada requiere mucho trabajo duro por adelantado, pero ese trabajo duro
debería proporcionar una base estructural para futuras iteraciones y refinamientos. Las
lecciones aprendidas de la analítica, las pruebas de usuario, las pruebas A / B y la
experiencia deben incorporarse en la guía de estilo, convirtiéndola en un poderoso
centro de verdad, conocimiento y mejores prácticas.
Mejor aún, incluso si tuviera que realizar un rediseño importante, encontrará que
muchos de los componentes básicos de la interfaz estructural seguirán siendo los
mismos. Seguirá teniendo formularios, botones, encabezados,
otros patrones de interfaz comunes, por lo que no es necesario tirar al bebé con el
agua de la bañera. Una guía de estilo proporciona una base sólida como una roca
para todo el trabajo futuro, incluso si ese trabajo futuro puede parecer totalmente
diferente.

-- 32 of 178 --

34 DISEÑO ATÓMICO
Desafíos de la guía de estilo
A estas alturas, los beneficios de crear sistemas de diseño deberían ser muy
claros y, con suerte, visiones de ciruelas azucaradas y hermosas guías de estilo
están bailando en su cabeza. Pero para alcanzar el nirvana de la guía de estilo,
primero debes superar los muchos desafíos traicioneros que vienen con el
territorio.
La venta dura
Para beneficiarse de las guías de estilo, las organizaciones deben primero asignar el
tiempo y el presupuesto necesarios para hacerlas realidad. Eso requiere que las
organizaciones superen la mentalidad a corto plazo que con demasiada frecuencia
se infiltra en la cultura empresarial.
Los beneficios a largo plazo que brindan las guías de estilo son obvios para
aquellos que ya están pensando en el juego a largo plazo. El desafío, por lo tanto,
es convencer a quienes están atrapados en una mentalidad a corto plazo,
trimestre a trimestre, de que establecer un sistema de diseño reflexivo es una
inversión inteligente en el futuro.
Cuestión de tiempo
La parte difícil es construir la máquina que construye el producto.
- Dennis Crowley
Quizás el desafío más grande e inevitable es que Las guías de estilo requieren
mucho tiempo para crearlas. No sé ustedes, pero no voy a trabajar todos los
días y me pregunto qué hacer con mi tiempo. Nunca he conocido a una persona
que no se sienta presionada para sacar el trabajo por la puerta, y esta presión
naturalmente lleva a centrarse en el proyecto web principal. Desafortunadamente,
los cronogramas agresivos y los presupuestos finitos restan valor al esfuerzo
requerido para hacer que las guías de estilo sucedan, incluso cuando los equipos
están comprometidos con la causa.

-- 33 of 178 --

---

## Sección 16: CAPÍTULO 1 / DISEÑO DE SISTEMAS 35

Proyectos auxiliares
Las bibliotecas de patrones a menudo se tratan como proyectos auxiliares, en
lugar de como componentes del producto final. Al tratar las bibliotecas de
patrones como algo separado del proyecto principal, tienden a caer en el
Agradable
tener categoría y conviértase en el primero en la tabla de cortar cuando las cosas
se pongan difíciles.
Este enigma del proyecto auxiliar me recuerda los sentimientos que a menudo escucho
sobre la factorización de la accesibilidad en los proyectos. Dicen: "Oh, desearíamos
tener el tiempo y el presupuesto para la accesibilidad, pero ..." La noción de que la
accesibilidad (y otros principios como el rendimiento y la capacidad de respuesta) es un
elemento de línea adicional costoso es una falacia. Las bibliotecas de patrones, como la
accesibilidad, son buenas ideas para incorporar en su flujo de trabajo, ya sea que el
plan del proyecto las requiera explícitamente o no.
Mantenimiento y gobernanza
Incluso si se asigna tiempo y dinero para establecer guías de estilo, estas valiosas
herramientas a menudo mueren en la vid si no se les da el enfoque que necesitan
para alcanzar su verdadero potencial.
Una estrategia de mantenimiento y gobierno es fundamental para el éxito de las
guías de estilo. Las guías de estilo se tirarán a la basura (justo al lado
todos esos PSD y wireframes) y abandonados sin una estrategia adecuada
para quién los administrará, mantendrá y hará cumplir.
El mantenimiento de la guía de estilo es un tema muy importante y merece
se tratará en detalle, por lo que profundizaremos en cómo crear guías de estilo fáciles
de mantener en el capítulo 5.
Confusión de la audiencia
Las guías de estilo pueden malinterpretarse como herramientas útiles solo para
diseñadores o desarrolladores, lo que conduce a una falta de visibilidad que limita
inmediatamente su efectividad. En lugar de servir como un abrevadero para todos en
la organización, una guía de estilo puede convertirse en el secreto mejor guardado
guardado por una disciplina. Píntame ingenuo, pero no creo que esto ayude a
fomentar una cultura de colaboración.
Sin pensar en un público más amplio, las guías de estilo pueden parecer
demasiado vagas o demasiado técnicas, lo que puede intimidar a otras
disciplinas y hacerlas creer que estos recursos no son para ellos.

-- 34 of 178 --

36 DISEÑO ATÓMICO
Estructura de la guía de estilo
Para que las guías de estilo sean recursos útiles para todos en una
organización, deben transmitir claramente qué son y por qué son
importantes. Las guías de estilo deben ser atractivas, atractivas, visibles,
claras y fáciles de usar. Como se mencionó anteriormente, deben ser
conscientes de que una gran cantidad de audiencias los verán, por lo que
deben tratar de ser acogedores y útiles para la mayor cantidad de personas
posible.
Falta de contexto
El contexto es clave para comprender un sistema de diseño. Desafortunadamente, la
mayoría de las bibliotecas de patrones en la naturaleza no brindan ninguna pista sobre
cuándo, cómo y dónde se usan sus componentes. Sin proporcionar contexto, los
diseñadores y desarrolladores no saben qué tan global es un patrón en particular y,
como resultado, no sabrían qué páginas de su aplicación deberían revisarse, someterse
a control de calidad y probarse si se hicieran cambios.
La página de inicio de la guía de estilo de Yelp tiene un diseño atractivo y un texto de introducción
importante que explica el propósito y la audiencia de la guía.

-- 35 of 178 --

---

## Sección 17: CAPÍTULO 1 / DISEÑO DE SISTEMAS 37

Falta una metodología clara
Por mucho que adoro las bibliotecas de patrones allí afuera , No puedo evitar
notar una falta de estructura en muchos de ellos. No me malinterpretes, creo que
es absolutamente fantástico que los equipos piensen sistemáticamente y
documenten sus patrones de interfaz de usuario. Pero a menudo siento que
muchas bibliotecas de patrones son poco más que aerosoles de módulos
dispuestos libremente. Creo que hay margen de mejora.
En busca de una metodología de diseño de interfaces
Para que podamos crear experiencias para este panorama web ecléctico, debemos
evolucionar más allá de la metáfora de la página que ha estado con nosotros desde el
nacimiento de la web. Afortunadamente, las organizaciones están adoptando la
modularidad en todos los aspectos del proceso de creación web, lo que conduce a un
trabajo más inteligente y a sistemas más sostenibles.
A medida que la cantidad de dispositivos, navegadores y entornos continúa
aumentando a un ritmo asombroso, la necesidad de crear sistemas de diseño
de interfaz reflexivos y deliberados se está volviendo más evidente que nunca.
Ingrese al diseño atómico.
El 'Bloque de resaltado' parece útil, pero ¿dónde se usa este patrón?

-- 36 of 178 --

38 DISEÑO ATÓMICO
7 http://www.uie.com/articles/magic_escalator/
8 http://en.wikipedia.org/wiki/Scrum_%28software_development%29
Átomos, moléculas, organismos,
plantillas y páginas
Diseño atómico
Metodología

---

## Sección 18: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 39

-- 37 of 178 --

Mi búsqueda de una metodología para crear sistemas de diseño de interfaces me
llevó a buscar inspiración en otros campos e industrias. Dado este mundo
asombrosamente complejo que hemos creado, parecía natural que otros campos
hubieran abordado problemas similares de los que pudiéramos aprender y
apropiarse. Resulta que muchos otros campos como el diseño industrial y la
arquitectura han desarrollado sistemas modulares inteligentes para fabricar objetos
inmensamente complejos como aviones, barcos y rascacielos.
Pero mis exploraciones originales siguieron regresando al mundo natural, lo que me provocó
recuerdos de estar sentado en un escritorio destartalado en el laboratorio de química de mi
escuela secundaria.
Tomando señales de la química
Mi clase de química de la escuela secundaria fue impartida por un serio veterano de
Vietnam con un bigote extraordinariamente impresionante. La clase del Sr. Rae tenía la
reputación de ser una de las clases más difíciles de la escuela, en gran parte debido a
una tarea que requería que los estudiantes equilibraran cientos y cientos de
ecuaciones químicas contenidas en una hoja de trabajo enorme.
Si eres como yo, es posible que necesites un repaso para recordar cómo se
ve una ecuación química, así que aquí tienes:
Un ejemplo de una ecuación química que muestra la combinación de átomos de hidrógeno y oxígeno para
formar una molécula de agua.

-- 38 of 178 --

40 DISEÑO ATÓMICO
Las reacciones químicas se representan mediante ecuaciones químicas, que a
menudo muestran cómo los elementos atómicos se combinan para formar
moléculas. En el ejemplo anterior, vemos cómo el hidrógeno y el oxígeno se
combinan para formar moléculas de agua.
En el mundo natural Los elementos atómicos se combinan para formar
moléculas. Estas moléculas pueden combinarse más para formar
organismos relativamente complejos. Para exponer un poco más:
ɕ Átomos son los bloques de construcción básicos de toda la materia. Cada químico
El elemento tiene propiedades distintas y no se pueden dividir más sin
perder su significado. (Sí, son verdaderos átomos
están compuestos de bits aún más pequeños como protones, electrones y
neutrones, pero los átomos son los más pequeños
funcional unidad.)
Moléculas son grupos de dos o más átomos unidos por enlaces
químicos. Estas combinaciones de átomos adquieren sus propias
propiedades únicas y se vuelven más tangibles y operativas que los
átomos.
Organismos son conjuntos de moléculas que funcionan juntas
como una unidad. Estas estructuras relativamente complejas
pueden ir desde organismos unicelulares hasta organismos
increíblemente sofisticados como los seres humanos.
Por supuesto, estoy simplificando la composición increíblemente rica del
universo, pero la esencia básica sigue siendo: los átomos se combinan para
formar moléculas, que se combinan aún más para formar organismos. Esta
teoría atómica significa que toda la materia del universo conocido se puede
dividir en un conjunto finito de elementos atómicos:
ɕ
ɕ
La tabla periódica de elementos químicos.

-- 39 of 178 --

Aparentemente, la estrategia del Sr. Rae de hacer que los estudiantes equilibren de
manera aturdidora toneladas de ecuaciones químicas funcionó, porque volveré a ella
todos estos años después en busca de inspiración sobre cómo abordar el diseño de
interfaces.
La metodología del diseño atómico
Es posible que a estas alturas se esté preguntando por qué estamos hablando de
teoría atómica, y tal vez incluso esté un poco enojado conmigo por obligarlo a revivir
los recuerdos de la clase de química de la escuela secundaria. Pero esto va a alguna
parte, lo prometo.
Hablamos anteriormente de cómo toda la materia del universo se puede
descomponer en un conjunto finito de elementos atómicos. Da la casualidad de que
nuestras interfaces se pueden dividir en un conjunto finito de elementos similar.
Tabla periódica de elementos HTML de Josh Duck articula maravillosamente cómo
todos nuestros sitios web, aplicaciones, intranets, hoobadyboops y lo que sea
están compuestos por los mismos elementos HTML.

---

## Sección 19: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 41

La tabla periódica de elementos HTML de Josh Duck.

-- 40 of 178 --

42 DISEÑO ATÓMICO
Debido a que comenzamos con un conjunto finito similar de bloques de construcción,
podemos aplicar el mismo proceso que ocurre en el mundo natural para diseñar y
desarrollar nuestras interfaces de usuario.
Ingrese al diseño atómico.
El diseño atómico es una metodología compuesta por cinco etapas
distintas que trabajan juntas para crear sistemas de diseño de interfaces
de una manera más deliberada y jerárquica. Las cinco etapas del diseño
atómico son:
1. Átomos
2. Moléculas
3. Organismos
4. Plantillas
5. Paginas
El diseño atómico no es un proceso lineal, sino más bien un modelo mental que nos
ayude a pensar en nuestras interfaces de usuario como un todo cohesivo y una
colección de partes
al mismo tiempo. Cada una de las cinco etapas juega un papel
clave en la jerarquía de nuestros sistemas de diseño de interfaces. Vamos a
sumergirnos en cada etapa con un poco más de detalle.
El diseño atómico consiste en átomos, moléculas, organismos, plantillas y páginas que trabajan conjuntamente
para crear sistemas de diseño de interfaces eficaces.

-- 41 of 178 --

---

## Sección 20: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 43

Átomos
Si los átomos son los bloques de construcción básicos de la materia, entonces el Los
átomos de nuestras interfaces sirven como bloques de construcción
fundamentales que comprenden todas nuestras interfaces de usuario. Estos
átomos incluyen elementos HTML básicos como etiquetas de formulario, entradas,
botones y otros que no se pueden desglosar más sin dejar de ser funcionales.
Cada átomo del mundo natural tiene sus propias propiedades únicas. Un átomo
de hidrógeno contiene un electrón, mientras que un átomo de helio contiene
dos. Estas propiedades químicas intrínsecas tienen efectos profundos en su
aplicación (por ejemplo, la explosión de Hindenburg fue tan catastrófica porque
la aeronave estaba llena de gas hidrógeno extremadamente inflamable frente a
gas helio inerte). En el mismo
42 https://developer.mozilla.org/en-US/docs/Web/HTML/Element
Los átomos incluyen etiquetas HTML
básicas como entradas, etiquetas y botones.

-- 42 of 178 --

44 DISEÑO ATÓMICO
De esta manera, cada átomo de interfaz tiene sus propias propiedades únicas, como
las dimensiones de una imagen principal o el tamaño de fuente de un encabezado
principal. Estas propiedades innatas influyen en cómo se debe aplicar cada átomo al
sistema de interfaz de usuario más amplio.
En el contexto de una biblioteca de patrones, los átomos demuestran todos sus
estilos básicos de un vistazo, lo que puede ser una referencia útil a la que recurrir
a medida que desarrolla y mantiene su sistema de diseño. Pero al igual que los
átomos en el mundo natural, los átomos de interfaz no existen en el vacío y solo
cobran vida con la aplicación.
Moléculas
En química, las moléculas son grupos de átomos unidos entre sí que adquieren
distintas propiedades nuevas. Por ejemplo, las moléculas de agua y las moléculas de
peróxido de hidrógeno tienen sus propias propiedades únicas y se comportan de
manera bastante diferente, a pesar de que están formadas por los mismos elementos
atómicos (hidrógeno y oxígeno).
En interfaces, Las moléculas son grupos relativamente simples de elementos UI que
funcionan juntos como una unidad. Por ejemplo, una etiqueta de formulario, una entrada
de búsqueda y un botón pueden unirse para crear una molécula de formulario de búsqueda.

-- 43 of 178 --

Cuando se combinan, estos átomos abstractos de repente tienen un propósito. La
etiqueta átomo ahora define el átomo de entrada. Al hacer clic en el botón atom
ahora se envía el formulario. El resultado es un componente simple, portátil y
reutilizable que se puede colocar en cualquier lugar donde se necesite la función de
búsqueda.
Ahora, ensamblar elementos en grupos funcionales simples es algo que
siempre hemos hecho para construir interfaces de usuario. Pero dedicar
una etapa en la metodología de diseño atómico a estos componentes
relativamente simples nos brinda algunas ideas clave.
La creación de componentes simples ayuda a los diseñadores y desarrolladores
de UI a adherirse a las principio de responsabilidad única , un antiguo precepto
de las ciencias de la computación que fomenta la mentalidad de “hacer una cosa
y hacerlo bien”. Cargar un solo patrón con demasiada complejidad hace que el
software sea difícil de manejar. Por lo tanto, la creación de moléculas de IU
simples facilita las pruebas, fomenta la reutilización y promueve la coherencia
en toda la interfaz.
Ahora tenemos componentes simples, funcionales y reutilizables que podemos poner
en un contexto más amplio. ¡Entren organismos!
Una molécula de formulario de búsqueda se compone de un átomo
de etiqueta, un átomo de entrada y un átomo de botón.

---

## Sección 21: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 45

-- 44 of 178 --

46 DISEÑO ATÓMICO
Organismos
Los organismos son componentes de IU relativamente complejos
compuestos por grupos de moléculas y / o átomos y / u otros organismos. Estos
organismos forman distintas secciones de una interfaz.
Revisemos nuestra forma de búsqueda de moléculas. Un formulario de búsqueda a menudo se
puede encontrar en el encabezado de muchas experiencias web, así que pongamos esa molécula de
formulario de búsqueda en el contexto de un organismo de encabezado.
El encabezado forma una sección independiente de una interfaz, aunque
contiene varias piezas más pequeñas de interfaz con sus propias
propiedades y funciones únicas.
Los organismos pueden constar de tipos de moléculas similares o diferentes. Un organismo de
encabezado puede constar de elementos diferentes, como una imagen de logotipo, una lista de
navegación principal y un formulario de búsqueda. Vemos este tipo de organismos en casi
todos los sitios web que visitamos.
Este organismo encabezado está compuesto por una molécula de formulario de búsqueda, un
átomo de logotipo y una molécula de navegación primaria.

-- 45 of 178 --

Los organismos como los encabezados de sitios web consisten en moléculas más pequeñas como navegación
principal, formularios de búsqueda, navegación de utilidades y logotipos.

---

## Sección 22: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 47

Mientras que algunos organismos pueden constar de diferentes tipos de
moléculas, otros organismos pueden constar de la misma molécula repetida una
y otra vez. Por ejemplo, visite una página de categoría de casi cualquier sitio web
de comercio electrónico y verá una lista de productos que se muestra en algún
tipo de cuadrícula.
La construcción de moléculas a organismos más elaborados proporciona a los
diseñadores y desarrolladores un sentido importante del contexto. Los organismos
demuestran esos componentes más pequeños y simples en acción y sirven como
patrones distintos que se pueden usar una y otra vez. El organismo de la cuadrícula
de productos se puede emplear en cualquier lugar donde sea necesario mostrar un
grupo de productos, desde listas de categorías hasta resultados de búsqueda y
productos relacionados.
Ahora que tenemos organismos definidos en nuestro sistema de diseño,
podemos romper nuestra analogía química y aplicar todos estos componentes
a algo que se parezca a una página web.

-- 46 of 178 --

48 DISEÑO ATÓMICO
Plantillas
Un organismo de cuadrícula de productos en el sitio web de comercio electrónico de Gap consiste en la misma
molécula de artículo de producto repetida una y otra vez.

-- 47 of 178 --

Ahora, amigos, es hora de decirle adiós a nuestra analogía química. El lenguaje
de los átomos, moléculas y organismos conlleva una jerarquía útil para que
construyamos deliberadamente los componentes de nuestros sistemas de
diseño. Pero, en última instancia, debemos adoptar un lenguaje que sea más
apropiado para nuestro resultado final y tenga más sentido para nuestros
clientes, jefes y colegas. Tratar de llevar la analogía química demasiado lejos
podría confundir a las partes interesadas y hacerles pensar que estás un poco
loco. Confía en mí.
Las plantillas son objetos a nivel de página que colocan componentes en un
diseño y articulan la estructura de contenido subyacente del diseño.
Para construir sobre nuestro ejemplo anterior, podemos tomar el organismo de encabezado y
aplicarlo a una plantilla de página de inicio.
Esta plantilla de página de inicio muestra todos los componentes de página
necesarios que funcionan juntos, lo que proporciona contexto para estas
moléculas y organismos relativamente abstractos. Al crear un sistema de
diseño eficaz, es fundamental demostrar cómo los componentes se ven y
funcionan juntos en el contexto de un diseño para

---

## Sección 23: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 49

La plantilla de la página de inicio consta de organismos y moléculas aplicados a un diseño.

-- 48 of 178 --

50 DISEÑO ATÓMICO
Demuestre que las partes se suman a un todo que funciona bien. Discutiremos esto más en un
momento.
Otra característica importante de las plantillas es que centrarse en la estructura de
contenido subyacente de la página en lugar del contenido final de la página. Los
sistemas de diseño deben tener en cuenta la naturaleza dinámica del contenido, por lo
que es muy útil articular propiedades importantes de componentes como el tamaño de
las imágenes y la longitud de los caracteres de los títulos y pasajes de texto.
Mark Boulton analiza la importancia de definir la estructura de contenido
subyacente de una página:
Puedes crear buenas experiencias sin conocer el contenido. Lo que
no puede hacer es crear buenas experiencias sin conocer la
estructura de su contenido. De qué está hecho su contenido, no de
qué es su contenido.
- Mark Boulton
Al definir el esqueleto de una página, podemos crear un sistema que puede dar cuenta de una
variedad de contenido dinámico, al mismo tiempo que proporciona las medidas de seguridad
necesarias para los tipos de contenido que pueblan ciertos patrones de diseño. Por ejemplo, la
plantilla de la página de inicio de Time Inc. muestra algunos componentes clave en acción al
mismo tiempo que demuestra la estructura del contenido con respecto al tamaño de las
imágenes y la longitud de los caracteres:

-- 49 of 178 --

La plantilla de la página de inicio de Time Inc. demuestra la estructura subyacente del contenido.

---

## Sección 24: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 51

Ahora que hemos establecido el sistema esquelético de nuestras páginas, ¡pongamos un
poco de carne en los huesos!

-- 50 of 178 --

52 DISEÑO ATÓMICO
Paginas
Las páginas son instancias específicas de plantillas que muestran cómo se ve una
interfaz de usuario con contenido representativo real en su lugar. Sobre la base de
nuestro ejemplo anterior, podemos tomar la plantilla de la página de inicio y agregar
texto, imágenes y medios representativos en la plantilla para mostrar contenido real en
acción.
La etapa de la página es la etapa más concreta del diseño atómico y es
importante por algunas razones bastante obvias. Después de todo, esto es
lo que los usuarios verán e interactuarán cuando visiten su experiencia.
Esto es lo que sus partes interesadas firmarán. Y aquí es donde ve todos
esos componentes que se unen para formar una interfaz de usuario
hermosa y funcional. ¡Emocionante!

-- 51 of 178 --

---

## Sección 25: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 53

Además de demostrar la interfaz final como la verán sus usuarios, Las
páginas son esenciales para probar la eficacia del sistema de diseño
subyacente. Es en la etapa de la página donde podemos ver cómo se
mantienen todos esos patrones cuando se aplica contenido real al sistema
de diseño. ¿Todo se ve bien y funciona como debería? Si la respuesta es no,
entonces podemos retroceder y modificar nuestras moléculas, organismos y
plantillas para abordar mejor las necesidades de nuestro contenido.
Cuando vertimos contenido representativo real en la plantilla de la página de
inicio de Time Inc., podemos ver cómo se mantienen todos esos patrones de
diseño subyacentes.
La etapa de la página reemplaza el contenido del marcador de posición con contenido representativo real para
dar vida al sistema de diseño.

-- 52 of 178 --

54 DISEÑO ATÓMICO
En la etapa de la página, podemos ver cómo se ve la página de inicio de Time Inc. con contenido representativo
real en su lugar. Con el contenido real en su lugar, podemos ver si los componentes de la interfaz de usuario
que componen la página sirven correctamente el contenido que se vierte en ellos.
Debemos crear sistemas que establezcan patrones de diseño reutilizables y que
también reflejen con precisión la realidad del contenido que colocamos dentro de
esos patrones.

-- 53 of 178 --

---

## Sección 26: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 55

Las páginas también proporcionan un lugar para articular variaciones en las plantillas,
lo cual es crucial para establecer sistemas de diseño robustos y confiables. A
continuación, se muestran algunos ejemplos de variaciones de plantillas:
ɕ Un usuario tiene un artículo en su carrito de compras y otro usuario tiene
diez artículos en su carrito.
El panel de una aplicación web generalmente muestra la actividad reciente, pero esa
sección está suprimida para los usuarios nuevos.
El título de un artículo puede tener 40 caracteres, mientras que el título
de otro artículo puede tener 340 caracteres.
Los usuarios con privilegios administrativos pueden ver botones y opciones
adicionales en su panel en comparación con los usuarios que no son
administradores.
todos estos ejemplos, las plantillas subyacentes son las mismas,
ɕ
ɕ
ɕ
En
pero las interfaces de usuario cambian para reflejar la naturaleza dinámica del
contenido. Estas variaciones influyen directamente en cómo se construyen las
moléculas, los organismos y las plantillas subyacentes. Por lo tanto, crear
páginas que tengan en cuenta estas variaciones nos ayuda a crear sistemas de
diseño más resistentes.
¡Eso es diseño atómico! Estas cinco etapas distintas trabajan juntas al mismo tiempo
para producir sistemas de diseño de interfaz de usuario efectivos. Para resumir el
diseño atómico en pocas palabras:
ɕ Átomos son elementos de la interfaz de usuario que no se pueden desglosar más
y sirven como bloques de construcción elementales de una interfaz.
Moléculas son colecciones de átomos que forman componentes de IU
relativamente simples.
Organismos son componentes relativamente complejos que forman
secciones discretas de una interfaz.
Plantillas coloque componentes dentro de un diseño y demuestre la
estructura de contenido subyacente del diseño.
Paginas aplique contenido real a las plantillas y articule variaciones para
demostrar la interfaz de usuario final y probar la resistencia del sistema de
diseño.
ɕ
ɕ
ɕ
ɕ

-- 54 of 178 --

56 DISEÑO ATÓMICO
Ventajas del diseño atómico
Entonces, ¿por qué pasar por todo este rigamarole? ¿Para qué sirve el diseño atómico?
Estas son preguntas válidas, considerando que hemos estado construyendo interfaces de
usuario durante mucho tiempo sin tener implementada una metodología explícita de
cinco etapas. Pero el diseño atómico nos proporciona algunas ideas clave que nos ayudan
a crear sistemas de diseño de UI más efectivos y deliberados.
La parte y el todo
Una de las mayores ventajas que ofrece el diseño atómico es la capacidad de
cambiar rápidamente entre lo abstracto y lo concreto. Podemos ver
simultáneamente nuestras interfaces divididas en sus elementos atómicos y también
ver cómo esos elementos se combinan para formar nuestras experiencias finales.
En su libro
La forma del diseño, Frank Chimero articula maravillosamente el
poder que brinda este recorrido:
El pintor, alejado del caballete, puede valorar y analizar el conjunto de
la obra desde esta posición ventajosa. Él escudriña y escucha, elige el
siguiente trazo para hacer, luego se acerca al lienzo para hacerlo.
Luego, retrocede nuevamente para ver lo que ha hecho en relación con
el todo. Es una danza de contextos cambiantes, un ritmo de golpeteo a
través del piso del estudio que produce un circuito de
retroalimentación estrecho entre marcar y evaluar.
- Frank Chimero
El diseño atómico permite a los diseñadores atravesar lo abstracto y lo concreto.

-- 55 of 178 --

---

## Sección 27: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 57

El diseño atómico nos permite bailar entre contextos como el pintor Frank
describe tan elocuentemente. Los átomos, moléculas y organismos que
componen nuestras interfaces no viven en el vacío. Y las plantillas y páginas
de nuestras interfaces están compuestas por partes más pequeñas. Las
partes de nuestros diseños influyen en el todo y el todo influye en las
partes. Los dos están entrelazados y el diseño atómico acepta este hecho.
Cuando los diseñadores y desarrolladores están creando un componente en
particular, somos como el pintor en el lienzo que crea trazos detallados. Cuando
estamos viendo esos componentes en el contexto de un diseño con contenido
representativo real en su lugar, somos como el pintor a varios metros del lienzo
evaluando cómo sus trazos detallados afectan a toda la composición. Es necesario
concentrarse en un componente en particular para asegurarse de que sea
funcional, utilizable y atractivo. Pero también es necesario asegurarse de que el
componente sea funcional, utilizable y atractivo.
en el contexto de la interfaz de
usuario final.
El diseño atómico nos proporciona una estructura para navegar entre las
partes y la totalidad de nuestras IU, por lo que es crucial reiterar que
El diseño atómico no es un proceso lineal. Sería una tontería diseñar botones y
otros elementos de forma aislada, luego cruzar los dedos y esperar que todo se
junte para formar un todo cohesivo. Así que no interprete las cinco etapas del
diseño atómico como “Paso 1: átomos; Paso 2: moléculas; Paso 3: organismos;
Paso 4: plantillas; Paso 5: páginas ". En lugar de, Piense en las etapas del diseño
atómico como un modelo mental que nos permite crear simultáneamente
interfaces de usuario finales y sus sistemas de diseño subyacentes.
Separación limpia entre estructura y contenido
Que se discute
diseño y
contenido es un poco como discutir el
pollo y el
huevo.
Mark Boulton explica:
El contenido debe estar estructurado y la estructuración altera su
contenido, el diseño altera el contenido. No es "contenido y luego
diseño", o "contenido o diseño". Es 'contenido y diseño'.
- Mark Boulton

-- 56 of 178 --

58 DISEÑO ATÓMICO
Un sistema de diseño bien elaborado se adapta al contenido que vive dentro de él,
y el contenido bien elaborado es consciente de cómo se presenta en el contexto
de una interfaz de usuario. Los patrones de interfaz que establezcamos deben
reflejar con precisión la naturaleza del texto, las imágenes y otros contenidos que
viven dentro de ellos. Del mismo modo, nuestro contenido debe conocer la forma
en que se presentará. La estrecha relación entre contenido y diseño requiere que
consideremos ambos cuando construimos nuestras IU.
El diseño atómico nos da un lenguaje para discutir la estructura de nuestros
patrones de interfaz de usuario y también el contenido que va dentro de esos
patrones. Si bien existe una clara separación entre el esqueleto de la estructura
del contenido (plantillas) y el contenido final (páginas), el diseño atómico
reconoce que los dos se influyen mucho entre sí. Por ejemplo, tome el siguiente
ejemplo:
A la izquierda vemos el esqueleto de contenido de la interfaz de usuario, que
consta del mismo
molécula de bloque de persona repetido una y otra vez. A la
derecha vemos lo que sucede cuando llenamos cada instancia de la molécula de
bloque de persona con contenido representativo. Visualizar el esqueleto del
contenido y el contenido final representativo nos permite crear patrones que
reflejan con precisión el contenido que vive dentro de ellos. Si el nombre de una
persona se ajustara a cinco líneas dentro del patrón, tendríamos que abordar ese
comportamiento roto a un nivel más atómico.

-- 57 of 178 --

---

## Sección 28: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 59

El contenido que viertemos en nuestras IU en la etapa de la página influirá en las
características y parámetros de los patrones de diseño subyacentes.
¿Lo que hay en un nombre?
A lo largo de este libro, he mencionado que el diseño y desarrollo modular no es
nada nuevo. Entonces, ¿por qué estamos introduciendo términos como
átomos, moléculas, y
organismos cuando podemos ceñirnos a términos establecidos
como
módulos, componentes, elementos, secciones, y
¿regiones?
Durante el tiempo que he estado hablando de diseño atómico, he tenido personas
que ofrecen nombres alternativos para las etapas de la metodología. La Persona
Uno sugeriría: "¿Por qué no simplemente nombrarlos elementos, módulos y
componentes?" mientras que la Persona Dos sugeriría, "¿Por qué no simplemente
nombrarlos base, componentes y módulos?" El problema con términos como
componentes y módulos es que el sentido de jerarquía no se puede deducir solo
de los nombres. Los átomos, moléculas y organismos implican una jerarquía. que
cualquier persona con un conocimiento básico de química pueda, con suerte,
entenderlo.
Dicho esto, nombrar las cosas es difícil e imperfecto. Los nombres que he elegido
para las etapas de diseño atómico han funcionado muy bien para mí y para los
equipos con los que he trabajado mientras creamos sistemas de diseño de UI. Pero
tal vez no funcionen para usted y su organización. Eso está más que bien. Aquí hay
una perspectiva del equipo de diseño de GE:
Cuando mostramos nuestros conceptos de sistema de diseño inicial que usaban
la taxonomía del Diseño Atómico a nuestros colegas, nos encontramos con
algunas miradas confusas. […] La evidencia era clara, para que esto tuviera éxito
dentro de nuestra organización teníamos que hacer que la taxonomía fuera más
accesible.
- Jeff Crossman, diseño de GE
La taxonomía en la que aterrizó el equipo fueron "Principios", "Conceptos
básicos", "Componentes", "Plantillas", "Funciones" y "Aplicaciones". ¿Estas
etiquetas tienen sentido para ti? No importa. Al establecer una taxonomía
que tuviera sentido para su organización, todos pudieron incorporarse a
los principios del diseño atómico y trabajar juntos de manera eficaz.

-- 58 of 178 --

60 DISEÑO ATÓMICO
El “diseño atómico” como palabra de moda encapsula los conceptos de diseño y
desarrollo modular, que se convierte en una abreviatura útil para convencer a las
partes interesadas y hablar con los colegas. Pero El diseño atómico no es un dogma
rígido. En última instancia, cualquier taxonomía con la que elija trabajar debería
ayudarlo a usted y a su organización a comunicarse de manera más efectiva para crear
un sistema de diseño de interfaz de usuario increíble.
El diseño atómico es para interfaces de usuario
El diseño atómico es un concepto nacido de la web. Después de todo, su humilde
autor es un diseñador web, que es principalmente la razón por la que este libro se
centra principalmente en las interfaces basadas en la web. Pero es importante
entender que El diseño atómico se aplica a todas las interfaces de usuario, no
solo a las basadas en web.
Puede aplicar la metodología de diseño atómico a la interfaz de usuario de
cualquier software: Microsoft Word, Keynote, Photoshop, el cajero automático
de su banco, lo que sea. Para demostrarlo, apliquemos el diseño atómico a la
aplicación móvil nativa Instagram.
Diseño atómico aplicado a la aplicación móvil nativa Instagram.

-- 59 of 178 --

---

## Sección 29: CAPÍTULO 2 / METODOLOGÍA DE DISEÑO ATÓMICO 61

Veamos esta interfaz atomizada de Instagram:
ɕ Átomos: Esta pantalla de la interfaz de usuario de Instagram consta de un puñado
de iconos, algunos elementos a nivel de texto y dos tipos de imágenes: la
imagen principal y la imagen de avatar del usuario.
Moléculas: Varios íconos forman componentes utilitarios simples como la barra de
navegación inferior y la barra de acciones de fotos donde los usuarios pueden dar
me gusta o comentar una foto. Además, las combinaciones simples de texto y / o
imágenes forman componentes relativamente simples.
Organismos: Aquí podemos ver cómo toma forma el organismo de la foto,
que consiste en la información del usuario, la marca de tiempo, la foto en sí,
las acciones en torno a esa foto e información sobre la foto, incluido el
recuento y el título. Este organismo se convierte en la piedra angular de toda
la experiencia de Instagram, ya que se apila repetidamente en un flujo
interminable de fotos generadas por el usuario.
Plantillas: Vemos cómo nuestros componentes se unen en el contexto de
un diseño. Además, es aquí donde vemos el esqueleto de contenido
expuesto de la experiencia de Instagram, destacando el contenido dinámico
como el identificador del usuario, el avatar, la foto, el recuento de me gusta
y el título.
Paginas: Y finalmente vemos el producto final, completo con contenido real
vertido en él, lo que ayuda a garantizar que el sistema de diseño subyacente
se una para formar una interfaz de usuario hermosa y funcional.
Muestro este ejemplo no web porque el diseño atómico tiende a malinterpretarse
como un enfoque de tecnologías específicas de la web como CSS y JavaScript.
Déjame ser claro sobre esto: El diseño atómico no tiene nada que ver con
temas específicos de la web como CSS o arquitectura JavaScript. En el capítulo
1 discutimos la tendencia hacia la modularidad en todos los aspectos del diseño y
desarrollo, que incluye CSS y JavaScript. Estas son tendencias fantásticas en CSS y
JavaScript, pero el diseño atómico se ocupa de crear sistemas de diseño de
interfaz de usuario independientemente de la tecnología utilizada para crearlos.
ɕ
ɕ
ɕ
ɕ

-- 60 of 178 --

62 DISEÑO ATÓMICO
El diseño atómico en teoría y en la práctica.
Este capítulo presentó la metodología de diseño atómico y demostró cómo los
átomos, moléculas, organismos, plantillas y páginas trabajan juntos para crear
sistemas de diseño de interfaces reflexivos y deliberados. El diseño atómico nos
permite ver nuestras interfaces de usuario desglosadas en sus elementos
atómicos, y también nos permite avanzar simultáneamente a través de cómo esos
elementos se unen para formar nuestras interfaces de usuario finales.
Aprendimos sobre el estrecho vínculo entre contenido y diseño, y cómo el diseño
atómico nos permite crear sistemas de diseño que se adapten al contenido que
vive dentro de ellos. Y, finalmente, aprendimos cómo el lenguaje del diseño
atómico nos brinda una útil abreviatura para discutir la modularidad con nuestros
colegas y proporciona un sentido de jerarquía muy necesario en nuestros
sistemas de diseño.
El diseño atómico es una metodología de diseño y desarrollo útil, pero
esencialmente es simplemente un modelo mental para construir una interfaz de
usuario. A estas alturas te estarás preguntando
cómo haces realidad el diseño
atómico. Bueno, no temas, querido lector, porque el resto del libro se enfoca en
herramientas y procesos para hacer realidad tus sueños de diseño atómico.

-- 61 of 178 --

Pattern Lab y las cualidades de las
guías de estilo efectivas
Herramientas de
el comercio

---

## Sección 30: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO sesenta y cinco

-- 62 of 178 --

En el capítulo anterior, presenté la metodología de diseño atómico para
construir interfaces de usuario. Espero que encuentres que el diseño atómico es
un modelo mental útil para construir sistemas de diseño de interfaz de usuario,
pero ahora es el momento de bajar de la torre de marfil y poner en práctica el
diseño atómico.
en el mundo real.
La piedra angular del diseño y desarrollo basados en patrones es la biblioteca de patrones,
que sirve como un centro centralizado de todos los componentes de la interfaz de usuario
que componen su interfaz de usuario. Como comentamos en el capítulo 1, los beneficios de
las bibliotecas de patrones son muchos:
ɕ Ellos promover la coherencia y la cohesión a través de todo
experiencia.
Ellos acelerar el flujo de trabajo de su equipo, ahorrando tiempo y dinero.
Ellos establecer un flujo de trabajo más colaborativo entre todas las
disciplinas involucradas en un proyecto.
Ellos establecer un vocabulario compartido entre todos en una
organización, incluidos los proveedores externos.
Ellos proporcionar documentación útil para ayudar a educar a
las partes interesadas, colegas e incluso a terceros.
Ellos facilitan las pruebas de accesibilidad, rendimiento y entre
navegadores / dispositivos.
Ellos servir como una base favorable al futuro para que los equipos modifiquen,
amplíen y mejoren con el tiempo.
Todo eso suena maravilloso, ¿verdad? Casi puedo oírte decir: "Necesito todo este
asunto de la biblioteca de patrones en mi vida". Pero, ¿cómo hacemos que
sucedan las bibliotecas de patrones? Bueno, ha venido al lugar correcto, amigo,
porque el resto de este libro está dedicado exactamente a eso. Este capítulo
presentará herramientas útiles para crear bibliotecas de patrones, el próximo
capítulo discutirá cómo hacer que los patrones sean la piedra angular de su flujo
de trabajo de diseño y desarrollo, y el quinto capítulo cubrirá cómo hacer que su
sistema de diseño resista la prueba del tiempo.
Este capítulo hablará sobre las cualidades de las bibliotecas de patrones efectivas a
través de la lente de una herramienta llamada Laboratorio de patrones , un proyecto de
código abierto mantenido por desarrolladores web Dave Olsen ,
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ

-- 63 of 178 --

66 DISEÑO ATÓMICO
Brian Muenzenmeyer y yo para ejecutar sistemas de diseño atómico. Si bien
hablaré con entusiasmo de Pattern Lab y sus diversas características, quiero
enfatizar que el objetivo de este capítulo es cubrir las características de las
bibliotecas de patrones bien construidas, no venderle ninguna herramienta
específica. ¡Diablos, Pattern Lab ni siquiera está a la venta! Ninguna
herramienta será perfecta para cada configuración y escenario, pero asegúrese
de tener en cuenta los siguientes principios al decidir qué herramientas utilizar
para crear sus bibliotecas de patrones.
¿Qué es exactamente Pattern Lab?
Antes de sumergirnos en los detalles prácticos de cómo funciona Pattern Lab, es
importante tomarse un tiempo para explicar qué es y qué no es la herramienta.
Pattern Lab es ...
ɕ una herramienta generadora de sitios estáticos para la construcción de sistemas de diseño atómico.
ɕ una herramienta de anotación y documentación de patrones.
ɕ un kit de inicio de patrón.
Pattern Lab no es ...
ɕ un marco de interfaz de usuario como Bootstrap o Foundation.
ɕ depende del idioma, biblioteca o estilo.
ɕ un reemplazo para un sistema de gestión de contenido.
Repasemos estos puntos, comenzando con el término
generador de sitio
estático. Las herramientas de generación de sitios estáticos toman algunos
códigos fuente y activos, los compilan y escupen HTML, CSS y JavaScript en el
otro extremo. Pattern Lab toma el código fuente, es decir, los patrones, y
compila esos patrones en una interfaz de usuario funcional dentro de un
shell de biblioteca de patrones.
Entonces, ¿cómo se ve Pattern Lab fuera de la caja? Redoble de tambores por favor.

-- 64 of 178 --

---

## Sección 31: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 67

No es un diseño terriblemente inspirador, ¿eh? Lo crea o no, este mínimo (incluso se
podría decir
falta de) el diseño es deliberado. Para evitar una clasificación incorrecta
como un marco de interfaz de usuario como Bootstrap, el diseño se reduce
deliberadamente para que nadie tome por error la interfaz de usuario de demostración
de Pattern Lab para los estilos sugeridos. Pattern Lab no le da ninguna respuesta sobre
cómo diseñar o diseñar su código de front-end
-
tienes que hacer todo ese trabajo tú mismo. La apariencia, las convenciones de
nomenclatura, la sintaxis, la estructura, las bibliotecas y los scripts que elija usar para
crear su interfaz de usuario dependen completamente de usted y su equipo. Diablos,
incluso puedes usar marcos de interfaz de usuario como Bootstrap
dentro de Laboratorio
de patrones. Pattern Lab está ahí para ayudar a unir todo.
Como aspecto técnico, Pattern Lab utiliza PHP o Node.js como motor que une los
patrones y genera la biblioteca de patrones. Sin embargo, no necesita ser un
mago de PHP o un gurú de Node.js para usar Pattern Lab, como tampoco
necesita saber cómo construir un motor de combustión interna para conducir un
automóvil. Además, su sitio web final no tiene que estar construido con PHP o
Node.js para usar la herramienta, ya que la salida de Pattern Lab es HTML, CSS y
JavaScript independiente del backend. Entonces, como cualquier decisión
tecnológica, elija una biblioteca de patrones
Un panel de control de Pattern Lab predeterminado. Lo que le falta en buena apariencia, lo compensa en utilidad.

-- 65 of 178 --

68 DISEÑO ATÓMICO
herramienta que se adapta a la infraestructura de su organización y se adapta a la forma en
que su equipo trabaja en conjunto.
Si todo eso le pareció un galimatías, no se preocupe. Este capítulo se centra en
las características generales de Pattern Lab y los principios de las bibliotecas de
patrones efectivas, en lugar de ir demasiado lejos por la trampa técnica. Si está
interesado, puede consultar Documentación de Pattern Lab para sumergirse en
el meollo de la cuestión.
Construyendo sistemas de diseño atómico con Pattern Lab
Para comprender el concepto central detrás de Pattern Lab, debe
comprender las muñecas de anidación rusas.
Las muñecas Matryoshka (también conocidas como muñecas de anidación
rusas) son muñecas de madera huecas bellamente talladas de tamaño
creciente que se colocan una dentro de la otra. Los patrones en Pattern Lab
operan de manera similar: los patrones más pequeños (átomos) se incluyen
dentro de patrones más grandes (moléculas), que se incluyen en patrones aún
más grandes (organismos), que a su vez se incluyen en patrones aún más
grandes (plantillas).
Muñecas de anidación rusas. Credito de imagen: S. Faric en Flickr

-- 66 of 178 --

---

## Sección 32: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 69

Construir interfaces de usuario de esta manera mantiene las cosas SECO , que es
un principio informático de larga data que significa "no te repitas". Lo que esto
significa es que puede realizar un cambio en un patrón, y en cualquier lugar
donde se emplee ese patrón se actualizará mágicamente con esos cambios. Este
enfoque de muñeca rusa de anidación acelera considerablemente su flujo de
trabajo y, sin duda, le gana a los pantalones al examinar cientos de documentos
de Photoshop para cada instancia de un patrón con el fin de hacer un cambio
simple.
Para que esto suceda, Pattern Lab utiliza el
incluir característica de
Moustache, un lenguaje de plantillas sin lógica. Así es como se ve una
inclusión de bigote:
{{> atom-thumbnail}}
Este es el código de Bigote, en caso de que las llaves dobles ({{}}) que
parecen pequeños bigotes no lo delaten. El símbolo mayor que (>) es la
forma en que Moustache le dice a Pattern Lab que incluya un patrón de
átomo llamado "miniatura". Pattern Lab buscará en sus carpetas de
patrones para encontrar un átomo llamado "miniatura".
Así es como puede verse la estructura de carpetas de patrones de Pattern
Lab. Puede nombrar y clasificar estas carpetas como desee, incluido el
cambio de las etiquetas "átomos", "moléculas" y "organismos", "plantillas" y
"páginas". La consideración más importante es establecer el nombre y la
categorización que sea más efectivo para su equipo.

-- 67 of 178 --

70 DISEÑO ATÓMICO
Ahora que sabemos cómo es una inclusión, pongámosla en práctica y
echemos un vistazo a algunos patrones de un sitio web que ayudé a crear
para Time Inc. Aquí hay un patrón reutilizable que diseñamos:
Este patrón debería parecer bastante familiar. Una imagen en miniatura, un título y un
extracto que funcionan juntos como una sola unidad es un patrón común que se
encuentra en innumerables sitios web. Echemos un vistazo detrás de la cortina para ver
cómo se construye este patrón.
Para el sitio web de Time Inc., creamos una molécula de bloque básica que consta de una imagen en
miniatura, un título y un extracto.

-- 68 of 178 --

---

## Sección 33: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 71

< div clase = " poste de bloque ">
< a href = "{{url}}">
{{> átomos-pulgar}}
< h3 > {{headline}} </ h3 >
< pag > {{extracto}} </ pag >
</ a >
</ div >
Puede ver que tenemos: marcado HTML que consiste en un contenedor div
con un nombre de clase de poste de bloque; un enlace; un bigote incluido para la
imagen en miniatura; un < h3> elemento para el título; y un < p> etiqueta para el
extracto. Notarás que hay más código de Moustache para url, título, y extracto, que
usaremos más adelante para intercambiar dinámicamente el contenido real. Más
sobre esto en un momento.
Ahora que nuestro marcado de patrón está establecido, podemos incluir ese fragmento de código
en patrones más grandes usando el mismo método de inclusión:
{{> moléculas-bloque-poste}}
Ahora pasemos a organismos más complejos como el encabezado del
sitio web, que se parece un poco a esto:
El encabezado del sitio web consta de convenciones bastante comunes, como un átomo de logotipo, una
molécula de navegación primaria y una molécula de formulario de búsqueda.

-- 69 of 178 --

72 DISEÑO ATÓMICO
Cuando abrimos el capó para ver el marcado del encabezado en
Pattern Lab, vemos lo siguiente:
< encabezamiento papel = " bandera" >
{{> átomos-logo}}
{{> moléculas-navegación-primaria}}
{{> moléculas-búsqueda}}
</ encabezamiento >
¿Que está pasando aqui? Bueno, tenemos un básico < encabezado> elemento, y
dentro de ese elemento incluimos el átomo de la imagen del logotipo, la molécula de
navegación principal y la molécula de formulario de búsqueda.
Y ahora podemos incluir ese patrón relativamente complejo en cualquier lugar que lo
necesitemos.
{{> organismo-encabezado}}
Espero que a estas alturas puedas ver las muñecas rusas anidando en acción.
Los átomos más pequeños están incluidos en moléculas más grandes y esas
moléculas se incluyen en organismos aún más grandes. Ahora tomemos estos
componentes y conectemos a un diseño. Tome la plantilla de la página de inicio,
por ejemplo:

-- 70 of 178 --

---

## Sección 34: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 73

La plantilla de la página de inicio de Time Inc. consta de algunos patrones repetibles: un
encabezado global, un área de héroe, algunas secciones (que contienen una imagen, un
título, un extracto y una llamada a la acción), un área con cuatro elementos, un área de hechos y un pie de página global.

-- 71 of 178 --

74 DISEÑO ATÓMICO
Dé un paseo rápido por la plantilla de la página de inicio y verá algunos patrones
bastante estándar: un encabezado del sitio en la parte superior, un pie de página del
sitio en la parte inferior y un área de héroe en pantalla completa. También verá algunos
otros patrones que se repiten a lo largo de la plantilla.
Entonces, ¿cómo se ve esto en el código? Como era de esperar, ¡involucra
más inclusiones!
{{> organismo-encabezado}}
< principal papel = " principal" >
{{# héroe}}
{{> moléculas-héroe}}
{{/ hero}}
< sección >
{{# experience-block}}
{{> moléculas-bloque-principal}}
{{/ experience-block}}
{{# experience-feature}}
{{> Organismos-historia-característica}}
{{/ experience-feature}}
</ sección >
< sección >
{{# factoid-Advertising}}
{{> organismos-factoide}}
{{/ factoid-Advertising}}
</ sección >
< sección >
{{# publicidad }}
{{> moléculas-bloque-principal}}
{{/ publicidad }}
</ sección >
. . .
</ principal >
{{> organismos-pie de página}}
En esta etapa del juego, los patrones más pequeños ya están construidos, por
lo que todo lo que debe hacer la plantilla es colocarlos en el contexto de un
diseño de página y darles nombres únicos.

-- 72 of 178 --

---

## Sección 35: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 75

Echando un vistazo más de cerca al código, observe que ciertos patrones como
{{> organismo-encabezado}} y {{> organismos-pie de página}} están
incluido de la misma manera que los ejemplos anteriores. Pero también hay
algunos otros patrones de inclusión que se complementan con información
adicional, como la siguiente:
{{# factoid-Advertising}}
{{> organismos-factoide}}
{{/ factoid-Advertising}}
Estamos incluyendo organismos-factoride de la misma manera que todos
los demás patrones, pero también lo nombramos publicidad fáctica
envolviendo el incluir en un bigote
sección, indicado por el código de Bigote
que contiene los símbolos # y /. Al darle a la instancia de patrón un nombre
único, podemos aferrarnos a ella y reemplazar dinámicamente el contenido
del patrón. ¡Más sobre eso en la siguiente sección!
Este enfoque de muñeca rusa anidadora para construir interfaces de usuario es simple pero
tremendamente poderoso. La estructura permite a los diseñadores y desarrolladores mantener
los patrones SECOS, ahorrando tiempo, esfuerzo y dinero. El enfoque permite a los equipos crear
una interfaz de usuario final y al mismo tiempo crear el sistema de diseño de interfaz de usuario
subyacente. Después de todo, la interfaz final es una instanciación de su sistema de diseño
subyacente. Los equipos pueden
también se mueven entre lo abstracto y lo concreto, concentrándose en un patrón particular
para corregir errores ("¡El encabezado está roto!"), mientras también observa cómo los
cambios en los patrones pequeños afectan el diseño general de la página.
Trabajar con datos dinámicos
Es importante articular la estructura de contenido subyacente de los patrones de IU dentro del
contexto de una biblioteca de patrones. Es por eso que hemos estado buscando imágenes en
escala de grises que muestren dimensiones y texto de marcador de posición que contenga límites
de caracteres. Pero si bien esta información es útil para los equipos creativos, las imágenes en
escala de grises y
Lorem ipsum el texto no es con lo que los usuarios interactúan en su sitio real.
Necesitamos una forma de reemplazar nuestro contenido ficticio con contenido representativo
real para garantizar que nuestros patrones de interfaz de usuario coincidan con la realidad del
contenido que vive dentro de ellos.
Para demostrar cómo Pattern Lab intercambia dinámicamente contenido real en plantillas,
echemos un vistazo a una comparación en paralelo de la plantilla de la página de inicio y
los niveles de página de Time Inc.:

-- 73 of 178 --

76 DISEÑO ATÓMICO
Una comparación en paralelo de la plantilla de la página de inicio y los niveles de página de Time Inc. La plantilla
articula la estructura de contenido del sistema de diseño, mientras que la página muestra cómo se ve el sistema
con el contenido real que muestra.

-- 74 of 178 --

---

## Sección 36: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 77

A la izquierda tenemos el nivel de plantilla, que articula la estructura de
contenido de los patrones que componen la página web. Y a la derecha
tenemos el nivel de la página, donde estamos vertiendo contenido
representativo real para demostrar cómo se vería la interfaz de usuario final
y probar la efectividad del sistema de diseño.
¿Cómo intercambiamos contenido ficticio por contenido real en Pattern
Lab? Pattern Lab usa JSON (así como YAML, Markdown y otros
formatos de datos) para definir e intercambiar los bits dinámicos de contenido en
nuestros diseños.
Los datos de marcador de posición predeterminados se definen en un archivo llamado
data.json
que vive en Pattern Lab's /
fuente directorio. Dentro de este archivo definimos todo el texto, las
rutas de las imágenes y otros datos dinámicos que compondrán nuestra interfaz de usuario.
Aquí hay una pequeña muestra de Time Inc.
data.json expediente:
"héroe" : {
"titular" : "Lorem Ipsum" ,
"img" : {
"src" : "/images/sample/fpo_hero.png" ,
"alt" : "Imagen de héroe"
}
}
Para los desarrolladores, este tipo de formato probablemente les resulte familiar. Si no
eres un desarrollador, ¡no te asustes! Una vez que mire más allá de las llaves y las
comillas, verá que estamos definiendo un héroe objeto (para el área de héroe
completamente sangrado directamente debajo del encabezado) que tiene un
titular valor de "Lorem Ipsum", y un img con un src valor de
“/images/sample/fpo_hero.png”. Simplemente estamos definiendo los
atributos de este objeto y proporcionando valores para esos atributos.
Una vez definidos esos objetos, podemos anular sus atributos en el nivel de
página de Pattern Lab. Esto se logra creando un nuevo archivo JSON que
coincida con el nombre del patrón de página (para la página de inicio de Time
Inc., lo llamaremos
00-homepage.json) dentro de /
paginas directorio.

-- 75 of 178 --

78 DISEÑO ATÓMICO
Cuando nos abrimos
00-homepage.json podemos anular los datos del marcador de
posición que establecimos anteriormente. Esto es lo que podría parecer:
"héroe" : {
"titular" : "Mover personas" ,
"img" : {
"src" : "/images/hero_beyonce.jpg" ,
"alt" : "Beyoncé"
}
}
Al anular los datos predeterminados, el héroe el título ahora dice "Personas
en movimiento" en lugar de "Lorem Ipsum". Y en lugar de apuntar a una
imagen de héroe en escala de grises solo para ubicación (FPO), ahora
apuntamos a una imagen de Beyoncé ubicada en “/ images /
hero_beyonce.jpg”.
Dentro del directorio 'páginas' tenemos el patrón de la página de inicio, así como un archivo JSON
que coincide con el nombre del patrón. Aquí es donde anularemos el contenido predeterminado
con contenido específico de la página.

-- 76 of 178 --

---

## Sección 37: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 79

Este proceso de establecer valores predeterminados para datos dinámicos y luego
reemplazarlos con contenido específico de la página continúa para cada sección del
sitio web. Además de reemplazar cadenas simples como encabezados, también
podemos establecer dinámicamente variables para cierto o falso,
recorrer una variedad de elementos y más. Incluso podemos alterar drásticamente la interfaz
de usuario con solo unos pocos cambios en un archivo JSON, de lo que hablaremos a
continuación.
Variaciones de patrones articulados
con pseudopatrones
Históricamente, los diseñadores que trabajan con herramientas estáticas han
tenido la tendencia a diseñar solo los mejores escenarios. Sabes de lo que estoy
hablando: el nombre del usuario es Sara Smith y siempre encaja perfectamente
en una línea; su foto de perfil parece sacada de una revista; su perfil está
completamente lleno; las dos columnas del contenido de su perfil tienen
exactamente la misma altura.
Por supuesto, estos escenarios del mejor de los casos rara vez, o nunca, ocurren en el
mundo real.
Para crear diseños más robustos y resistentes, debemos tener en
cuenta al mismo tiempo las mejores situaciones y las peores, y
todo lo demás.
¿Qué pasa si el usuario no sube una foto de perfil? ¿Qué pasa si el usuario tiene
87 artículos en su carrito de compras? ¿Y si el producto tiene 14 opciones? ¿Qué
pasa si el título de la publicación del blog contiene 400 caracteres? ¿Qué pasa
con un usuario recurrente? ¿Un usuario por primera vez? ¿Qué pasa si el
artículo no tiene comentarios? ¿Qué pasa si tiene siete capas de comentarios
anidados? ¿Qué pasa si necesitamos mostrar un mensaje urgente en el tablero?
Articular estas variaciones de la interfaz de usuario en una herramienta de diseño
estático es un ejercicio de tedio y redundancia, lo que puede explicar por qué rara vez
se diseñan. Pero si queremos crear sistemas que aborden todas las variables y
realidades de nuestro contenido, debemos tener en cuenta esas preguntas del tipo
"qué pasaría si".
¿Cómo abordamos todo tipo de variaciones de la interfaz de usuario sin
agotarnos en el proceso? Laboratorio de patrones pseudopatrón rasgo

-- 77 of 178 --

80 DISEÑO ATÓMICO
nos permite articular escenarios a veces tremendamente diferentes con solo unos
pocos cambios en nuestros datos.
Digamos que estamos creando una aplicación cuyo panel muestra una lista de
colaboradores del proyecto. La interfaz de usuario podría verse así:
Para crear el contenido dinámico dentro de cada uno de estos bloques,
definiremos nuestra lista de colaboradores como una matriz dentro
dashboard.json:
"colaboradores" : [
{
"img" : "/images/sample/avatar1.jpg" ,
"nombre" : "Steve Boomshakalaka" ,
"título" : "CIA"
},
{
"img" : "/images/sample/avatar2.jpg" ,
"nombre" : "Gingersnap Jujubees-Daniels" ,
"título" : "Presidente del nombre de empresa más largo
del mundo, Corporación, División global"
},
{
"img" : "/images/sample/avatar3.jpg" ,
"nombre" : "Sarunus Marciulionis" ,
"título" : "Guerreros del Estado Dorado"
},
{
"img" : "/images/sample/avatar4.jpg" ,
Una lista de colaboradores del
proyecto en nuestra aplicación hipotética.

-- 78 of 178 --

---

## Sección 38: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 81

"nombre" : "Sara Smith" ,
"título" : "Título corto"
}
]
De forma predeterminada, nuestro diseño asume que el usuario es un usuario normal y no un
administrador, pero ¿qué pasaría si quisiéramos darles a los administradores la capacidad de
administrar a los colaboradores del proyecto desde el panel de control? Esa interfaz de usuario
podría verse así:
Para mostrar acciones adicionales de edición y eliminación de administrador en
el panel en Pattern Lab, podemos crear un pseudopatrón, un nuevo archivo en /
paginas
carpeta que se ve así:
panel ~ admin.json
El símbolo de tilde (~) indica un pseudopatrón.
panel ~ admin.json
heredará todos los datos contenidos en
dashboard.json, pero también nos da la
oportunidad de agregar o anular datos adicionales. Eso significa que la lista de
colaboradores que definimos anteriormente en
dashboard.json todavía está disponible,
pero podemos agregar datos adicionales dentro
panel ~ admin.json
al igual que:
"isAdmin" : cierto
Estamos definiendo una variable llamada isAdmin y configurándolo en verdadero.
Ahora podemos usar eso para incluir condicionalmente las acciones adicionales dentro
del patrón de bloque.
El panel del administrador
La interfaz de usuario introduce
acciones adicionales de edición y eliminación.

-- 79 of 178 --

82 DISEÑO ATÓMICO
< div clase = " cuadra " >
< img src = " {{img}} " alt = " {{ nombre }} "/> < h3 >
{{nombre}} </ h3 >
< h4 > {{title}} </ h4 >
{{# isAdmin}}
{{> moléculas-bloque-acciones}}
{{/ isAdmin}}
</div>
Las primeras líneas están tirando del img, nombre, y título definimos en
dashboard.json.
Pero preste mucha atención a lo que está envuelto en el isAdmin Sección de
bigote. Lo que estamos diciendo aquí es: si
isAdmin se establece en cierto, incluir un patrón de molécula llamado bloque- acciones. El
bloquear-acciones patrón contiene los botones de edición y eliminación, y solo se
mostrará si isAdmin se establece en cierto ( o cualquier otra cosa además falso). En
nuestro defecto
dashboard.json, isAdmin no está configurado, por lo que las acciones
adicionales no se mostrarán. En
panel ~ admin.json, estamos estableciendo isAdmin para
cierto por lo que se mostrarán las acciones adicionales. Puede ampliar esta técnica para
alterar drásticamente toda la interfaz de usuario (como alterar la navegación principal,
mostrar paneles adicionales en el tablero, agregar controles adicionales, etc.)
simplemente cambiando una sola variable. Cosas poderosas, de hecho.
Uf. Si has llegado hasta aquí, ¡felicitaciones! Ahora sabe cómo agregar y
manipular datos dinámicos en Pattern Lab. La capacidad de Pattern Lab
para diseñar con datos dinámicos proporciona algunos beneficios
cruciales:
ɕ Crea una clara separación entre estructura y contenido. A
La estructura del patrón y su contenido se influyen mucho entre sí. Sin
embargo, los sistemas de diseño resilientes se esfuerzan por establecer
patrones agnósticos y flexibles que pueden contener una variedad de
contenido. Desacoplar la estructura y los datos del patrón nos permite
mantener las cosas SECAS (que, nuevamente, significa no repetirse) y
realizar cambios en el contenido sin afectar la estructura del patrón. Del
mismo modo, podemos realizar cambios en un patrón sin tener que
actualizar cada instancia de ese patrón simplemente porque cada instancia
contiene datos diferentes. Esta separación da como resultado un gran
ahorro tanto de tiempo como de esfuerzo.
Establece un CMS ad hoc. El establecimiento de datos predeterminados y específicos
de la página sirve como un sistema de administración de contenido ad hoc.
ɕ

-- 80 of 178 --

---

## Sección 39: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 83

Como se mencionó anteriormente, las herramientas de diseño estático no están bien
equipadas para manejar datos dinámicos, pero también es excesivo instalar WordPress,
Drupal o algún otro CMS solo para demostrar las variaciones de la interfaz de usuario.
Pattern Lab logra un equilibrio, ya que permite a los equipos trabajar con datos
dinámicos, pero no requiere configurar ninguna base de datos MySQL loca.
Sirve como modelo para los desarrolladores de back-end responsable de
integrar la interfaz de usuario de front-end en un sistema de gestión de contenido
real. Los desarrolladores de back-end pueden ver la interfaz de usuario creada en
Pattern Lab, comprender qué bits son estáticos y dinámicos y luego traducirlos al
sistema de back-end.
Permite a los escritores, personas de contenido, diseñadores y otros no
desarrolladores contribuir al sistema de diseño vivo y dinámico. Como desarrollador
front-end, no puedo contar la cantidad de veces que he tenido que corregir errores
tipográficos, intercambiar nuevas imágenes, traducir copy decks y realizar otras ediciones
relacionadas con el contenido en el código front-end. Es la muerte por un millón de
recortes de papel, y estoy seguro de que la mayoría de los desarrolladores estarán de
acuerdo en que hacer cambios menores en la copia no es un uso efectivo de su tiempo. Al
separar la estructura y los datos, Pattern Lab permite a los miembros del equipo que no
son desarrolladores gestionar de forma segura los aspectos relacionados con el
contenido del diseño, lo que libera a los desarrolladores para que se centren en la
construcción de la estructura del sistema de diseño.
Ahora hemos cubierto la funcionalidad principal de Pattern Lab, ¡pero aún no hemos
terminado! A continuación, cubriremos algunas características adicionales que deben
considerarse, independientemente de la herramienta que utilice para crear su biblioteca de
patrones.
ɕ
ɕ
Herramientas de ventana gráfica para patrones flexibles
La multitud de dispositivos que ahora acceden a la web ha obligado a los
diseñadores a volver a abrazar la fluidez intrínseca del medio. Afortunadamente,
técnicas como diseño web adaptable Permítanos crear diseños que se vean y
funcionen maravillosamente en cualquier pantalla.
Es obvio que necesitamos establecer patrones de interfaz de usuario flexibles si
queremos crear diseños receptivos, pero crear patrones fluidos tiene ventajas
adicionales. Cuanto más fluido es un componente de la interfaz de usuario,
más resistente y versátil se vuelve. Imagine poder tomar un componente,
digamos un control deslizante de la galería de fotos, y colocarlo

-- 81 of 178 --

84 DISEÑO ATÓMICO
en cualquier lugar que lo necesitemos. A veces, es posible que necesitemos que sea un elemento
de sangrado completo que ocupe toda la ventana gráfica. En otras ocasiones, es posible que
necesitemos incluirlo en el contexto de un artículo. Y otras veces es posible que queramos
incluirlo en la barra lateral. El sueño es construir nuestros componentes de manera fluida y
adaptarán sus estilos y funcionalidad para adaptarse a los contenedores en los que los
coloquemos.
De hecho, esta es la promesa de consultas de contenedor . Las consultas de contenedores permiten que
los elementos se adapten en función de sus contenedores principales en lugar de la ventana gráfica
completa, que es la forma en que manipulamos los elementos mediante consultas de medios en este
momento. Si bien aún se está desarrollando como una capacidad de navegador nativa, las consultas de
contenedores nos permitirán a los diseñadores y desarrolladores enloquecidos por los patrones crear e
implementar fácilmente sistemas de interfaz de usuario fluidos.
Entre el diseño receptivo, las consultas de contenedores y el buen sentido común pasado de
moda, ahora entendemos por qué es imperativo crear patrones de interfaz de usuario flexibles.
Pero cómo hacemos eso? ¿Y cómo pueden nuestras herramientas de biblioteca de patrones
ayudarnos a pensar y actuar de manera flexible?
Muchas de las primeras herramientas de prueba de diseño receptivo se centraron en la
visualización de diseños en anchos de dispositivos móviles populares, como 320px (un
iPhone 4 en modo vertical), 480px (un iPhone 4 en modo horizontal), 768px (un iPad en
modo vertical), etc. . Pero, por supuesto, la web
mucho
más diversa que una vista móvil, una vista de tableta y una vista de escritorio.
Para ayudar a los diseñadores a considerar mejor todo el espectro de resolución
al probar sus diseños receptivos, creé una herramienta llamada ish.
La herramienta se llama
ish. porque seleccionar el botón pequeño da como resultado una
ventana de visualización más pequeña. Al seleccionarlo de nuevo, se obtiene una ventana de
visualización pequeña diferente. Al seleccionar el botón medio, obtendrá una ventana de
visualización mediana. Y el botón grande da como resultado una ventana de visualización de
gran tamaño. Estos valores aleatorios ayudan a los diseñadores y desarrolladores a considerar
mejor todo el espectro de resolución en lugar de un puñado de dimensiones de dispositivos
populares.
Ish. está integrado en Pattern Lab, lo que significa que podemos ver
nuestras IU y sus patrones subyacentes en todo el espectro de resolución.
Mientras ish. ayuda a los diseñadores y desarrolladores a descubrir errores a lo largo del continuo de la
ventana gráfica, lo he encontrado más útil como herramienta de educación para clientes y colegas.
Mediante la creación de una herramienta de cambio de tamaño de la ventana gráfica independiente del
dispositivo directamente en la biblioteca de patrones, clientes y colegas

-- 82 of 178 --

---

## Sección 40: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 85

Pattern Lab muestra un diseño en una ventana de visualización pequeña.
Pattern Lab muestra un diseño en una ventana de visualización mediana.
puede llegar a apreciar el hecho de que su sistema de diseño debe verse y
funcionar bien sin importar el tamaño de la ventana gráfica.

-- 83 of 178 --

86 DISEÑO ATÓMICO
Pattern Lab muestra un diseño en una ventana de visualización grande.
Una mirada debajo del capó con vista de código
Una característica común de la biblioteca de patrones es la capacidad de mirar bajo el capó y
ver el código subyacente que forma un componente en particular. Exponer el código de un
patrón de interfaz de usuario acelera el tiempo de desarrollo (me encanta copiar y pegar tanto
como el siguiente codificador) y ayuda a los líderes de equipo a hacer cumplir la sintaxis del
código y las convenciones de estilo. Esto se vuelve especialmente gratificante cuando muchos
desarrolladores están trabajando en el código base de una organización.
Los tipos de código que se resaltan en una biblioteca de patrones varían
naturalmente de una organización a otra, con el fin de cumplir con los
requisitos de la amplia gama de entornos, tecnologías y convenciones
utilizadas. La mayoría bibliotecas de patrones en la naturaleza
demuestran el HTML subyacente de un patrón, mientras que otros también
incluyen CSS y JavaScript específicos del patrón. El sistema de diseño Lightning
de Salesforce, por ejemplo, muestra el HTML de un patrón, así como todo el (S)
CSS que pertenece a ese patrón.

-- 84 of 178 --

---

## Sección 41: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 87

Incluir código de front-end lleva a los autores a escribirlo de manera más consistente, pero eso
no garantiza la perfección. Todavía hay espacio para que los desarrolladores se vuelvan
deshonestos y escriban código descuidado e incongruente
- razón por la cual algunas organizaciones han ido más allá para establecer
sistemas de diseño increíblemente sofisticados. Empresas como Lonely Planet
han logrado el santo grial de las bibliotecas de patrones, es decir su biblioteca de
patrones y su entorno de producción están perfectamente sincronizados. Discutiremos
el santo grial con más detalle en el capítulo 5, pero vale la pena mencionarlo en
esta sección para demostrar cómo eso afecta el código expuesto en el contexto
de una biblioteca de patrones. En lugar de ofrecer HTML y CSS, Lonely Planet Guía
de estilo Rizzo muestra el código de inclusión para que los equipos extraigan el
componente de interfaz de usuario adecuado.
El sistema de diseño Lightning de Salesforce muestra el código HTML y SCSS de los componentes de la interfaz de usuario.
La biblioteca de patrones del sistema de diseño Rizzo de Lonely Planet muestra el uso de la plantilla.

-- 85 of 178 --

88 DISEÑO ATÓMICO
Esta configuración permite que el equipo de desarrollo central mantenga una única fuente de
verdad para el código de front-end de todos los patrones. Para que los desarrolladores se
pongan en funcionamiento, la biblioteca de patrones solo necesita proporcionar el código
para incluir un patrón en particular.
Pattern Lab ofrece la posibilidad de ver tanto el código HTML subyacente de un
patrón como el código de plantilla utilizado para generar el HTML. También se
puede ampliar para mostrar el código CSS y JavaScript que lo acompaña.
En última instancia, cualquier herramienta de biblioteca de patrones que decida
utilizar debe tener alguna forma de vista de código. Quizás lo más importante es que
las bibliotecas de patrones que cree deben mostrar los tipos de código que le
permiten a usted y a su equipo de desarrollo ser lo más efectivos posible.
La vista de código de Pattern Lab muestra tanto el código de plantilla de un patrón como el HTML compilado.

-- 86 of 178 --

---

## Sección 42: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 89

Pattern Lab muestra documentación de patrones importante junto con los ejemplos de patrones vivos,
lo que ayuda a los equipos a comunicar definiciones, uso, ejemplos, recursos externos y más.
Documentación viva y anotaciones
En un proceso de diseño tradicional en silos, es típico ver largos documentos
de estructura alámbrica y especificaciones creados, debatidos y aprobados.
Estos documentos suelen adoptar la forma de PDF gigantes, que
Es lamentable teniendo en cuenta que a menudo contienen todo tipo de
información valiosa, instrucciones y documentación sobre el sistema de diseño.
Lamentablemente, estos artefactos voluminosos a menudo se tiran a un bote de
basura (virtual) cuando el proyecto entra en producción.
Este no debería ser el caso. La documentación de una interfaz de usuario debe
contener información de todas las disciplinas involucradas en su creación y, esto es
clave, debe integrarse en el sistema de diseño vivo y dinámico. Las bibliotecas de
patrones efectivas crean un espacio para definir y describir los componentes de la
interfaz de usuario, articulando consideraciones que van desde la accesibilidad hasta
el rendimiento, la estética y más.
Pattern Lab ofrece varias formas de agregar descripciones y anotaciones de
patrones a un sistema de diseño. Se pueden agregar descripciones de
patrones creando un archivo Markdown que corresponda al nombre de un
patrón (p. Ej.
patrón-nombre.md), que mostrará la descripción del patrón en la
vista de lista de la biblioteca.

-- 87 of 178 --

90 DISEÑO ATÓMICO
Pattern Lab también proporciona una característica interesante (me atrevo a decir) que
le permite adjuntar anotaciones a cualquier elemento de la interfaz de usuario y ver esas
anotaciones en el contexto del diseño vivo y respirable. Cuando las anotaciones están
activadas, cada elemento anotado recibe un número que, cuando se hace clic, lo lleva a
la anotación correspondiente. Esto permite a los equipos ver las consideraciones de los
patrones en el contexto de la interfaz de usuario completa. ¡Con buena pinta!
Proporcionar contexto con el linaje de patrones
Al mirar varios patrones en una biblioteca, me pregunto: "Genial, pero
¿dónde se usa realmente este componente?" Definir y describir las
características de los patrones es una cosa, pero existe la oportunidad de
proporcionar información contextual adicional sobre sus patrones de IU.
La función de anotación de Pattern Lab es interactiva y está integrada en la interfaz de usuario activa.

-- 88 of 178 --

Gracias al enfoque de inclusión de muñecas de anidación rusa descrito
anteriormente, Pattern Lab puede mostrar qué patrones componen cualquier
componente dado y también mostrar dónde se emplean esos patrones en el
sistema de diseño.
En el ejemplo anterior, tenemos un patrón de moléculas llamado bloque de
medios, que contiene una imagen, título, texto y un grupo de botones. Al
observar el linaje del patrón, podemos ver que contiene un patrón llamado átomos
cuadrados, que es la imagen del tamaño de una miniatura, así como barra de
botones de moléculas, que es el grupo de botones. También podemos ver dónde
se usa exactamente este patrón: el medios de comunicaciónlista de bloqueos organismo.
Esta información contextual es increíblemente útil para diseñadores y
desarrolladores; Sé que uso la función de linaje
todo el tiempo en mi propio flujo
de trabajo. Digamos que queremos hacer cambios a un patrón en particular,
como duplicar el tamaño de una imagen o agregar un elemento adicional: sabríamos
de inmediato qué patrones y plantillas deberían volver a probarse y
someterse a control de calidad para garantizar que nada se rompa con

---

## Sección 43: CAPÍTULO 3 / HERRAMIENTAS DEL COMERCIO 91

La función de linaje de Pattern Lab muestra qué patrones componen cualquier componente y también muestra
todos los lugares en los que se emplea ese componente.

-- 89 of 178 --

92 DISEÑO ATÓMICO
los cambios. La función de linaje también ayuda a señalar patrones redundantes e
infrautilizados para que los equipos puedan eliminarlos de la biblioteca de patrones a medida
que se acerca la fecha de lanzamiento.
A cada uno lo suyo
Así que ahí lo tienes. Pattern Lab proporciona varias funciones útiles para que los
equipos creen sistemas de diseño deliberados y reflexivos. Pero como mencioné
antes, ninguna herramienta será perfecta para todos y para todas las situaciones.
Existen un montón de herramientas geniales para ayudarlo a crear bibliotecas de
patrones efectivas, y las herramientas que elija sin duda se verán influenciadas
por el entorno, las tecnologías, el flujo de trabajo y la cultura de su organización.
Al elegir herramientas para crear su biblioteca de patrones, debe estar
atento a estas cualidades y características de las bibliotecas de patrones
efectivas:
ɕ Proporcionar descripciones y anotaciones de patrones.
ɕ Mostrar el patrón relevante HTML, plantillas, CSS y / o
Código JavaScript.
Visualización de patrones en todo el espectro de resolución.
La capacidad de mostrar variaciones de patrones, como pestañas activas o
desactivadas.
La capacidad de agregar dinámicamente contenido representativo real en las
estructuras de los patrones.
Proporcionar información contextual, como qué patrones componen un
componente en particular, así como dónde se usa ese componente.
Al final del día, no se trata de las herramientas que usamos para crear
bibliotecas de patrones, sino de cómo las usamos. Crear y mantener un
sistema de diseño eficaz significa cambiar drásticamente la cultura, los
procesos y los flujos de trabajo de su organización. Si eso te suena difícil,
es porque lo es. ¡Pero no temas! El resto del libro detallará todo el proceso
de creación y mantenimiento de un sistema de diseño exitoso para
preparar su organización para el éxito a largo plazo.
ɕ
ɕ
ɕ
ɕ

-- 90 of 178 --

Personas, procesos y cómo hacer realidad los
sistemas de diseño
El atómico
Flujo de trabajo

---

## Sección 44: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 95

-- 91 of 178 --

Hablar es barato. Y hasta ahora, hemos estado hablando mucho. ¡Eso no quiere
decir que no haya sido una conversación productiva! Después de todo, hemos
discutido la importancia del pensamiento modular, hemos aprendido una
metodología para crear sistemas de diseño de IU deliberados y hemos mostrado
herramientas para crear bibliotecas de patrones efectivas.
Pero aquí es donde el caucho se encuentra con el camino. Donde nos
remangamos y ponemos en práctica toda esta teoría. Donde estamos
hacer las
cosas. Este capítulo abordará todo lo relacionado con la venta, la creación y el
mantenimiento de sistemas de diseño eficaces. ¿Estás listo? Vamos.
¡Su gente!
El secreto no tan secreto sobre la creación de sistemas de diseño efectivos
(o hacer un gran trabajo, en realidad): todo se reduce a que las personas
realmente colaboren y se comuniquen entre sí.
Si esto es de conocimiento común, ¿por qué no escuchamos
constantemente miles de historias de éxito de todo el mundo? Dejaré que
Mark Boulton explique:
El proceso de diseño es extraño y complicado, porque la gente
es rara y complicada.
- Mark Boulton
Puede tener todas las tecnologías adecuadas en su lugar, utilizar las últimas y mejores
herramientas e incluso tener personas extraordinariamente talentosas a bordo, pero si
todos los involucrados no están cooperando y comunicándose entre sí, entonces no va
a crear un gran trabajo. . Es tan simple como eso. Eso no quiere decir que no puedas
crear
bien funciona, pero la mayoría de las veces vas a crear
uno de los muchos
matices decepcionantes del mal trabajo.
Establecer y mantener sistemas de diseño de interfaz exitosos requiere un
esfuerzo de toda la organización, y este capítulo discutirá cómo superar las
muchas peculiaridades de los seres humanos para que sucedan.

-- 92 of 178 --

96 DISEÑO ATÓMICO
Cuándo establecer un sistema de diseño
Entonces, ¿cuándo es el mejor momento para establecer un sistema de diseño de
interfaz? Respuesta corta:
ahora.
Los sistemas de diseño y las bibliotecas de patrones que los acompañan a
menudo se crean junto con un nuevo diseño o proyecto de rediseño, un
esfuerzo de remodelación u otra iniciativa. Llevar a cuestas otro proyecto es
una excelente manera de introducir una biblioteca de patrones en su
organización.
Dicho esto, la creación de un sistema de diseño y una biblioteca de patrones no
necesariamente tiene que coincidir con otro proyecto. Si puede convencer a sus
clientes y partes interesadas de que aporten dinero y recursos para un proyecto
de sistema de diseño dedicado, ¡bienvenido!
¿Cómo vende exactamente un sistema de diseño a sus clientes, jefes,
colegas y partes interesadas? ¡Póngase su sombrero de negocios,
porque lo abordaremos en la siguiente sección!
Patrones de lanzamiento
Introducir una nueva forma de hacer las cosas no es tarea fácil, ya que requiere cambiar las
mentalidades y comportamientos existentes de las personas. Conseguir que las partes
interesadas y los clientes se unan al establecimiento de un sistema de diseño implica una
educación constante, además de un poco de experiencia en marketing.
Lo primero es lo primero. Es necesario presentar el concepto de sistemas de
diseño de interfaces a sus clientes, colegas y partes interesadas. Explique qué son
estos sistemas de diseño y las muchas formas en que pueden ayudar a la
organización. Hemos analizado estos beneficios a lo largo del libro, para que
pueda explicar cómo los sistemas de diseño promueva la coherencia y la
cohesión, acelere la productividad de su equipo, establezca un flujo de
trabajo más colaborativo, establezca un vocabulario compartido,
proporcione documentación útil, facilite las pruebas y sirva como una base
para el futuro. ¿Quién puede decir que no a todo eso?
Por desgracia, descubrí que puedo exagerar los sistemas de diseño hasta que me
quede azul en la cara, pero los trajes no siempre ven las cosas a través de la misma
lente que la gente en el suelo. Una simple reformulación de la pregunta ayuda

-- 93 of 178 --

---

## Sección 45: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 97

inmensamente. Es mucho más efectivo simplemente preguntar " ¿Le gusta
ahorrar tiempo y dinero? ¿Si o no? "Si la respuesta a esa pregunta es
no, Me
temo que tienes problemas mucho mayores que vender un sistema de diseño. Si
la respuesta es
sí, entonces puede presentar los beneficios a través de la lente del
tiempo y el dinero. Probemos esto, ¿de acuerdo?
ɕ Sistemas de diseño conducen a experiencias coherentes y coherentes. Que
significa que los usuarios dominan su interfaz de usuario más rápido, lo que genera más
conversiones y mas dinero en función de las métricas que interesan a sus partes interesadas.
Sistemas de diseño Acelere el flujo de trabajo de su equipo. En lugar de reinventar la
rueda cada vez que llega una nueva solicitud, los equipos pueden reutilizar las piezas del
rompecabezas de la interfaz de usuario ya establecidas para implementar nuevas
páginas y funciones más rápido que nunca.
Centralizar los componentes de la interfaz de usuario en una biblioteca de
patrones establece un vocabulario compartido para todos en la organización,
y crea un flujo de trabajo más colaborativo en todas las disciplinas. Dado que
todos hablan el mismo idioma, se dedica más tiempo a realizar el trabajo y
menos tiempo a lidiar con reuniones y comunicaciones superfluas de ida y
vuelta.
Sistemas de diseño facilitar las pruebas de accesibilidad, rendimiento y entre
navegadores / dispositivos, acelerando enormemente el tiempo de producción y
permitiendo a los equipos lanzar trabajos de mayor calidad más rápidamente. Además,
integrar cosas como la accesibilidad en un sistema de diseño vivo escala esas mejores
prácticas, lo que permite que sus interfaces lleguen a más usuarios y, al mismo tiempo,
reducen el riesgo de que lo demanden.
Una vez que se establece un sistema de diseño (con la biblioteca de patrones que lo
acompaña), sirve como una base favorable al futuro para que la organización
modifique, modifique, amplíe y mejore con el tiempo. ¿Estás haciendo pruebas A / B?
Transfiera las lecciones de esas pruebas al sistema de diseño vivo. ¿Hizo algunas
optimizaciones de rendimiento importantes? ¡Insértelos en el sistema de diseño vivo!
El
viviendo parte de los sistemas de diseño vivo significa que siempre pueden
adaptarse para satisfacer las necesidades futuras de la organización, ahorrando
tiempo y dinero al mismo tiempo.
Enmarcar las cosas en términos de tiempo y dinero ayuda a las personas que
controlan los hilos del bolsillo a comprender por qué un sistema de diseño es una
búsqueda que vale la pena. Con suerte, estas conversaciones se traducirán en un
compromiso concreto de la organización (léase: asignar tiempo real y dinero) para
hacer realidad un sistema de diseño.
ɕ
ɕ
ɕ
ɕ

-- 94 of 178 --

98 DISEÑO ATÓMICO
Muestre, no cuente: el poder de los inventarios de interfaces
Si tan solo conseguir la aceptación fuera tan fácil como tener algunas conversaciones oportunas
con las personas adecuadas. Tal vez seas lo suficientemente inteligente como para sellar el trato
solo con los puntos de conversación, pero para nosotros, los simples mortales, las palabras no
son suficientes. A veces necesitas más. A veces necesitas hacerlos
siente el dolor.
Ingrese al inventario de la interfaz.
Muchos están familiarizados con el concepto de inventario de contenido . Las auditorías
de contenido generalmente se realizan en las primeras etapas del proceso de rediseño de
un sitio web para evaluar todo el contenido de un sitio. Es un proceso tedioso que
involucra hojas de cálculo y cafeína, pero todo ese trabajo duro vale la pena. Al final del
ejercicio, el contenido de la organización se coloca sobre la mesa, lo que brinda a los
equipos información valiosa sobre cómo manejar su contenido mientras abordan el
proyecto.
Un inventario de interfaz es similar a un inventario de contenido, solo que en
lugar de examinar y categorizar el contenido, está evaluando y
categorizando todos los componentes que conforman su interfaz de usuario.
Un inventario de interfaz es una colección completa de los bits y piezas
que componen su interfaz de usuario.
Aquí hay una colección de todos los estilos de botones únicos que se encuentran en la página de inicio de
United.com. Un inventario de interfaz redondea y categoriza todos los patrones únicos que componen una interfaz.

-- 95 of 178 --

---

## Sección 46: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 99

Realización de una auditoría de interfaz
¿Cómo se lleva a cabo una auditoría de interfaz? ¿Cómo reúne todos los
componentes que componen su interfaz de usuario? La respuesta simple es
capturas
de pantalla. ¡Muchos de ellos! La creación de un inventario de interfaces requiere
hacer capturas de pantalla y categorizar libremente todos los componentes
únicos que conforman sus interfaces de usuario. Si bien es un esfuerzo
relativamente sencillo, hay algunas consideraciones importantes a tener en
cuenta para que el inventario sea lo más útil posible. Repasemos el proceso para
crear un inventario de interfaz exitoso.
Paso 1: reúne a las tropas
Me he encontrado con muchos diseñadores y desarrolladores ambiciosos que se han
encargado de comenzar a documentar los patrones de interfaz de usuario de su
organización. Aunque ciertamente aplaudo esta ambición individual, Es absolutamente
esencial lograr que todos los miembros del equipo experimenten el dolor de una
IU inconsistente para que puedan comenzar a pensar de manera sistemática.
Para que el inventario de interfaces sea lo más eficaz posible,
representantes de todas las disciplinas responsables del éxito del sitio deben estar
juntos en una sala para el ejercicio. Reúna a las tropas: diseñadores de UX, diseñadores
visuales, desarrolladores front-end, desarrolladores back-end, redactores publicitarios,
estrategas de contenido, gerentes de proyectos, dueños de negocios, control de calidad
y cualquier otra parte interesada. ¡Cuantos más, mejor! Después de todo, uno de los
resultados más importantes de este ejercicio es establecer un vocabulario compartido
para todos en la organización, y eso requiere la participación de todo el equipo.
Paso 2: prepárate para la captura de pantalla
El ejercicio de inventario de la interfaz genera un montón de capturas de pantalla, por lo
que, naturalmente, necesitará un software para capturar y mostrar esas capturas de
pantalla. Algunas herramientas posibles incluyen:
ɕ PowerPoint o Keynote
ɕ Photoshop o Sketch
ɕ Evernote Web Clipper
ɕ Documentos de Google o Microsoft Word

-- 96 of 178 --

100 DISEÑO ATÓMICO
ɕ Presentaciones de Google (si está interesado, he creado una Presentaciones de Google
plantilla de inventario de interfaz )
En última instancia, realmente no importa qué herramienta use, pero todos deben ponerse de
acuerdo en una sola herramienta para que sea más fácil de combinar al final del ejercicio.
Descubrí que el software de creación de diapositivas en línea como Google Slides es muy
efectivo, ya que proporciona un lienzo para el posicionamiento de imágenes de forma libre,
están divididos en diapositivas para una categorización más fácil y están basados en la web, por
lo que se pueden compartir. con facilidad.
Paso 3: ejercicio de captura de pantalla
¡Prepara tus dedos para hacer capturas de pantalla porque es hora del evento principal! El
ejercicio de auditoría de la interfaz implica la captura de pantalla y la categorización
de todos los patrones únicos de IU que conforman su experiencia. Tenga en cuenta
que este ejercicio no significa capturar
cada instancia de un patrón de IU en particular,
sino que captura
una instancia de cada patrón de interfaz de usuario único.
Asigne a cada participante una categoría de interfaz de usuario. Es posible que deba
emparejar personas o hacer que los participantes documenten varias categorías,
según la cantidad de personas que participen en el ejercicio. Una vez más, es útil tener
la mayor cantidad de participantes posible, ya que la captura de pantalla de más
personas dará como resultado una documentación más completa.
Es importante que todos los participantes capturen capturas de pantalla con el mismo software para poder
combinarlas más tarde. Creé una plantilla de inventario de la interfaz de Presentaciones de Google para que
los equipos la utilicen como punto de partida.

-- 97 of 178 --

---

## Sección 47: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 101

Que patrones capturar
¿Qué categorías de elementos de la interfaz deben capturarse? Obviamente,
las categorías variarán de una interfaz a otra, pero aquí hay algunas
categorías para comenzar:
ɕ Elementos globales: componentes como encabezados, pies de página y otros
elementos globales que se comparten a lo largo de toda la experiencia.
Navegación: navegación principal, navegación de pie de página, paginación,
rutas de navegación, controles de componentes interactivos y, básicamente,
cualquier cosa que se utilice para navegar por una interfaz de usuario.
Tipos de imágenes: logotipos, imágenes de héroes, avatares, miniaturas, fondos y
cualquier otro tipo de patrón de imagen que aparezca en la interfaz de usuario.
Iconos: Los iconos son un tipo especial de imagen digno de su propia
categoría. Capture lupas, íconos sociales, flechas, hamburguesas,
hilanderos, favicons y cualquier otro ícono de la interfaz.
Formularios: entradas, áreas de texto, seleccionar menús, casillas de verificación, interruptores, botones
de radio, controles deslizantes y otras formas de entrada del usuario.
Botones: Los botones son el elemento de la interfaz de usuario por excelencia. Capture
todos los patrones de botones únicos que se encuentran a lo largo de la experiencia:
botones primarios, secundarios, grandes, pequeños, desactivados, activos, de carga e
incluso que parecen enlaces de texto.
Encabezados: h1, h2, h3, h4, h5, h6 y variaciones de encabezados
tipográficos.
Bloques: también conocidos como promocionales, textos destacados, resúmenes,
anuncios o unidades de héroe,
bloques son colecciones de encabezados tipográficos y /
o imágenes y / o texto de resumen (ver el artículo de Nicole Sullivan sobre el
objeto
multimedia como ejemplo de bloque).
Liza: desordenados, ordenados, de definición, con viñetas, numerados, rayados,
rayados o cualquier grupo de elementos presentados en un formato de tipo lista.
Componentes interactivos: acordeones, pestañas, carruseles y otros
módulos funcionales con partes móviles.
Medios de comunicación: reproductores de video, reproductores de audio y otros elementos
multimedia enriquecidos.
Componentes de terceros: widgets, iframes, tickers de acciones, botones
sociales, scripts de seguimiento invisibles y cualquier otra cosa que no esté
alojada en su dominio.
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ

-- 98 of 178 --

102 DISEÑO ATÓMICO
ɕ
ɕ
Publicidad: todos los formatos y dimensiones de anuncios.
Mensajería: alertas, éxito, errores, advertencias, validación, cargadores, ventanas
emergentes, información sobre herramientas, etc. Esta puede ser una categoría difícil de
capturar, ya que la mensajería a menudo requiere la acción del usuario para exponerla.
Colores: captura todos los colores únicos presentados en la interfaz. Esta categoría
puede ser ayudada por fantásticas herramientas de arranque de guías de estilo
como Estadísticas CSS y Estilízame .
Animación: La animación es un aspecto elemental de las interfaces de usuario y,
por lo tanto, debe documentarse. Esto requiere el uso de un software de grabación
de pantalla, como QuickTime, para capturar cualquier elemento de la interfaz de
usuario que se mueva, se desvanezca, se mueva, se mueva o se mueva por la
pantalla.
ɕ
ɕ
Nuevamente, estas categorías no están escritas en piedra y variarán según la
naturaleza de la interfaz de usuario con la que esté tratando. Por supuesto, es
importante agregar, restar o modificar estas categorías para que se adapten mejor a
las necesidades de su organización.
Un ejemplo de patrones de botones únicos capturados en un inventario de interfaz para el sitio web de un banco importante.

-- 99 of 178 --

---

## Sección 48: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 103

Tiempo lo es todo
Es importante establecer límites de tiempo en el ejercicio de captura de pantalla
para evitar caer en una madriguera de conejo que termina durando todo el día. La
cantidad de tiempo que asigne variará según la cantidad de personas que
participen, pero encuentro entre 30 y 90 minutos sea suficiente para una primera
pasada de un inventario de interfaz. ¡Pon un temporizador, ponte Jeopardy! música
(bueno, tal vez no música Jeopardy !, sino alguna otra música que crea un estado de
ánimo optimista para el ejercicio), y haga que los participantes se concentren en
hacer capturas de pantalla de los patrones únicos de IU que encuentran.
Cavar profundo
¿Qué partes del sitio deben capturar los participantes en el inventario de
interfaces? Respuesta corta:
todo. Debe documentarse cualquier parte de la
IU que su organización gestione o pueda gestionar.
Un ejemplo de varios elementos de formulario capturados en un inventario de interfaz para el sitio web de un banco importante.

-- 100 of 178 --

104 DISEÑO ATÓMICO
Esto es difícil ya que las organizaciones tienden a favorecer ciertas partes de la
experiencia (
tos página principal
tos) sobre otros. Por ejemplo, las personas que
trabajan en un sitio web de comercio electrónico tienden a centrarse en la experiencia
de compra principal, aunque áreas como la atención al cliente, las preguntas frecuentes,
las tablas de tamaño, las páginas 404 y los términos legales también son
extremadamente importantes para la experiencia del usuario. Recuerde, los usuarios
perciben su marca como una entidad singular y no se preocupan por su estructura
organizacional, tecnología o cualquier otra cosa que pueda causar disparidades en la
interfaz de usuario. Anime a los participantes de la auditoría de interfaz a ser lo más
minuciosos posible durante el ejercicio.
Paso 4: Presentar los hallazgos
El ejercicio de captura de pantalla puede ser un poco abrumador, así que asegúrese de
que el equipo se tome un descanso después de completar el ejercicio. Consiga algo de
comida, tome un café y estire las piernas un poco. Una vez que todos se sientan
renovados, es hora de hablar sobre lo que capturó.
Haga que cada participante dedique cinco o diez minutos a presentar cada
categoría de IU al grupo. Aquí es donde comienza la diversión. Presentar al
grupo le permite al equipo discutir el fundamento detrás de los patrones de IU
existentes, inicia una conversación sobre las convenciones de nomenclatura y
hace que el equipo se entusiasme por establecer una interfaz más consistente.
Nombrar cosas es difícil. Es fascinante escuchar los nombres inconsistentes que los
diseñadores, desarrolladores, propietarios de productos y otras partes interesadas tienen
para el mismo patrón de interfaz de usuario. "Oh, a eso lo llamamos la barra de servicios".
"Oh, lo llamamos el navegador de administración". "¡Oh, lo llamamos el área de acción
flotante!" Este ejercicio es una oportunidad para descubrir y eliminar las disparidades entre
las etiquetas de patrones, y también para establecer nombres para patrones que antes no
estaban etiquetados. No sienta que necesita llegar a un consenso sobre los nombres finales
de los patrones en el transcurso de diez minutos; este ejercicio simplemente pretende abrir
una discusión más amplia.
Una vez que se ha presentado y discutido cada categoría, todos los
participantes deben enviar sus diapositivas al líder del ejercicio. El líder
luego combinará todo en un superdocumento gigante, que pronto se
convertirá en una bola de demolición de verdad y justicia.

-- 101 of 178 --

---

## Sección 49: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 105

Paso 5: reagruparse y establecer los próximos pasos
Con el überdocumento en la mano, es hora de que toda la organización
participe en la elaboración de un sistema de diseño de interfaz.
¿Alguna vez has querido ver llorar a un CEO? ¡Dejar al descubierto todas las inconsistencias
de su interfaz de usuario es una excelente manera de hacer que eso suceda! Uno de los
beneficios más poderosos de los inventarios de interfaces es que puede mostrárselos a
cualquier persona, incluidos los no diseñadores y desarrolladores, y ellos
comprenderán por qué las IU inconsistentes son problemáticas.
No es necesario ser diseñador para reconocer que tener 37 estilos de botones
únicos probablemente no sea una buena idea. Esta es tu oportunidad
para dejar muy claro a las partes interesadas que abordar su interfaz de usuario de
una manera más sistemática tiene mucho sentido tanto para sus usuarios como para
su organización.
Además de vender la idea a las partes interesadas clave, Todo el arduo trabajo
y la discusión que se incluyó en el ejercicio de inventario de interfaz inicial
debe traducirse en las semillas de su futuro sistema de diseño y biblioteca
de patrones.
Es muy probable que el ejercicio inicial no haya capturado todos los patrones de IU
únicos, por lo que es posible que deba realizar otro ejercicio de auditoría de interfaz
para capturar una imagen más completa de sus patrones de IU. Esto puede
involucrar a un grupo grande nuevamente, pero en realidad un equipo
interdisciplinario más pequeño revisará el überdocumento y establecerá los próximos
pasos para el sistema de diseño.
Una vez que se han llenado los vacíos en el inventario de interfaces, el grupo de
trabajo puede tener algunas conversaciones importantes sobre los próximos pasos
para el proyecto del sistema de diseño. Algunas preguntas clave que debe cubrir este
grupo incluyen:
ɕ Qué patrones deben permanecer, cuáles deben desaparecer y cuáles pueden ser
fusionados?
¿Qué nombres de patrones deberíamos elegir?
¿Cuáles son los siguientes pasos para traducir el inventario de interfaces en una
biblioteca de patrones vivos?
ɕ
ɕ

-- 102 of 178 --

106 DISEÑO ATÓMICO
Beneficios de un inventario de interfaz
Crear un inventario de interfaz puede ser una tarea ardua, pero los
beneficios de hacer uno son muchos:
ɕ Captura todos los patrones y sus inconsistencias: una interfaz
el inventario redondea todos los patrones únicos que componen su interfaz de
usuario. Ver todos esos patrones similares, pero aún diferentes, uno al lado del
otro expone la redundancia y subraya la necesidad de crear una experiencia
coherente y cohesiva.
Obtiene aceptación organizacional: La participación de un grupo grande y
diverso de disciplinas en el ejercicio ayuda a que todos comprendan el valor de
crear y mantener una interfaz de usuario coherente. Además, el überdocumento
del inventario de interfaces puede ser una herramienta tremendamente poderosa
para convencer a las partes interesadas, jefes y clientes de que inviertan en un
sistema de diseño de interfaces.
Establece un alcance de trabajo: un inventario de interfaz ayuda a los equipos de
diseño a determinar el nivel de esfuerzo necesario para diseñar y construir cada
patrón de interfaz de usuario como parte de un proyecto de diseño o rediseño. ¿Qué
componentes serán relativamente fáciles o difíciles de convertir en un entorno
receptivo? ¿Cuáles son las consideraciones de contenido, diseño y desarrollo de cada
componente? Un inventario de interfaz permite a los equipos tener conversaciones
importantes que ayudan a establecer el alcance y el cronograma realistas de un
proyecto.
Sienta las bases para un sistema de diseño de interfaz de sonido: el
inventario de la interfaz es un primer paso importante para configurar una
biblioteca de patrones completa. Es esencial capturar todos los patrones de IU
existentes para determinar qué patrones harán el corte final en el sistema de
diseño vivo. El ejercicio de auditoría de la interfaz también ayuda a los equipos a
establecer un vocabulario compartido, que será crucial para el éxito del
eventual sistema de diseño.
ɕ
ɕ
ɕ
Pide perdón, no permiso
Entonces, ha discutido los beneficios de establecer un sistema de diseño vivo con
sus partes interesadas, e incluso ha creado un inventario de interfaz para
mostrarles el choque de trenes inconsistente que es la interfaz de usuario actual. Y
sin embargo, a pesar de todos tus esfuerzos, siguen derribando

-- 103 of 178 --

---

## Sección 50: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 107

buena idea de establecer un sistema de diseño de interfaces y una biblioteca de
patrones. ¿Qué debe hacer un equipo web responsable?
Hazlo de todos modos.
De la misma forma en que incorporamos cosas como rendimiento, accesibilidad y capacidad de
respuesta en nuestros productos y procesos de forma predeterminada, también deberíamos
crear sistemas de diseño de forma predeterminada. No necesita obtener la aprobación del
cliente para seguir las mejores prácticas de su oficio. Cuando les da a las partes interesadas la
opción de decir no a algo, lo harán. Así que simplemente no les des esa oportunidad. Nuestro
trabajo es crear un gran trabajo para nuestros clientes y organizaciones, y los sistemas
de diseño de interfaces son un medio para ese fin.
De hecho, para crear el todo, necesitas crear las partes de ese todo. Nuestras
interfaces consisten en piezas más pequeñas, ya sea que le prestes atención
o no a esas piezas más pequeñas.
Tiene que tomar una decisión: concéntrese únicamente en crear el todo mientras
ignora las partes, o dedique algún tiempo a organizar las partes para ayudarlo a
crear el todo de manera más eficiente. En su libro
Diseño UX multipantalla , Wolfram
Nagel articula maravillosamente estos enfoques utilizando ladrillos Lego como
analogía.
Una forma de abordar un proyecto de Lego es simplemente colocar las
piezas de la caja en una mesa, arremangarse y luego comenzar a construir
su creación.
Una forma de abordar un proyecto de Lego es simplemente arrojar las piezas sobre una mesa y rebuscar en la
pila para encontrar las piezas que necesita. Imagen adaptada de "Multiscreen UX Design" de Wolfram Nagel.

-- 104 of 178 --

108 DISEÑO ATÓMICO
Este enfoque de un proyecto de Lego es sin duda una estrategia viable,
incluso si es sin disculpas al azar. La única vez que prestas atención a la pila
de ladrillos es cuando la estás examinando para encontrar la pieza
específica que necesitas.
Esto no es diferente a la cantidad de proyectos digitales que se abordan. El cliente
necesita un sitio web, así que nos lanzamos a diseñarlo y construirlo. El cliente necesita
una aplicación móvil, por lo que inmediatamente comenzamos a construir las pantallas de
la aplicación. Nuestra mirada permanece paralizada en el producto final, y rara vez, si
acaso, miramos los patrones subyacentes que componen nuestras interfaces de usuario
finales.
Por supuesto, hay otra forma de abordar sus proyectos digitales y de Lego.
En lugar de sumergirse de lleno en la construcción del trabajo final, puede
tomarse el tiempo para hacer un inventario de las piezas disponibles y
organizarlas de tal manera que se vuelvan más útiles.
Sin duda, organizar requiere tiempo, planificación y esfuerzo. No es gratis. El
hecho de que esta configuración no esté representada de manera visible en el
producto final puede tentarnos a decir que sirve como una distracción para el
trabajo real que debe realizarse. ¿Por qué molestarse?
Al tomarse el tiempo para organizar las partes, ahora puede crear el
todo de una manera más realista, deliberada y eficiente.
La creación de una biblioteca de sus materiales disponibles le permite
abordar el proyecto de una manera más metódica y ahorra una inmensa
cantidad de tiempo en el proceso. En lugar de hurgar en un azar
Tomarse el tiempo para organizar las piezas que componen sus creaciones finales le permite abordar la
obra de una manera más pausada y eficiente. Imagen adaptada de "Multiscreen UX Design" de
Wolfram Nagel.

-- 105 of 178 --

---

## Sección 51: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 109

pila de ladrillos y tiempo de combustión reinventando patrones, puede
crear un sistema organizado de componentes que le ayudarán a producir
un mejor trabajo en menos tiempo.
En lo que respecta a sus clientes y partes interesadas, el producto final aún
se está produciendo. Siempre que muestre un progreso en el trabajo final,
puede decidir qué parte de su proceso interno está dispuesto a exponer. El
hecho de que esté creando un sistema de diseño para producir el producto
final realmente no les preocupa; es simplemente una decisión que está
tomando su equipo para crear un mejor trabajo.
Si está tratando con partes interesadas con aversión al cambio, le digo que haga
lo que tenga que hacer y les diga que no presten atención a lo que está
sucediendo entre bastidores. Una vez que haya lanzado con éxito el proyecto y se
haya servido el champán, puede abrir el telón y decir: “Ah, por cierto, establecimos
un sistema de diseño y una biblioteca de patrones para que el equipo pudiera
colaborar y trabajar juntos de manera más eficiente. " Sería extremadamente
difícil para ellos argumentar en su contra ahora, especialmente si el proyecto llegó
a tiempo y dentro del presupuesto. Si tiene mucha suerte, puede convertir el éxito
del proyecto inicial en una iniciativa más oficial dentro de la organización para
hacer evolucionar su sistema de diseño.
Tomarse el tiempo para organizar las piezas que componen sus creaciones finales le permite trabajar de
una manera más pausada y eficiente. En lugar de tamizar un montón de ladrillos al azar, un inventario
organizado de componentes puede producir un trabajo mejor y más rápido. Imagen adaptada de
"Multiscreen UX Design" de Wolfram Nagel.

-- 106 of 178 --

110 DISEÑO ATÓMICO
Por supuesto, es preferible que sus clientes, colegas y partes interesadas se
entusiasmen con la creación de un sistema de diseño de interfaz, o
por lo menos obtenga su bendición para llevar a cabo el proyecto de forma
modular. Pero creo que es importante encontrar formas de seguir las mejores
prácticas de su oficio, incluso cuando se enfrenta a una resistencia organizativa
extrema.
(Re) establecer expectativas
Ha trabajado mucho para vender el concepto de un sistema de diseño, pero aún
necesita establecer las expectativas de las partes interesadas y del equipo antes
de arremangarse y ponerse a trabajar.
Cuando digo "establecer expectativas", en realidad estoy diciendo "
re establecer expectativas ".
Verá, todos aportamos nuestras propias experiencias, opiniones y prejuicios.
a un proyecto. Nuestra industria es todavía increíblemente joven, por lo que
muchas personas que trabajan en proyectos web provienen de otras industrias
con sus propias formas de hacer las cosas ™ establecidas. Incluso las personas
que han trabajado exclusivamente en el mundo digital han sentido el bagaje de
las industrias del pasado. Además, los principios rectores, las mejores prácticas y
las tácticas del diseño digital aún están muy codificados.
Es ridículo que alguien pronuncie la frase: “Así es como siempre
hemos hecho las cosas” en una industria que solo tiene 25 años.
Desafortunadamente, los humanos somos criaturas de hábitos, y salir del
cálido abrazo de la familiaridad es incómodo. No nos gusta sentirnos
incómodos. Debemos superar nuestras predisposiciones existentes si vamos
a adoptar las mejores prácticas de nuestra industria en constante cambio y
crear un trabajo digital exitoso.
Redefiniendo el diseño
Hemos recorrido un largo camino desde simplemente trasplantar archivos PDF impresos a la
World Wide Web, pero el diseño de impresión todavía proyecta una larga sombra y
continúa influyendo en cómo se hacen las cosas en línea.
El diseño en el mundo de la impresión se centra principalmente en la estética visual.
Después de todo, no se puede hacer mucho más con un póster que solo mirarlo. Para ser
claros, ciertamente no estoy insinuando que el diseño de impresión sea fácil o
unidimensional; el mundo de la impresión está impregnado de matices y artesanía. Lo
que estoy diciendo es que la naturaleza bidireccional e interactiva de la web agrega
muchas más dimensiones a lo que constituye un buen diseño. Velocidad,

-- 107 of 178 --

---

## Sección 52: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 111

El tamaño de la pantalla, el entorno, las capacidades tecnológicas, el factor de forma,
la ergonomía, la usabilidad, la accesibilidad, el contexto y las preferencias del usuario
deben tenerse en cuenta si queremos crear un gran trabajo para este nuevo y
valiente mundo digital.
Estas consideraciones de diseño adicionales son vitales para crear un gran trabajo
digital, pero con demasiada frecuencia están ausentes de nuestros procesos y flujos
de trabajo. El diseñador Dan Mall explica:
Como industria, vendemos sitios web como pinturas. En cambio, deberíamos
vender un acceso hermoso y fácil al contenido, independientemente del dispositivo,
el tamaño de la pantalla o el contexto.
- Dan Mall
¿Cómo llegamos al punto en que vendemos y diseñamos sitios web como si fueran
imágenes estáticas? Durante los años de formación de la web, creamos experiencias
destinadas a ser consumidas únicamente por computadoras de escritorio, lo cual es
comprensible ya que las computadoras de escritorio eran realmente el único juego en la
ciudad. El espacio proporcionado por las pantallas de escritorio hizo que la idea de
simplemente traducir un PDF a la web fuera factible y atractiva. Así que eso es lo que
hicimos, ¡y durante un tiempo realmente funcionó!
Érase una vez, la web se consumía principalmente en las pantallas de escritorio, de ahí esta vieja máquina de
aspecto crujiente.

-- 108 of 178 --

112 DISEÑO ATÓMICO
Sin embargo, esto no vino sin consecuencias. Esta perspectiva de impresión de
la web reforzó la noción de que los diseños web, al igual que sus contrapartes
fuera de línea, podrían y deberían verse iguales en todos los entornos. También
mantuvo el enfoque en cómo un diseño web
mirado
en lugar de cómo
trabajó, ignorando todas las características únicas de este
nuevo y rico medio. Además, fortaleció la creencia de que podíamos aplicar los
mismos procesos lineales utilizados para crear trabajos impresos a nuestro
trabajo digital.
El tiempo pasó, por supuesto, y los dispositivos móviles explotaron, la tecnología mejoró y la
web se convirtió en el panorama increíblemente grande y diverso que conocemos hoy. Atrás
quedaron los días de antaño que solo eran de escritorio, y en su lugar están los teléfonos
inteligentes, los teléfonos tontos, las tabletas, los phablets, los netbooks, los portátiles, los
lectores electrónicos, los dispositivos portátiles, los televisores, las consolas de juegos, los
tableros de los automóviles y mucho más.
La diversidad del panorama web actual ha destrozado la alucinación consensual de
la web de escritorio, donde simplemente podríamos atornillar las mentalidades y
los procesos de impresión a este nuevo medio. Simplemente
Esta es la web: un popurrí de dispositivos, tamaños de pantalla, capacidades, factores de forma, velocidades
de red, tipos de entrada y más.

-- 109 of 178 --

---

## Sección 53: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 113

Mirar un teléfono inteligente, una tableta y una computadora de escritorio uno
al lado del otro erosiona rápidamente la suposición de que un diseño web
debe verse igual en todos los entornos.
Todavía estamos en el comienzo del Big Bang de los dispositivos
conectados. El panorama de dispositivos y web del mañana, sin duda,
será aún más grande y diverso que el de hoy. Además de los dispositivos
actuales y las tecnologías incipientes que ya están en el horizonte, la web
del futuro incluirá tecnologías e ideas que aún no se han concebido.
Descubrí que las tres imágenes anteriores son una forma abreviada de
tremendamente útil para ayudar a los clientes, colegas y partes interesadas
a comprender la realidad del panorama web. Con esta nueva comprensión,
todos se vuelven mucho más receptivos a la actualización de sus procesos y flujos
de trabajo para crear un gran trabajo para este medio único.
Nuestro trabajo es crear grandes experiencias para las personas que utilizan una diversidad de
dispositivos, tamaños de pantalla, velocidades de red, capacidades de dispositivos,
Además de todos los dispositivos con capacidad web que nos interesan hoy en día, debemos entender que el
panorama de dispositivos y web es cada vez más grande y más diverso todo el tiempo.

-- 110 of 178 --

114 DISEÑO ATÓMICO
características del navegador, tipos de entrada, factores de forma, contextos
y preferencias. Sin duda, es una tarea hercúlea, pero todas estas variables
realmente subrayan la necesidad de ir mucho más allá de la estética visual al
crear sistemas de diseño de interfaces.
Además de crear experiencias visualmente hermosas y consistentes,
debemos:
ɕ Adopte la ubicuidad de la web creando accesibles, resilientes
sistemas de diseño. Reconozca que una gran cantidad de personas con un amplio
espectro de capacidades accederán a nuestras experiencias, así que construya
sistemas de diseño para que sean lo más inclusivos posible.
Cree diseños y componentes flexibles para que nuestras interfaces se vean y funcionen
maravillosamente independientemente de la dimensión de cualquier dispositivo o tamaño de
pantalla en particular.
Trate el rendimiento como un principio de diseño esencial y cree
experiencias de carga rápida que respeten a los usuarios y su tiempo.
Mejorar progresivamente nuestras interfaces estableciendo experiencias
centrales y luego superponiendo mejoras para aprovechar las capacidades
únicas de los dispositivos y navegadores modernos.
Cree sistemas de diseño amigables con el futuro destinado a resistir la
prueba del tiempo y anticipar cambios inevitables en el dispositivo y el
panorama web.
Por supuesto, hay muchas otras consideraciones de diseño que deben incluirse
en nuestros sistemas de diseño de interfaz (ergonomía, tipo de entrada,
cumplimiento de la Sección 508, legibilidad, etc.), pero la conclusión clave aquí
es ampliar la definición de lo que constituye una buena tecnología digital.
diseño más allá de la estética visual.
Como es de esperar, es necesario que se produzcan cambios sustanciales en nuestros
procesos para que podamos abordar adecuadamente todas estas consideraciones de
diseño exclusivamente digital. Por lo tanto, es nuestra responsabilidad establecer las
expectativas de los clientes, colegas y partes interesadas para que todos sepan que el
proceso de creación será diferente esta vez.
ɕ
ɕ
ɕ
ɕ
Muerte a la cascada
Dime si has escuchado esto antes. Un equipo tiene la tarea de crear un sitio web. Una vez que
se ha asentado el polvo de la reunión inicial, una experiencia de usuario

-- 111 of 178 --

---

## Sección 54: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 115

El diseñador se va, baja la cabeza y, finalmente, emerge con un documento PDF
gigante que detalla toda la experiencia. Este documento de estructura metálica
monolítica se transmite a las partes interesadas del proyecto, que lo firman
después de recibir algunos comentarios y sugerencias.
Luego, el diseñador de UX pasa los wireframes al diseñador visual, quien salta a
Photoshop o Sketch para aplicar color, tipografía y textura a los wireframes
estructurados pero estériles. En la reunión de revisión del diseño, las partes
interesadas se sientan ansiosas mientras el proyector se enciende y el gerente del
proyecto sale corriendo para imprimir copias de la plataforma de diseño para
todos. El director de arte toma su posición al frente de la sala y presenta el
diseño. ¡He aquí un diseño de sitio web! Una vez finalizada la presentación, la sala
se llena rápidamente de comentarios y conversaciones. Después de que las
reacciones iniciales y los cumplidos se apagan, una parte interesada clave habla.
“Esto se ve fantástico, y creo que realmente da en el blanco de lo que
estamos tratando de lograr con este proyecto.
Pero… "
Expresan su deseo de ver algo tal vez con un diseño alternativo, algo que
capture una cierta vibra, tal vez algo que use una fotografía diferente,
algo que simplemente ...
estallidos.
Con las compuertas abiertas, las otras partes interesadas de repente se dan
cuenta de que también tienen opiniones y críticas constructivas que les
gustaría compartir. Para cuando la reunión llega a su fin, todos se han
desviado de su lista de deseos de lo que les gustaría lograr con el diseño.
Ligeramente desinflado pero decidido a clavarlo, el diseñador visual vuelve a sus
herramientas para trabajar en las sugerencias de las partes interesadas. En la
próxima reunión de revisión de diseño, la misma escena se repite, con las partes
interesadas expresando a partes iguales su aliento y anhelo de más. “Siento que
casi estamos allí. ¿Podríamos simplemente ... "
Pasan las semanas y cambian las estaciones. Los nervios se agotan y la fecha
límite se cierne sobre la cabeza de todos. Es con un sentido de urgencia que
homepage_v9_final_for-review_FINAL_bradEdits_for-handoff.psd
finalmente obtiene la aprobación de las partes interesadas.
El diseñador visual, aliviado de que finalmente hayan completado su trabajo,
avanza de puntillas hasta la entrada de Code Cave. Deslizan el diseño
aprobado debajo de la puerta, y mientras se alejan

-- 112 of 178 --

116 DISEÑO ATÓMICO
gritar: “¿Puedes hacer esto en tres semanas? ¡Ya estamos retrasados y
nos quedamos sin presupuesto! "
El diseñador visual ya ha desaparecido en la noche cuando el desarrollador
de front-end recoge el diseño del suelo. Con una mirada a la composición, un
sentimiento extraño, una combinación de desconcierto, rabia y pavor, se
apodera de ellos. ¿Qué hay de malo en el diseño, exactamente? Tal vez sean
los siete tipos de letra y nueve estilos de botones únicos salpicados a lo largo
de las composiciones. Tal vez sea el diseño centrado en el escritorio,
imposible de ejecutar. Tal vez sea el contenido generado por el usuario
perfecto pero improbable.
El desarrollador de front-end intenta en vano plantear sus preocupaciones al
grupo más amplio, pero rápidamente se le descarta por ser inepto o cascarrabias.
Por desgracia, es demasiado tarde en el juego para realizar cambios significativos
en el diseño, especialmente porque ya ha sido aprobado por las partes
interesadas.
Entonces, el desarrollador hace todo lo posible para hacer limonada con las
composiciones estáticas de limón. Hacen todo lo posible para crear diseños
receptivos que aún conservan la integridad de las composiciones estáticas,
normalizan algunas de las inconsistencias de componentes más flagrantes,
establecen estados de patrón (como botón de desplazamiento, estado activo y
deshabilitado) que no se articularon en los diseños, y tomar algunas decisiones
sobre la marcha con respecto a los aspectos interactivos de la experiencia. Las
discusiones con los diseñadores son tensas, pero todos se dan cuenta de que
deben resolver estos problemas para realizar el proyecto.
Después de conectar el código de front-end en un CMS, finalizar frenéticamente el
contenido del sitio y hacer algunas pruebas de control de calidad de último minuto,
el equipo finalmente lanza el sitio. Si bien nadie lo dice en voz alta, hay un tinte de
decepción en el aire junto con la alegría y el alivio de sacar el proyecto por la
puerta. Después de todo, el sitio en vivo carece del brillo brillante que las
composiciones prometieron a las partes interesadas, y la fricción entre disciplinas
ha dañado algunas relaciones.
Espero que esta historia le parezca una obra de ficción, pero según mis propias
experiencias y conversaciones con muchos otros, supongo que ha experimentado
esta historia de infortunios en un momento u otro. Incluso puede llegar a casa
como un puñetazo en el estómago. Ya sea que haya soportado este proceso de
primera mano o no, es importante reconocer que el estilo Henry Ford proceso de
cascada cada vez es menos probable que resulte en un gran trabajo digital.

-- 113 of 178 --

---

## Sección 55: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 117

El proceso en cascada puede tener sentido para la impresión, la arquitectura,
la fabricación y otros medios físicos, ya que los errores y los cambios son
extraordinariamente costosos. Si un equipo pasa por alto un error cometido al
principio del proceso, lo pagará caro más tarde. Sin emabargo,
el mundo digital no está limitado por las mismas limitaciones que el físico.
Los píxeles son baratos. Los cambios pueden ocurrir en un instante, las
hipótesis se pueden probar rápidamente y los diseños y el código se pueden
repetir una y otra vez.
El proceso en cascada se basa en la premisa de que el trabajo debe fluir en un orden
secuencial: el trabajo del diseñador de UX debe completarse antes de que pueda
comenzar el diseño visual; el diseñador visual debe terminar su trabajo antes de que
pueda comenzar el desarrollo de front-end. Esto simplemente no es cierto. Hay mucho
trabajo que puede y debe ocurrir en paralelo. Para crear sistemas de diseño de interfaz
de usuario sólidos, debemos restablecer las expectativas de nuestras partes
interesadas y hacer que se sientan cómodos con un proceso más borroso y
colaborativo.
Que el trabajo suceda en paralelo no implica que todos vayan a disparar armas
durante todo el proceso. Por supuesto, la mayor parte de la investigación, la
arquitectura de la información y otros aspectos elementales del diseño de UX
tenderán a ocurrir más temprano en el proceso, pero ese trabajo no debería
retrasar a las otras disciplinas para que comiencen a trabajar. E incluso cuando
la mayor parte de la
activo el trabajo está hecho, nunca deben simplemente
desvanecerse del proyecto. Es crucial para
El proceso en cascada, en el que las disciplinas se transmiten el trabajo entre sí en orden secuencial, no es
probable que dé como resultado un gran trabajo digital.

-- 114 of 178 --

118 DISEÑO ATÓMICO
cada disciplina para continuar consultando con los demás para asegurarse de
que su visión se convierta en el producto final. Entonces, en lugar de un proceso
en cascada rígido y secuencial, un proceso más colaborativo a lo largo del tiempo
se ve así:
El desarrollo es diseño
Cuando un empleador anterior descubrió que escribía HTML, CSS y
JavaScript de presentación, me trasladaron a sentarme con los ingenieros y
los desarrolladores de back-end. Al poco tiempo me preguntaban: “Hola,
Brad. ¿Cuánto tiempo llevará construir ese middleware? " y "¿Puede
normalizar esta base de datos muy rápido?"
Aquí está la cuestión: nunca he tenido una clase de informática en mi vida, y
pasé mi carrera en la escuela secundaria pasando el rato en la sala de arte. Baste
decir que esas solicitudes me hicieron sentir extremadamente incómodo.
Existe un malentendido fundamental de que toda la codificación es programación
ultrageeky, que simplemente no es el caso. HTML no es un lenguaje de programación. CSS
no es un lenguaje de programación. Pero debido a que HTML y CSS siguen siendo código,
el desarrollo de front-end es
Un flujo de trabajo más colaborativo implica un equipo multidisciplinario que trabaja en conjunto durante todo
el proceso. Si bien el trabajo activo aumentará y disminuirá, cada disciplina continúa consultando con los otros
miembros del equipo para asegurarse de que sus conocimientos estén presentes en el trabajo final.

-- 115 of 178 --

---

## Sección 56: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 119

a menudo se colocan en el mismo contenedor que Python, Java, PHP, Ruby, C ++ y
otros lenguajes de programación. Este malentendido tiende a provocar una grave
crisis de identidad en muchos desarrolladores front-end, incluido yo mismo.
Desde el punto de vista organizativo, a menudo existe una enorme división entre
diseñadores y desarrolladores (o marketing y TI, o creatividad e ingeniería, o
algunas otras etiquetas divisivas). Los diseñadores y desarrolladores a menudo se
sientan en diferentes pisos, en diferentes edificios en conjunto, en diferentes
ciudades y, a veces, incluso en diferentes países de diferentes continentes. Si bien
parte de esta separación organizativa puede estar justificada,
crear una división entre diseñadores y desarrolladores front-end es una idea
absolutamente terrible.
El hecho es que HTML, CSS y JavaScript de presentación crean interfaces de
usuario, sí, las mismas interfaces de usuario que esos diseñadores están
elaborando meticulosamente en herramientas como Photoshop y Sketch. Para
que los equipos creen juntos sistemas de diseño de interfaces de usuario
exitosos, es crucial tratar desarrollo de front-end como parte central del
proceso de diseño.
Cuando les muestra a las partes interesadas solo imágenes estáticas de sitios
web, naturalmente solo pueden comentar y aprobar imágenes de sitios web. Esta establece
las expectativas equivocadas . Pero por introducir el diseño en el navegador lo
más rápido posible, usted confronta a las partes interesadas con las realidades
del medio final mucho antes en el proceso. Trabajar en HTML, CSS y JavaScript de
presentación permite a los equipos no solo crear diseños estéticamente
hermosos, sino que también demuestra esas consideraciones de diseño
exclusivamente digitales como:
ɕ flexibilidad
ɕ impacto de la red
ɕ Interacción
ɕ movimiento
ɕ ergonomía
ɕ reproducción de color y texto
ɕ densidad de pixeles

-- 116 of 178 --

120 DISEÑO ATÓMICO
ɕ rendimiento de desplazamiento
ɕ peculiaridades del dispositivo y del navegador
ɕ Preferencias del usuario
Fundamentalmente, saltar al navegador más rápido también pone en marcha la
creación de los patrones que conformarán el sistema de diseño vivo y dinámico.
Más sobre esto en un momento.
Esto no quiere decir que los equipos deban diseñar
enteramente en el navegador.
Como con todo, se trata de utilizar las herramientas adecuadas en el momento
adecuado para articular las cosas correctas. Tener el diseño representado en el
navegador
además de Otros artefactos de diseño brindan a los equipos la capacidad de
pintar una imagen más rica y realista de la interfaz de usuario que están creando. Los
equipos pueden demostrar una idea de diseño enfocada estéticamente como una
imagen estática y, simultáneamente, demostrar un prototipo funcional de esa misma
idea en el navegador.
Un proceso iterativo iterativo iterativo iterativo
Creo que un proceso de diseño digital exitoso es bastante similar a la
escultura de piedra sustractiva. Al comienzo del proceso de escultura, el
artista y su patrocinador tienen una idea general de lo que se está creando,
pero esa visión no se realizará por completo hasta que la escultura esté
completa.
El escultor comienza con una losa gigante de roca y comienza a descascarar.
Una forma tosca comienza a formarse después de la primera pasada, y la
forma se vuelve más pronunciada con cada pasada subsiguiente. Después
de algunas rondas de golpes en la roca, queda claro que el tema del escultor
es una forma humana.
Con la forma general de la escultura desbastada, el artista comienza a
concentrarse en secciones específicas de la pieza. Por ejemplo, pueden
comenzar con la cara, acercándose para tallar la forma de los ojos, la nariz y
la boca. Después de varias pasadas, pasan a los brazos y luego comienzan a
detallar las piernas. A intervalos regulares, el artista retrocede para ver
cómo su trabajo detallado afecta la escultura en general. Este proceso
continúa hasta que se completa la escultura y todos están satisfechos con
los resultados.
Nuevamente, creo que la escultura de piedra sustractiva es una gran analogía para
un proceso digital exitoso, aunque, a diferencia de la escultura, tenemos el poder
de
¡deshacer!

-- 117 of 178 --

---

## Sección 57: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 121

Es esencial lograr que las partes interesadas se sientan cómodas con la revisión de los
trabajos en progreso en lugar de diseños y códigos completamente preparados. Como
mencioné en el capítulo 1, todas las organizaciones en estos días quieren volverse más
ágiles, y la iteración es una parte clave para ser ágiles. Es más importante dar pasos en la
dirección correcta. que gastar un montón de esfuerzo pintando imágenes poco realistas
de lo que quieres que sea la pieza final. Un sistema de diseño de sonido no surge de
una línea de montaje, sino que está esculpido en bucles iterativos, aumentando la
fidelidad a medida que avanza el proyecto.
Si todo esto suena un poco complicado, ¡es porque lo es! Para consternación de
algunos directores de proyectos, el proceso de diseño no encaja perfectamente en los
rígidos bordes de las hojas de cálculo de Excel y los diagramas de Gantt. La verdadera
colaboración entre disciplinas es confusa y caótica, y eso no es malo. La
comunicación constante, los circuitos de retroalimentación ajustados y la
verdadera colaboración se convierten en el pegamento que sostiene
Un proceso digital iterativo es similar a la escultura de piedra sustractiva, donde la fidelidad se construye a lo
largo de muchas iteraciones. Credito de imagen: Mike Beauregard en Flickr

-- 118 of 178 --

122 DISEÑO ATÓMICO
el proceso juntos. Haga que todo su equipo se comprometa con una
conversación honesta y una colaboración genuina, y los detalles de su
proceso encajarán en su lugar.
¿Están bien establecidas las expectativas de todos? ¡Bien! Ahora arremangámonos y
pongámonos manos a la obra para establecer nuestro sistema de diseño.
Estableciendo dirección
Los equipos a menudo están ansiosos por realizar un trabajo divertido de diseño y
desarrollo de alta fidelidad, y los clientes están ansiosos por ver y reaccionar ante
ese trabajo detallado. Sin embargo, esto conduce a distracciones, suposiciones y
todas las expectativas equivocadas antes mencionadas. Es esencial ponerse de
acuerdo en una dirección de diseño general y pintar primero los trazos
generales antes de pasar al diseño y desarrollo de alta fidelidad. Esto requiere
moderación y manejo de expectativas, pero da como resultado una toma de
decisiones más enfocada y un trabajo más realista.
¿Cómo se ve este trabajo de baja fidelidad? Echemos un vistazo a algunas técnicas que
los diseñadores de UX, los diseñadores visuales y los desarrolladores de front-end
pueden usar para comenzar a diseñar una dirección general sólida para un sistema de
diseño de UI.
Establecer contenido y patrones de visualización
Hay un montón de trabajo estratégico y de investigación inicial que puede y
debe suceder hacia el comienzo de un proyecto.
Diseñadores de UX
(conocido por otros apodos como
diseñadores de información, arquitectos de
información, diseñadores de interacción, y así sucesivamente) son responsables de
sintetizar toda esa información vital y traducirla en una interfaz de usuario que cumpla
con los objetivos comerciales y de usuario del proyecto.
En un proceso tradicional en cascada, muchos diseñadores de UX han
realizado esta tarea generando wireframes de alta fidelidad que documentan
cada pantalla de toda la experiencia del usuario. Estos documentos de
estructura alámbrica, llenos hasta los huesos con rectángulos negros y
anotaciones, especifican los detalles de lo que logrará la interfaz y se utilizan
para lograr la aceptación de las partes interesadas. Por más minuciosos que
sean estos documentos, no muestran la imagen completa y, a menudo, hacen
suposiciones peligrosas sobre el diseño visual y la funcionalidad técnica.

-- 119 of 178 --

---

## Sección 58: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 123

En lugar de saltar directamente a documentos de alta fidelidad, es mejor Comience
con bocetos de baja fidelidad que establezcan lo que aparece en una
pantalla en particular y en qué orden general. El establecimiento de la
arquitectura de información básica de la experiencia se puede lograr con una
simple lista con viñetas y una conversación. Para un proyecto que hice para el
Greater Pittsburgh Community Food Bank, comencé eliminando la arquitectura
de información básica para una página en un sitio.
Nadie en su sano juicio confundiría esta página bloqueada en escala de grises
como completa, pero proporciona información más que suficiente para tener
conversaciones importantes sobre la estructura y jerarquía de la página.
Hacer wireframes de baja fidelidad
móvil primero significa utilizar las limitaciones de
las pantallas pequeñas para obligar al equipo a centrarse en el contenido central y la
jerarquía. Ahora puede preguntar: "¿Tenemos las cosas correctas en esta pantalla?"
"¿Están en el orden general correcto?"
Wireframes HTML básicos para la página de inicio del Greater Pittsburgh Community Food Bank.

-- 120 of 178 --

124 DISEÑO ATÓMICO
Estas estructuras alámbricas en escala de grises en bloques ayudan a establecer los
patrones de contenido para la pantalla, pero los diseñadores de UX también pueden articular
algunos patrones de IU en todo el sitio que anticipan usar para finalmente mostrar esos
patrones de contenido. Para el rediseño de TechCrunch, la diseñadora Jennifer Brook definió
algunos patrones de interfaz de usuario en todo el sitio que podrían usarse en cualquier lugar:
De la imagen de arriba, puede deducir que el componente de "isla
destacada" mostrará el contenido de alguna manera. Tenga en cuenta la
naturaleza gestual de este boceto y cómo no hace suposiciones específicas
sobre el diseño o la funcionalidad. Los detalles de cómo se verá y
funcionará este patrón vendrán más adelante, pero al comienzo del
proyecto es útil simplemente definirlo y articular dónde podría usarse.
Como descubrí en proyectos posteriores, el contenido y los patrones de visualización se
pueden comunicar de manera efectiva en un formato aún más simple: la sencilla hoja de
cálculo.
Para el rediseño del sitio web de TechCrunch, Jennifer Brook definió patrones de visualización gestual en todo
el sitio, que no hacen suposiciones sobre la estética o la funcionalidad.

-- 121 of 178 --

---

## Sección 59: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 125

Con unas pocas columnas simples de la hoja de cálculo, podemos articular qué
patrones de visualización deben incluirse en una plantilla determinada y qué patrones
de contenido contendrán. Más importante aún, podemos articular la jerarquía relativa
de cada patrón y el papel que desempeña en la pantalla. Si lee la columna más a la
izquierda verticalmente, efectivamente está viendo la vista de dispositivos móviles
primero de lo que podría ser la interfaz de usuario.
“¿Qué contenido y patrones de visualización van en esta página? ¿Y en qué orden
general? son preguntas cruciales para hacer, y las técnicas que acabamos de
describir pueden ayudar a los diseñadores a discutirlas de manera efectiva sin
hacer ningún diseño o suposiciones técnicas.
Estableciendo dirección visual
El trabajo de un diseñador visual es crear un lenguaje estético y aplicarlo a la interfaz
de usuario de una manera que se alinee con los objetivos del proyecto. Para hacer
esto, es esencial que un diseñador visual descubra los valores estéticos de las partes
interesadas.
Históricamente, los diseñadores visuales han hecho esto creando
composiciones completas, a menudo
muchos comps - para sentir los valores
estéticos de la organización. Lanza algunas composiciones contra la pared y
mira qué se pega. Como puede imaginar, generar una gran cantidad de
composiciones desde cero requiere una inmensa cantidad de tiempo y
esfuerzo, y desafortunadamente gran parte de ese trabajo se encuentra en la
sala de montaje. Debe haber una forma más eficiente.
Una hoja de cálculo simple puede articular qué contenido y patrones de visualización van en una página
determinada mientras describe su orden y propósito.

-- 122 of 178 --

126 DISEÑO ATÓMICO
Resulta que hay un camino mejor a seguir para llegar a los valores
estéticos sin tener que hacer un montón de trabajo de diseño inicial.
Hablemos de algunas de las tácticas para que esto suceda.
La prueba intestinal de 20 segundos
Un ejercicio fantástico para establecer rápidamente los valores estéticos es el
Prueba intestinal de 20 segundos . El ejercicio, que normalmente se realiza como parte
de la reunión de inicio del proyecto, implica mostrar a las partes interesadas un puñado
de sitios web pertinentes (entre veinte y treinta de ellos) durante veinte segundos cada
uno. Los sitios que elija deben ser una combinación saludable de sitios específicos de la
industria y otros sitios visualmente interesantes de otras industrias. Para mayor
credibilidad, puede aplicar Photoshop en el logotipo de su cliente en lugar del logotipo
real del sitio.
Para cada sitio presentado, cada persona vota en una escala del 1 al 10, donde una puntuación
de 1 significa "Si este fuera nuestro sitio, dejaría mi trabajo y lloraría hasta quedarme dormido",
mientras que una puntuación de 10 significa "Si esto fuera nuestro sitio ¡estaría absolutamente
extasiado! " Indique a los participantes que consideren las propiedades visuales que les
parezcan interesantes, como la tipografía, el color, la densidad, el diseño, el estilo de la
ilustración y el ambiente general.
Para el inicio del rediseño del sitio web del Banco de Alimentos de Pittsburgh, mostramos a las partes
interesadas una variedad de sitios web relevantes durante veinte segundos cada uno. Los participantes votaron
sobre lo felices que serían si el sitio en particular fuera suyo. Luego discutimos los resultados.

-- 123 of 178 --

---

## Sección 60: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 127

Cuando termine el ejercicio, cuente rápidamente los puntajes y regrese al
grupo para discutir los resultados. Tenga una conversación sobre los sitios
que recibieron los cinco puntajes más bajos, los cinco puntajes más altos y
los puntajes más polémicos (sitios que algunas personas calificaron muy alto
y otras muy bajo). Los participantes deben explicar por qué se sintieron
atraídos o rechazados por un sitio en particular, y analizar las diferencias de
opiniones con el grupo.
Este ejercicio expone a las partes interesadas a una variedad de direcciones
estéticas al principio del proceso, les permite trabajar a través de las diferencias
de gusto y (con un poco de suerte) les ayuda a llegar a algunos valores estéticos
compartidos. Luego, el diseñador visual puede aferrarse a estos conocimientos y
comenzar a traducir esos valores estéticos en una dirección visual para el
proyecto.
Azulejos de estilo
Una vez más, el primer instinto de los diseñadores visuales es a menudo lanzarse directamente
a la creación de composiciones completas para articular una dirección estética para el
proyecto. Este trabajo de alta fidelidad es ciertamente tangible, pero también desperdicia una
tonelada de tiempo y esfuerzo si las composiciones no resuenan con las partes interesadas.
Además, la creación de composiciones de alta fidelidad a menudo supone grandes
suposiciones sobre la viabilidad técnica, lo que conduce a expectativas poco realistas y
relaciones antagónicas con los desarrolladores de frontend.
Es esencial establecer una dirección visual sólida para el proyecto, entonces,
¿cómo lo hace un diseñador visual sin gastar mucho tiempo en composiciones
iniciales de alta fidelidad? Esa es la pregunta que respondió la diseñadora
Samantha Warren cuando creó azulejos de estilo , un producto que es más tangible
que una tabla de estado de ánimo, pero no tan alta como una composición
completamente horneada.

-- 124 of 178 --

128 DISEÑO ATÓMICO
Azulejos de estilo (junto con sus contrapartes en el navegador, prototipos de estilo )
permiten a los diseñadores explorar el color, la tipografía, la textura, los iconos y
otros aspectos de la atmósfera del diseño sin hacer suposiciones sobre el diseño o
preocuparse por el pulido. Se pueden diseñar mucho más rápido porque no se ven
obstaculizados por las expectativas de las composiciones de alta fidelidad, lo que
significa que la retroalimentación y la discusión pueden ocurrir antes.
Para el proyecto de rediseño del sitio web de Entertainment Weekly, los diseñadores visuales utilizaron mosaicos
de estilo para explorar el color, el tipo, la textura y más.

-- 125 of 178 --

---

## Sección 61: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 129

Los mosaicos de estilo facilitan la conversación para descubrir qué valoran
las partes interesadas y qué no. “¿Este mosaico de estilo resuena mejor
contigo que con este? ¿Por qué?" "¿Por qué esta paleta de colores no le
sienta bien?" "¿Qué tiene este tipo de letra que te gusta?" Puede tener
importantes conversaciones sobre diseño estético sin tener que crear
composiciones completas.
Fundamentalmente, los mosaicos de estilo también refuerzan el pensamiento basado en
patrones al educar a las partes interesadas sobre el diseño.
sistemas más bien que
páginas. La presentación de muestras de color, ejemplos de tipos y texturas
expone a las partes interesadas a los ingredientes que respaldarán cualquier
implementación del sistema de diseño.
Collages de elementos
Si bien los mosaicos de estilo son excelentes para explorar la atmósfera del diseño,
todavía son un poco abstractos. Para tener una idea de cómo se aplicarán esos
ingredientes de diseño a una interfaz, es importante pasar rápidamente a algo un
poco más tangible que un mosaico de estilo. Pero, ¿eso significa que los diseñadores
visuales deben pasar de los mosaicos de estilo directamente a las composiciones
completas? No necesariamente.
En algún lugar entre mosaicos de estilo y composiciones completas en vivo collages de
elementos , que son colecciones de exploraciones de diseño de componentes de IU. Los collages
de elementos proporcionan un campo de juego para que los diseñadores apliquen la atmósfera
de diseño a los elementos reales de la interfaz, sin dejar de tener un diseño y una presentación
muy refinada.

-- 126 of 178 --

130 DISEÑO ATÓMICO
Al igual que los mosaicos de estilo, los collages de elementos están destinados a
facilitar la discusión sobre la dirección estética del proyecto. Está muy claro que estos
collages no son un sitio web real, pero las partes interesadas aún pueden tener una
idea de lo que el sitio
pudo parece. La conversación sobre estos collages de elementos
puede dar a los diseñadores visuales más ideas y orientación sobre dónde llevar el
diseño a continuación y, debido a su naturaleza lo-fi, los diseñadores pueden iterar y
desarrollar ideas rápidamente.
Sin duda existen otras tácticas para establecer la dirección estética de sus
proyectos, y las técnicas que decida emplear variarán de un proyecto a otro. Pero
la clave es pintar algunos trazos más amplios antes de dedicar mucho tiempo y
esfuerzo a un trabajo de diseño muy detallado. Participar en una conversación
con las partes interesadas en esta etapa exploratoria crea un proceso más
inclusivo, que es mucho más preferible a un proceso en el que las partes
interesadas simplemente gruñen aprobación o desaprobación de los entregables
del diseño.
Un collage de elementos para el rediseño de Entertainment Weekly aplicó color, tipografía y textura a los
elementos reales de la interfaz. Estos collages permitieron importantes conversaciones sobre la dirección
estética del proyecto.

-- 127 of 178 --

---

## Sección 62: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 131

Chef de preparación de front-end
Como comentamos anteriormente, los desarrolladores front-end a menudo se relegan a
máquinas de producción rudimentarias que se incorporan al proyecto solo después de que se
toman todas las decisiones de diseño. Este proceso arcaico mantiene las disciplinas
desincronizadas entre sí y evita que los equipos trabajen juntos de manera significativa. Esto
es un gran error. Incluir el desarrollo de front-end como una parte crítica del proceso de
diseño requiere cambios tanto en la estructura del proyecto como en la mentalidad de los
miembros del equipo.
En el negocio de los restaurantes, un papel importante pero no reconocido es el del
chef preparador. Un chef de preparación corta verduras, adoba la carne y hace
ensaladas en preparación para el trabajo del día siguiente. Al tener los ingredientes
preparados con anticipación, el personal de cocina puede concentrarse en la
colaboración y la cocina en lugar de en tareas domésticas. Sin el trabajo inicial del chef
de preparación, el flujo de los chefs principales se interrumpiría y el ritmo rápido de la
cocina se detendría.
Un chef de preparación corta verduras, adoba la carne, hace ensaladas y prepara otros ingredientes para que
el personal principal de la cocina pueda concentrarse en cocinar las comidas y en la colaboración.

-- 128 of 178 --

132 DISEÑO ATÓMICO
Los desarrolladores front-end deben ser los cocineros preparadores del
proceso de diseño web. Si los desarrolladores no están codificando desde el
primer día del proyecto, hay algo mal en el proceso. "Pero Brad", puedo
oírte decir, "¿cómo puedo empezar a codificar si no sé lo que se supone que
debo codificar?"
Créame, hay mucho trabajo inicial que hacer sin saber nada sobre el diseño
de información del proyecto o la dirección estética. Además de configurar el
entorno de desarrollo (como preparar repositorios de Git, servidores de
desarrollo, CMS y herramientas de desarrollo), los desarrolladores pueden
sumergirse en el código y comenzar a marcar patrones. Pero, ¿qué debería
marcar si no sabe nada sobre el diseño? Eso depende del tipo de proyecto en
el que esté trabajando.
¿Está creando un sitio de comercio electrónico? Puede configurar la búsqueda en el sitio, una
tabla de carrito de compras, una página de detalles del producto de marcador de posición, la
página de inicio y las páginas de pago. ¿Haciendo un servicio en línea? Comience a marcar los
formularios de registro e inicio de sesión, el flujo de contraseña olvidada y el panel de control. Y,
por supuesto, la mayoría de los sitios web tendrán un encabezado, un pie de página y un área de
contenido principal. Configure plantillas de shell y escriba un marcado básico para los patrones
que anticipa usar. Este marcado será inicialmente burdo, pero proporciona un punto de partida
crucial para la colaboración y la iteración.
Este trabajo de chef de preparación de front-end libera el tiempo de los desarrolladores
para colaborar
con diseñadores, en lugar de trabajar
después el diseño está completo. Con el
marcado básico implementado, los desarrolladores pueden trabajar con los diseñadores para
ayudar a validar las decisiones de diseño de UX a través de conversaciones y prototipos de
trabajo. Pueden ayudar a los diseñadores visuales a comprender mejor el orden de las fuentes y
el diseño web, y pueden producir rápidamente una base de código incipiente que eventualmente
evolucionará hasta convertirse en el producto final.
Deténgase, colabore y escuche
Repasemos rápidamente cómo se establece la dirección del diseño en
todas las disciplinas:
ɕ Diseñadores de UX puede crear bocetos de baja fidelidad para establecer
arquitectura de la información y algunos patrones de IU anticipados.
Diseñadores visuales puede recopilar los valores estéticos de los equipos realizando un
ejercicio de prueba intuitiva de 20 segundos, luego crear mosaicos de estilo y collages de
elementos para explorar las direcciones de diseño iniciales.
ɕ

-- 129 of 178 --

---

## Sección 63: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 133

ɕ Desarrolladores front-end puede configurar dependencias del proyecto, stub out
plantillas básicas y escribir marcado estructural para los patrones que el
equipo anticipa usar en el proyecto.
Este trabajo puede ocurrir al mismo tiempo, pero no debería ocurrir de forma
aislada. Claro, será necesario que haya un tiempo inicial de cabeza abajo para que
cada disciplina se configure, pero todos los miembros del equipo deben
Sea plenamente consciente de las exploraciones de cada disciplina antes de
trabajar juntos para desarrollar estas ideas.
Las ideas están destinadas a ser feas.
- Jason Santa María
En esta etapa inicial, es importante enfatizar la importancia de la exploración, el juego y
la generación de ideas. La naturaleza de baja fidelidad de las técnicas que acabamos de
comentar ayuda a fomentar esta exploración, lo que permite a los miembros del equipo
buscar ideas que les entusiasmen. A veces, esas ideas pueden expresarse mejor como
un boceto en servilleta, un prototipo en CodePen , una exploración visual en Sketch, un
cable rápido en Balsamiq, un concepto de movimiento en After Effects o alguna
combinación de medios y herramientas. El objetivo es que el equipo genere ideas y
resuelva problemas, no que imponga un orden rígido de operaciones. Al abordar
esta exploración del diseño de una manera interdisciplinaria, los equipos pueden
encontrar el equilibrio entre la estética, la viabilidad técnica, la usabilidad y la
funcionalidad.
Arremangándonos
Con una dirección de diseño general establecida, el equipo puede arremangarse
para construir la interfaz y su sistema de diseño subyacente. Pero, ¿cómo pueden
los equipos convertir un vago sentido de dirección en un sistema de diseño
hermoso, funcional, utilizable y completo?
Del concepto al completo
Convertir las exploraciones en patrones terminados es un proceso
borroso e imperfecto. Esto no debería sorprenderle en absoluto en este
punto del libro.

-- 130 of 178 --

134 DISEÑO ATÓMICO
Para el proyecto TechCrunch, Dan Mall se basó en las conversaciones de diseño
iniciales del equipo para crear una exploración visual del encabezado del sitio.
Esta parte de la interfaz era un lugar lógico para comenzar, ya que el
encabezado es uno de los elementos más destacados y de marca en la página.
Después de un poco de trabajo, hicimos una llamada para discutir la
exploración con el cliente.
Aunque este artefacto de diseño fue una simple exploración en
progreso, pudimos tener conversaciones importantes sobre la estética,
la jerarquía y la funcionalidad sugerida del encabezado. Debido a que el
encabezado se presentó sin contexto, pudimos discutir los problemas
relacionados con el encabezado sin que las partes interesadas se
centraran en otros elementos de la página.
Aunque el cliente no lo sabía, había estado construyendo una versión HTML
funcional del encabezado detrás de escena en Pattern Lab.
Dan Mall creó un collage de elementos para explorar una dirección estética para el encabezado global.
Usando la exploración de Dan como referencia, creé una versión HTML del encabezado global en Pattern Lab.
Este prototipo en escala de grises nos ayudó a demostrar la interactividad y cómo el encabezado se adaptaría en
todo el espectro de resolución.

-- 131 of 178 --

---

## Sección 64: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 135

Este prototipo en escala de grises nos permitió demostrar interactividad y
capacidad de respuesta, lo que generó aún más discusión. En conjunto,
propusimos cambios en el diseño y la funcionalidad del encabezado, y pude
realizar cambios utilizando las herramientas de desarrollo del navegador durante
la llamada. ¡De repente, todo el equipo y las partes interesadas participaron
activamente en el proceso de diseño!
Con el aporte de las partes interesadas y el equipo, iteramos sobre el patrón de
encabezado para masajear el diseño, la IA, los detalles estéticos y la
funcionalidad para llegar a la solución con la que finalmente lanzamos.
Obviamente, el patrón de encabezado no existe en el vacío. Dentro de
Pattern Lab, el encabezado se incluyó en cada plantilla utilizando el patrón
de inclusión de Moustache que discutimos en el capítulo 3.
{{> organismo-encabezado}}
Esto nos permitió ver el encabezado dentro del contexto del resto de las
páginas, aunque inicialmente eran esquemáticas. Entonces, mientras nos
enfocamos en diseñar un patrón específico, simultáneamente tomamos en
cuenta el contexto de dónde se emplearía ese patrón.
El encabezado con el que lanzamos fue la culminación de muchas conversaciones y decisiones sobre el
contenido, el diseño y la funcionalidad del patrón.

-- 132 of 178 --

136 DISEÑO ATÓMICO
Inicialmente, los diseños en el navegador tienden a parecer toscos en el mejor de los
casos, lo cual está bien. La intención es eliminar la arquitectura de información básica
de la plantilla en el navegador, definir patrones, conectar esos patrones utilizando
inclusiones y comenzar el marcado general de los patrones. Con ese trabajo en su
lugar, el equipo puede comenzar colectivamente a diseñar patrones específicos y
refinar la estructura general.
Ver estos prototipos parcialmente diseñados puede parecer inusual para aquellos que están
acostumbrados a los entregables de diseño más tradicionales y con píxeles perfectos. Pero
es mucho más importante comunicar el progreso que una falsa sensación de perfección, por
lo que las actualizaciones continuas son preferibles a las grandes revelaciones.
En un proceso más iterativo, habrá casos en los que algunos patrones se desarrollen más que otros. Ver una
página parcialmente terminada puede parecer inusual fuera de contexto, pero la comunicación entre el
equipo y las partes interesadas debería aliviar la confusión.

-- 133 of 178 --

---

## Sección 65: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 137

El papel de las composiciones en una era post-PSD
Hasta este punto hemos estado hablando de establecer una dirección estética
general y luego diseñar algunos patrones para experimentar con la aplicación de
esa dirección estética. Estas tácticas relativamente de baja fidelidad permiten a
los equipos explorar libremente, iterar rápidamente y obtener comentarios antes.
Pero nunca olvidaré los comentarios de este cliente que recibimos sobre el primer
proyecto basado en patrones en el que trabajé: “Estos collages de elementos se ven
geniales, pero es como si me estuvieras pidiendo que comentara lo hermosa que es
una cara mostrándome la nariz . "
Si ha llegado a este punto en su proceso, ¡felicitaciones! Comentarios como este
significan que están ansiosos por más, por lo que ahora que ha capturado una
dirección estética general, puede poner esas exploraciones en contexto de manera
segura. Eso probablemente implica la creación de composiciones estáticas
completas.
Escuche la charla sobre "diseñar en el navegador" y sin duda lo oirá
Las
composiciones de Photoshop son la encarnación del diablo. Lo cual, por supuesto,
no es cierto. A lo largo de este libro, hemos discutido la importancia de
descomponer las cosas en sus elementos atómicos y al mismo tiempo construir
un todo cohesivo. Las composiciones estáticas son eficaces para mostrar una
imagen completa de cómo podría verse la interfaz de usuario. El truco es
saber
Cuándo pintar esas imágenes completas y saber cuánto tiempo permanecer
en documentos de diseño estáticos.

-- 134 of 178 --

138 DISEÑO ATÓMICO
Dan Mall creó una composición completa para demostrar cómo se vería una plantilla de artículo destacado para
TechCrunch. Este artefacto se utilizó para mostrar el sistema de diseño en contexto y obtener la aprobación del
diseño general. Las revisiones de diseño posteriores se manejarían en el navegador.

-- 135 of 178 --

---

## Sección 66: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 139

Para el proyecto TechCrunch, creamos una composición solo para la plantilla del
artículo
después el cliente se sentía bien con nuestras exploraciones de collage de
elementos. Crear composiciones completas requiere mucho esfuerzo, por lo que
primero establecimos la dirección del diseño para mitigar el riesgo de que todo ese
esfuerzo de composición completa se vaya directamente a la basura si nos
equivocamos por completo.
Los comps, como cualquier otro artefacto de diseño, se utilizan para facilitar una
conversación con las partes interesadas del proyecto. Si su retroalimentación es, "Esto
se siente mal", entonces vuelve a la mesa de dibujo para crear una nueva composición.
Pero si sus comentarios sugieren, “¿Podemos mover esto de aquí para aquí? ¿Podemos
agregar un borde gris alrededor del texto del artículo? ¿Podemos aumentar el tamaño
de esta imagen? " eso es una señal de que la dirección general está en buena forma y
esos problemas relativamente menores se pueden abordar en el navegador.
Iteración en el navegador
Las composiciones estáticas pueden ser excelentes para dar forma a la dirección
estética general de una plantilla, pero los usuarios finalmente verán e
interactuarán con la experiencia en un navegador. Es por eso que los diseños
deben traducirse rápidamente al entorno final y repetirse allí.
Trabajar en el navegador permite a los equipos abordar problemas de diseño en
todo el espectro de resolución, diseñar en torno a datos dinámicos (como
longitudes de caracteres variables, tamaños de imagen y otro contenido
dinámico), demostrar interacción y animación, medir el rendimiento, tener en
cuenta la ergonomía y confrontar Consideraciones técnicas (como densidad de
píxeles, representación de texto, rendimiento de desplazamiento y peculiaridades
del navegador). Las composiciones de diseño estático no pueden abordar todas estas
consideraciones, por lo que deben tratarse simplemente como hipótesis en lugar de
especificaciones inamovibles. Solo cuando se transfiere al navegador se puede
confirmar o rechazar realmente cualquier hipótesis de diseño.
Cambiemos la frase "diseñar en el navegador" por
"decidir en el navegador".
- Dan Mall

-- 136 of 178 --

140 DISEÑO ATÓMICO
Una vez que los diseños están en el navegador, deben permanecer en el
navegador. En esta etapa del proceso, el punto de producción se traslada a los
miembros del equipo expertos en la elaboración de HTML, CSS y JavaScript de
presentación. Los patrones deben crearse, diseñarse y conectarse donde sea
necesario. Los diseñadores pueden reaccionar a estas implementaciones en el
navegador y pueden crear composiciones puntuales en herramientas estáticas
para ayudar a eliminar las arrugas sensibles a nivel del organismo. Esta ida y
vuelta entre las herramientas estáticas y en el navegador establece un bucle
saludable entre el diseño y el desarrollo, donde el código de front-end se vuelve
más sólido y estable con cada bucle iterativo.
Lo hermoso de un flujo de trabajo basado en patrones es que a medida
que cada patrón se hornea más completamente, cualquier plantilla
que incluya el patrón también se horneará más completamente.
Eso significa que el nivel de esfuerzo para crear nuevas plantillas disminuye
drásticamente en el transcurso del proyecto, hasta que, finalmente, la creación de
una nueva plantilla implica principalmente unir patrones existentes.
Esta ilustración de Trent Walton de Paravel articula perfectamente un proceso de diseño y desarrollo más iterativo.
Al obtener los diseños en el navegador antes, los equipos pueden iterar sobre el diseño y abordar las muchas
consideraciones que solo se pueden abordar una vez que el diseño está en el navegador.

-- 137 of 178 --

---

## Sección 67: CAPÍTULO 4 / EL FLUJO DE TRABAJO ATÓMICO 141

Tráelo a casa
El sistema de diseño va tomando forma y el equipo está cocinando con gas para
llevar el proyecto a casa. En esta etapa, los patrones de la interfaz de usuario están
bien establecidos, el equipo está dando algunos pasos finales para ajustar todo y
prepararse para el lanzamiento.
Los diseñadores de UX están trabajando duro en el prototipo para asegurarse de que
los flujos y las interacciones son todos lógicos e intuitivos. Los diseñadores visuales
están revisando la interfaz y proponiendo ajustes de diseño en la interfaz de usuario
para pulir el diseño. Los desarrolladores de front-end están probando la experiencia en
una gran cantidad de navegadores y dispositivos al mismo tiempo que abordan los
comentarios sobre el diseño. Los desarrolladores de back-end están trabajando
arduamente para integrar la interfaz de usuario del front-end en el CMS (hablaremos
más sobre la relación entre el front-end y el back-end en el capítulo 5). Y, por supuesto,
los clientes y las partes interesadas están haciendo demandas de último momento, me
refiero a sugerencias, sobre el diseño y el contenido. Todo el equipo está contribuyendo
con documentación para la guía de estilo, limpiando los patrones en la biblioteca de
patrones y trabajando duro para que el sitio web despegue.
Luego, aparentemente en un abrir y cerrar de ojos, se lanza el sitio web y el
sistema de diseño que lo acompaña. Se vierte champán, se intercambian choca
los cinco y, por supuesto, se eliminan los errores posteriores al lanzamiento. Los
usuarios visitan el nuevo sitio para encontrar una experiencia hermosa,
funcional, consistente y cohesiva que sin duda les hace llorar de alegría. Misión
cumplida.
Lo que comenzó como una losa gigante de roca ahora es una escultura finamente
pulida, gracias a un montón de trabajo duro, colaboración genuina, comunicación
constante y mucha iteración. Además, además de un sitio web completamente
nuevo, el equipo deja atrás un sistema de interfaz de usuario flexible y deliberado
incluido en una hermosa guía de estilo.
Este capítulo exploró todo lo que se necesita para crear un sistema de diseño de
interfaz de usuario eficaz. En el próximo capítulo, discutiremos cómo
asegurarnos de que el sistema de diseño continúe siendo exitoso a largo plazo.

-- 138 of 178 --

Hacer que los sistemas de diseño resistan la prueba
del tiempo
Manteniendo
Sistemas de diseño

---

## Sección 68: Capítulo 5

-- 139 of 178 --

E hicieron un sistema de diseño, entregaron una guía de estilo y vivieron
felices para siempre. ¿Derecha?
No exactamente.
Existe un riesgo muy real de que una guía de estilo termine en la papelera junto
con todos los PSD, PDF y esos otros artefactos estáticos del proceso de diseño.
A pesar de las mejores intenciones de todos, todo el tiempo y el esfuerzo que
se invirtió en crear un sistema de diseño y una guía de estilo bien pensados
pueden irse directamente al drenaje.
¿Como puede ser?
Una guía de estilo es un artefacto del proceso de diseño. Un sistema de diseño es un
producto vivo y financiado con una hoja de ruta y un trabajo pendiente que sirve a un
ecosistema.
- Nathan Curtis
Un artefacto es algo que se encuentra en una excavación arqueológica o en un
museo, mientras que un sistema es una entidad viva que respira. Un estilo

---

## Sección 69: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 143

-- 140 of 178 --

144 DISEÑO ATÓMICO
La guía puede proporcionar documentación y servir como un recurso útil, pero la
simple existencia de una guía de estilo no garantiza el éxito a largo plazo del
sistema de diseño subyacente. Un sistema de diseño necesita mantenimiento
continuo, apoyo y cuidado tierno y amoroso para que realmente prospere.
Cambiando de opinión, una vez más
Ya hemos hablado de la importancia de restablecer las expectativas de todos para
establecer un flujo de trabajo más colaborativo y basado en patrones. Para salvar a
nuestras guías de estilo de las entrañas de un bote de basura, una vez más debemos
reconfigurar fundamentalmente los cerebros de las personas.
¿Qué estamos haciendo de nuevo?
Nosotros
pensar simplemente diseñamos y construimos sitios web y aplicaciones.
Y eso es cierto en su mayor parte. Después de todo, para eso nos pagan nuestros
clientes, y los productos que creamos son los vehículos que generan dinero y éxito
para nuestras organizaciones. Parece natural centrarse en las implementaciones
finales en lugar del sistema subyacente. Los productos en vivo siguen siendo el
foco principal de atención de todos, mientras que cualquier biblioteca de patrones
existe como una rama que simplemente proporciona documentación útil.
El problema con esta mentalidad es que casi puedes ver que la biblioteca de
patrones se rompe y se desliza hacia el abismo. Una vez que la biblioteca de
patrones deja de reflejar el estado actual de los productos

-- 141 of 178 --

sirve, se vuelve obsoleto. Y cuando la biblioteca de patrones que
administra el sistema de diseño ya no es precisa, el proceso de
mantenimiento del sitio web se convierte en un puñado de revisiones y
cambios ad hoc, arruinando toda la consideración que se requirió para
crear el sistema de diseño original.
Para prepararnos para el éxito a largo plazo, debemos cambiar fundamentalmente
nuestra perspectiva en torno a lo que realmente estamos creando. En lugar de pensar
en las aplicaciones finales como nuestra única responsabilidad, debemos reconocer
que el sistema de diseño es lo que sustenta nuestros productos finales.
y bibliotecas de
patrones.
Esta mentalidad de "diseño primero del sistema" introduce un poco de fricción en el
proceso de mantenimiento, y eso la fricción puede ser amistosa. Nos obliga a dar un
paso atrás y considerar cómo las mejoras, las solicitudes de los clientes, las adiciones de
funciones y las iteraciones afectan el sistema en general, en lugar de solo una parte de
todo el ecosistema.
Supongamos que está trabajando en un sitio de comercio electrónico y ejecuta una
prueba que encuentra que un menú desplegable de estilo personalizado en la página
de detalles del producto no funciona tan bien como el menú desplegable
predeterminado del navegador. Un curso de acción es simplemente eliminar el menú
desplegable de estilo personalizado de esa página en particular y terminarlo. Sin
embargo, considerar todo el sistema de diseño en lugar de solo la página de detalles
del producto puede hacer que retroceda un paso y se pregunte: "Si este menú
desplegable personalizado no funciona bien aquí, tal vez no funcione bien en otros
lugares". Después de profundizar en el tema, encontrará que el mejor curso de acción
es globalmente

---

## Sección 70: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 145

-- 142 of 178 --

146 DISEÑO ATÓMICO
modifique el patrón desplegable en el sistema de diseño para eliminar el estilo
personalizado. Ahora, cualquier lugar que aparezca el patrón desplegable
reflejará esos cambios y probablemente verá mejoras de rendimiento
similares.
Ese es solo un ejemplo de cómo el pensamiento del sistema de diseño puede conducir a
cambios más amplios y considerados. El comportamiento inadecuado y las
oportunidades para mejorar la interfaz de usuario a menudo se realizarán en el
solicitud nivel, pero esos cambios a menudo se deben actuar en el
sistema nivel. Agregar este poco de fricción amigable a su flujo de trabajo
garantiza que las mejoras se compartan en todo el ecosistema y evita que
el sistema se vea erosionado por una serie de cambios únicos.
Hecho y hecho
Otra expectativa que debemos revisar es nuestra definición de
hecho.
Crear cosas para impresión y otros medios físicos implica hacer objetos
permanentes y tangibles. Ese sentido de finalidad simplemente no existe en el
mundo digital, lo que significa que el cambio puede ocurrir con mucho menos
esfuerzo y fricción que otros medios. Los clientes, colegas y partes interesadas
deben adoptar la naturaleza flexible del mundo digital para crear sistemas
de diseño vivo que se adapten a la naturaleza cambiante del medio, las
necesidades de los usuarios y las necesidades de la empresa.
Este cambio de pensamiento afecta fundamentalmente el alcance de nuestro trabajo.
Las personas que trabajan en el negocio de servicios al cliente a menudo están
acostumbradas a entregar un proyecto en un paquete ordenado y luego cabalgar hacia
la puesta del sol. Los equipos internos no funcionan mucho mejor, ya que tienden a
flotar de una iniciativa a otra. Ya sea que forme parte de un equipo interno o sea una
persona externa contratada, supongo que ha experimentado las deficiencias del trabajo
basado en proyectos. Tendemos a hablar de un futuro que nunca llega y, en cambio, lo
configuramos, lo olvidamos y luego pasamos al siguiente proyecto brillante.
Si estamos comprometidos a crear un trabajo realmente útil que realmente satisfaga
las necesidades de nuestros clientes y organizaciones, debemos redefinir
fundamentalmente el alcance de nuestro trabajo. Como dice Nathan Curtis, un
sistema de diseño no debería ser un
proyecto con un alcance finito, sino más bien un
producto
destinado a crecer y evolucionar con el tiempo:

-- 143 of 178 --

---

## Sección 71: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 147

Centrarse en la entrega de la guía de estilo como clímax es una historia
incorrecta para contar. Un sistema no es un proyecto con un final, es la
historia de origen de un producto vivo y en evolución que servirá a otros
productos.
- Nathan Curtis
La web nunca termina, y la creación de un sistema de diseño es simplemente el
primer paso de un viaje largo (¡y con suerte fructífero!). Un sistema de diseño
debe ser un compromiso a largo plazo con el ambicioso objetivo de
revolucionar la forma en que su organización crea trabajo digital. Emocionante,
¿eh? Entonces, ¿cómo nos aseguramos de que eso suceda?
Creando sistemas de diseño mantenibles
Mientras se embarca en este viaje lleno de patrones, hablemos de las cosas
que puede hacer para crear un sistema de diseño que configure su
organización para el éxito a largo plazo. ¿Cómo se crea un sistema de diseño
que arraigue y se convierta en una parte esencial del flujo de trabajo de su
organización? ¿Qué trampas debes tener en cuenta? ¿Cómo se asegura de que
el sistema de diseño produzca grandes resultados? Para configurar su sistema
de diseño para el éxito a largo plazo, debe:
ɕ Hágalo oficial.
ɕ Hágalo adaptable.
ɕ Hágalo mantenible.
ɕ Hágalo interdisciplinario.
ɕ Hágalo accesible.
ɕ Hazlo visible.
ɕ Hazlo más grande.
ɕ Hágalo independiente del contexto.
ɕ Hágalo contextual.
ɕ Haz que dure.
Profundicemos en cada uno de estos puntos con un poco más de detalle.

-- 144 of 178 --

148 DISEÑO ATÓMICO
Que sea oficial
Su guía de estilo inicial puede comenzar su vida como un proyecto paralelo, el
resultado de un hackathon de fin de semana o como una creación de uno o dos
miembros ambiciosos del equipo. Como discutimos en el capítulo anterior, su
cliente o jefe ni siquiera tiene que saber que está creando un sistema de diseño
reflexivo y una biblioteca de patrones que lo acompaña. Recuerda: ¡pide perdón,
no permiso!
Los comienzos orgánicos están muy bien, pero para establecer un sistema de
diseño verdaderamente impactante que genere éxito a largo plazo para su
organización, el sistema de diseño debe evolucionar hasta convertirse en
un esfuerzo autorizado oficialmente. Eso significa pensar en él como un
producto real en lugar de un simple proyecto paralelo y, en consecuencia,
asignarle tiempo real, presupuesto y personal.
Convencer a las partes interesadas de que dediquen grandes cantidades de dinero,
tiempo y recursos por adelantado a un sistema de diseño puede ser un gran desafío.
Entonces, ¿qué vamos a hacer? Este es mi consejo:
1. Haz una cosa.
2. Demuestre que es útil.
3. Hágalo oficial.
Analicemos estos pasos un poco más.
1: hacer algo
Tienes que empezar en alguna parte, y empezar algo es mejor que nada.
Elija un proyecto que sería un gran piloto para establecer su sistema de
diseño; seguir un proceso similar al discutido en Capítulo 4 ; Piense en el
modelo mental de diseño atómico detallado en Capitulo 2 ; y terminará con
una base sólida para un sistema de diseño inteligente y una biblioteca de
patrones que ayuda a su equipo a trabajar de manera más efectiva.
Tómese el tiempo para empaquetar sus patrones de IU en una biblioteca de
patrones y prepárelo para comprar. He hablado con varios miembros del
equipo ambiciosos que han establecido la esencia básica de su biblioteca de
patrones en el transcurso de un fin de semana. Este esfuerzo marca la
diferencia en el mundo, ya que proporciona algo tangible para que las partes
interesadas reaccionen. Otra vez:
mostrar, no contar.

-- 145 of 178 --

---

## Sección 72: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 149

2: demuestre que es útil
Con un sistema de diseño incipiente pero tangible implementado, puede tener
conversaciones más significativas con las personas que controlan el dinero, la
programación y los recursos. Puede analizar exactamente cómo el sistema de
diseño ayudó a ahorrar tiempo y dinero (consulte " Patrones de lanzamiento ”En el

---

## Sección 73: capítulo 4), luego describa cómo esos beneficios aumentarían aún más si la

organización invirtiera en un sistema de diseño oficial y completo.
Consiga miembros del equipo de diferentes disciplinas que lo respalden y
discutan el éxito inicial del sistema, y también atraiga a otros que
simpatizan con la causa y que se beneficiarían de un sistema de diseño
ampliado.
3: Hágalo oficial
Ha demostrado el valor de su sistema de diseño inicial y ha presentado una hoja
de ruta sobre cómo mejorarlo aún más. Con un poco de suerte, su organización
se comprometerá a convertir el sistema de diseño en algo oficial.
Con la aprobación de los niveles más altos, ahora puede poner en práctica un
plan que implica: asignar o contratar personas para trabajar en el sistema de
diseño; desarrollar un plan para hacerlo más robusto; establecer una
estrategia de gobernanza clara; y trazar una hoja de ruta del producto.
Vale la pena señalar que es posible que las cosas no salgan como
esperaba. A pesar de demostrar un valor real y presentar un plan de acción
concreto, los superiores aún pueden derribar su iniciativa.
No se desanime. Puede que hayas perdido la batalla, pero ciertamente
puedes ganar la guerra. Su equipo debe seguir creciendo y ampliando el
sistema de diseño en toda la capacidad que pueda hasta que su valor sea
innegable. A medida que más personas se beneficien del sistema, terminará
con un sistema de base que puede ayudar a impulsar el esfuerzo.

-- 146 of 178 --

150 DISEÑO ATÓMICO
Establecer un equipo de sistema de diseño
Con la iniciativa del sistema de diseño aprobada, ahora es el momento de poner en
marcha las personas y los procesos adecuados para garantizar que el sistema prospere
para su organización.
Diseñadores de sistemas y usuarios
Lo primero es lo primero. Es importante reconocer que inevitablemente habrá
personas en la organización que ayuden
hacer y mantener el sistema de
diseño, y habrá personas que estarán
usuarios del sistema de diseño. Puede
haber una superposición entre estos dos grupos, pero, no obstante, es
importante establecer los roles de los creadores y los usuarios.
Cuando hablo de establecer un proceso más colaborativo como el que detallé en
el capítulo anterior, inevitablemente escucho a personas que trabajan en grandes
organizaciones decir: “Pero Brad, tenemos cientos (o incluso miles) de
desarrolladores trabajando en nuestros productos. Hacer que todas esas
personas colaboren y contribuyan de esa manera sería demasiado difícil ".
Probablemente tengan razón. Sería ideal que toda la organización
adoptara procesos más ágiles y colaborativos, pero la abrumadora
logística en torno a tal esfuerzo lo hace improbable. Pero aquí está la cosa:
no
todo el mundo en la organización debe contribuir directamente al
sistema de diseño, pero alguien (o más probablemente, algunas personas)
debe hacerse cargo de él.
El sistema de diseño
hacedores son los que crean, mantienen y gobiernan
el sistema, y necesitan trabajar en estrecha colaboración para garantizar que
el sistema sea inteligente, flexible, escalable y satisfaga las necesidades de los
usuarios y las empresas. El sistema de diseño
usuarios son los equipos de
toda la organización quienes tomarán el sistema y emplearán sus
patrones de interfaz para aplicaciones específicas.

-- 147 of 178 --

---

## Sección 74: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 151

El sistema de diseño
hacedores y sistema de diseño
usuarios necesidad de
mantener una estrecha relación de trabajo para garantizar que los patrones
definidos dentro del sistema satisfagan las necesidades de las aplicaciones y que toda
la documentación sea clara. Los creadores brindan una perspectiva a vuelo de
pájaro de todo el ecosistema al que sirve el sistema de diseño, mientras que los
usuarios brindan una perspectiva sobre el terreno centrada en aplicaciones
específicas del sistema. Jina Bolton de Salesforce resume bastante bien la relación
entre fabricantes y usuarios:
El sistema de diseño informa nuestro diseño de producto. Nuestro diseño de
producto informa al sistema de diseño.
- Jina Bolton, Salesforce
Diseñadores de sistemas y usuarios.

-- 148 of 178 --

152 DISEÑO ATÓMICO
Ambas perspectivas son fundamentales para el éxito del sistema de diseño,
por lo que es tan importante que los creadores y los usuarios tengan una
relación sana que implique una comunicación y colaboración frecuentes.
Creadores de sistemas de diseño
¿Quién actualiza el sistema de diseño? ¿Quién aprueba los cambios? ¿Quién se
comunica con los usuarios del sistema de diseño para asegurarse de que responde a
sus necesidades? ¿Quién decide qué patrones se quedan, desaparecen o necesitan
ajustes?
Las respuestas a estas preguntas dependerán en gran medida del tamaño y la
configuración de su organización.
Grandes organizaciones son capaces de dedicar importantes recursos a la gestión de
sistemas de diseño. Salesforce, por ejemplo, mantiene un
equipo de sistemas de diseño, que
actualmente incluye alrededor de una docena de empleados a tiempo completo, lo
último que supe. Ese equipo dedicado es responsable de gobernar el sistema de diseño
y asegurarse de que satisfaga las necesidades de los equipos de productos internos, así
como de los desarrolladores externos que construyen cosas en la plataforma de la
empresa. Cuando un sistema de diseño está sirviendo literalmente a miles de usuarios,
es una buena idea dedicar al menos algunos empleados a tiempo completo para
administrar y expandir el sistema.
Organizaciones más pequeñas lo más probable es que no tenga el lujo de crear un
equipo completo para dar servicio a un sistema de diseño. Los miembros del equipo en
organizaciones más pequeñas tienen que usar muchos sombreros (¡con suerte
elegantes!) Por necesidad, por lo que gobernar el sistema de diseño probablemente se
convierta en otra responsabilidad. Esto puede parecer una carga adicional ("¡Oh, genial,
otra cosa más de la que soy responsable que no implica un aumento de sueldo!"), Pero
este sombrero en particular debería ser un placer de usar, ya que mejora la eficiencia y
la calidad de todos los demás trabajos. ¡Hurra por los sistemas de diseño!
Por lo general, los creadores de sistemas de diseño en organizaciones más
pequeñas serán personal de alto nivel que tiene la experiencia para tomar
decisiones meditadas y la autoridad para hacer cumplir el sistema de diseño.
Y luego estan agencias externas, contratistas y consultores.
¿Cuál es el papel de un tercero cuando se trata del mantenimiento a largo
plazo del sistema de diseño de un cliente? Por un lado, externo

-- 149 of 178 --

---

## Sección 75: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 153

los socios están un poco en desventaja, ya que en realidad no trabajan para la
organización de sus clientes. Un sistema de diseño exitoso debe convertirse en
parte del ADN de una organización y, dado que existen terceros fuera de los
muros de la empresa, su influencia es intrínsecamente limitada.
Pero en la otra mano, las partes externas a menudo pueden proporcionar un sentido
de perspectiva eso es difícil de ver mientras se trabaja dentro de una empresa. Aquí es
donde los forasteros realmente pueden brillar. En mi trabajo como consultor, trabajo
con organizaciones para establecer estrategias de mantenimiento de sistemas de
diseño a largo plazo y ayudar a que las personas y los procesos adecuados estén en su
lugar. Si bien el éxito a largo plazo del sistema dependerá en última instancia de la
organización, los terceros pueden enseñarles a pescar y brindarles una orientación
estratégica, una retroalimentación y una perspectiva importantes.
Usuarios del sistema de diseño
¿Quiénes son las personas responsables de utilizar el sistema de diseño para crear
nuevas funciones y aplicaciones? ¿Quiénes son las personas que hablan con los
creadores del sistema para informar problemas y solicitar funciones?
Una vez más, las respuestas a estas preguntas dependerán en gran medida del
tamaño y la estructura de su organización.
Los usuarios del sistema de diseño pueden ser el mismo equipo que crea el
sistema de diseño, equipos de desarrollo separados dentro de su
organización, diseñadores y desarrolladores de nivel junior, agencias
asociadas, talleres de desarrollo externos u otros equipos de terceros.
La proximidad y participación de los usuarios en la creación del sistema de
diseño variará sin duda alguna. Puede trabajar en un producto singular en una
empresa incipiente, por lo que su pequeño equipo podría crear y utilizar
simultáneamente el sistema de diseño. O puede trabajar en una gran
corporación multinacional con equipos de desarrollo y socios externos repartidos
por todo el mundo. Si este es el caso, es posible que los creadores de sistemas de
diseño y los usuarios rara vez (o nunca) se encuentren, lo que significa que la
documentación útil y una perspectiva nítida se vuelven mucho más importantes.

-- 150 of 178 --

154 DISEÑO ATÓMICO
Una de las mayores ventajas de establecer un sistema de diseño reflexivo es que
permite a las organizaciones escalar las mejores prácticas. Si todas esas mejores
prácticas (capacidad de respuesta, accesibilidad, rendimiento, UX, ergonomía, etc.) se
incorporan al sistema, los usuarios pueden simplemente conectar los patrones y
cosechar las recompensas. Esto significa que los usuarios del sistema de diseño no
tienen que ser diseñadores o desarrolladores de alto nivel para producir un buen
trabajo; el sistema de diseño sirve como un vehículo de control de calidad que ayuda a
los usuarios a aplicar las mejores prácticas independientemente del nivel de habilidad de
cada individuo.
Equipo de diseño del sistema
Se debe establecer un equipo multidisciplinario para administrar,
mantener y ampliar adecuadamente el sistema. Todas las disciplinas de una
organización (diseñadores de UX, diseñadores visuales, estrategas de
contenido, desarrolladores front-end, desarrolladores back-end, gerentes de
productos, gerentes de proyectos, ejecutivos y otras partes interesadas) tienen
perspectivas únicas que, sin duda, pueden informar y dar forma al trabajo. La
incorporación de estas perspectivas en el sistema de diseño es importante, pero
no necesariamente requiere que todas las disciplinas se involucren
constantemente en su desarrollo.
Existe un espectro de relaciones potenciales entre los usuarios y los creadores del sistema de diseño, y el
tamaño y la composición de su empresa indudablemente darán forma a esas relaciones.

-- 151 of 178 --

---

## Sección 76: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 155

Inevitablemente, habrá disciplinas que hagan el trabajo de forma activa, mientras que
otras pueden asumir un papel más de asesoramiento. Los responsables del diseño y
la construcción de la interfaz de usuario (diseñadores de UX, diseñadores
visuales, desarrolladores de front-end) probablemente serán los encargados de
hacer el trabajo y actualizar el sistema de diseño.
Deben trabajar en colaboración (como se detalla en el capítulo 4) y
coordinarse con otras disciplinas para garantizar que el sistema refleje los
valores y las consideraciones de toda la empresa.
Es posible que otras personas no sean las que estén haciendo el trabajo
activamente, pero deben ser consultadas para asegurarse de que sus perspectivas
se reflejen correctamente en el sistema. Los ingenieros de back-end deben informar
al equipo de cualquier decisión arquitectónica que pueda afectar la interfaz de usuario
del front-end; los ejecutivos deben concienciar al equipo de las iniciativas importantes
que afectarán el papel y la utilidad del sistema; y, por supuesto, los usuarios del sistema
de diseño deben coordinarse con los fabricantes para garantizar que el sistema
satisfaga las necesidades de las aplicaciones individuales.
Hágalo adaptable
El cambio es la única constante, como dicen. El
viviendo parte de un sistema de diseño vivo significa
que necesita adaptarse a los golpes, adaptarse a la retroalimentación, ser iterado y evolucionar
junto con los productos a los que sirve.
Un concepto erróneo sobre los sistemas de diseño es que una vez establecidos, se
convierten en una fuente de verdad omnipotente e inmutable. Pensar de una
manera tan rígida es una manera segura de que el esfuerzo de su sistema de
diseño sea contraproducente. Si los usuarios se sienten esposados y encasillados
en el uso de patrones que no resuelven sus problemas, percibirán el sistema de
diseño como una herramienta inútil y comenzarán a buscar en otra parte algo
que satisfaga mejor sus necesidades.
Crear un plan de gobierno claro es esencial para asegurarse de que su sistema de
diseño pueda adaptarse y prosperar a medida que pasa el tiempo. Una estrategia de
gobernanza sólida comienza respondiendo algunas preguntas importantes sobre
cómo manejar el cambio. Considera lo siguiente:
ɕ ¿Qué sucede cuando un patrón existente no funciona del todo para
una aplicación específica? ¿Se modifica el patrón? ¿Recomiendas usar
un patrón diferente? ¿Es necesario crear un nuevo patrón?
¿Cómo se manejan las solicitudes de nuevos patrones? ɕ

-- 152 of 178 --

156 DISEÑO ATÓMICO
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
Es probable que haya muchas preguntas más específicas para responder,
pero el punto es que su equipo debe tener respuestas y procesos para
abordar los cambios inevitables en el sistema.
Como ya se mencionó algunas veces, la comunicación y colaboración frecuentes
entre creadores y usuarios es clave para gobernar con éxito su sistema de diseño.
Facilite al máximo la comunicación de usuarios y creadores. Configure un
sistema de diseño de canal Slack o Yammer, establezca horarios de oficina
regulares, asegúrese de que su software de tickets de errores ayude a facilitar la
conversación y mantenga las puertas abiertas para chats y llamadas ad hoc. Si los
usuarios se quedan atascados en algo, deben saber exactamente dónde y a quién
acudir para obtener ayuda.
Además de la conversación informal cotidiana entre creadores y usuarios, programar
reuniones periódicas del "estado de la unión" para revisar el sistema de
diseño con creadores, usuarios y otras partes interesadas clave. Discuta lo que
está funcionando, sea honesto con lo que debe mejorarse y revise las
prioridades y la hoja de ruta para asegurarse de que el sistema esté
satisfaciendo las necesidades de la empresa. Estos chequeos regulares son
especialmente útiles para mantener a las partes interesadas al día, ya que a
menudo no participan en el día a día de las operaciones del sistema de diseño.
¿Cómo se retiran los patrones antiguos?
¿Qué sucede cuando se encuentran errores?
¿Quién aprueba los cambios en el sistema de diseño?
¿Quién es responsable de mantener actualizada la documentación? ¿Quién
realiza cambios en los patrones de la interfaz de usuario del sistema? ¿Cómo se
implementan los cambios del sistema de diseño en las aplicaciones activas?
¿Cómo se enterará la gente de los cambios?
Realizar cambios en los patrones
Una parte fundamental del mantenimiento del sistema de diseño es garantizar que los
patrones de la interfaz de usuario se mantengan actualizados, adopten las mejores prácticas
de diseño y desarrollo en evolución y continúen abordando las necesidades reales de la
organización.
Desarrollar una estrategia para manejar los cambios de patrones es crucial,
por eso Inayaili de León Persson y el equipo web de Canonical gastaron

-- 153 of 178 --

---

## Sección 77: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 157

Es hora de trazar su estrategia mientras creaban el marco de interfaz de
Vanilla.
Pensamos que sería bueno documentar el proceso que debe seguir un
patrón para convertirse en un patrón Vanilla, así que después de un poco
de lluvia de ideas, creamos un diagrama que muestra los diferentes
pasos que se deben seguir antes de enviar un patrón. propuesta a su
plena aceptación como patrón de vainilla.
- Inayaili de León Persson, canónica
El resultado es un magnífico árbol de decisiones que mapea exactamente qué
procesos deben suceder para agregar un nuevo patrón al sistema de diseño.
Los tres tipos de cambios que pueden ocurrir en los patrones de un sistema de
diseño son la modificación, la adición y la eliminación.
Modificar patrones
Los patrones de la interfaz de usuario pueden y deben modificarse por varias razones:
adiciones de funciones, correcciones de errores, ajustes sutiles o importantes en el diseño
visual, mejoras de rendimiento, mejoras de accesibilidad, refactorización de código,
actualizaciones de mejores prácticas de UX, etc.
El equipo web de Canonical trazó el proceso de decisión utilizado para administrar las actualizaciones y adiciones a
los patrones en el marco de front-end de Vanilla.

-- 154 of 178 --

158 DISEÑO ATÓMICO
Los encargados del mantenimiento del sistema de diseño deben
comprender por qué y cuándo modificar los patrones, cómo realizar esos
cambios y cómo implementar esas mejoras en aplicaciones individuales.
Mantener los patrones frescos es esencial para la salud a largo plazo
del sistema de diseño. Nadie quiere usar y mantener una Web.
¡Sistema de diseño de aspecto 2.0 lleno de biseles y código crujiente!
Agregar patrones
Por muy inteligente que sea su equipo, es muy posible que no piense en todos
los patrones imaginables para incluir en su sistema de diseño desde el principio.
A medida que el sistema se aplica a más productos, inevitablemente surgirán
brechas donde las necesidades de la aplicación no se resuelven con los patrones
existentes. En tales casos, quedará claro que será necesario crear nuevos
patrones para abordar estas necesidades.
Se debe tener cuidado al agregar patrones a la biblioteca. Si cada capricho da como
resultado un patrón completamente nuevo, el sistema de diseño se convertirá en
un salvaje oeste hinchado y difícil de manejar. Vale la pena preguntarse si se trata de
una situación única o algo que se puede aprovechar en otras aplicaciones.
Quizás desee asumir una única vez hasta que un equipo diferente encuentre
un caso de uso similar. Si el equipo que trabaja en la Aplicación 2 mira la
Aplicación 1 y dice: "¡Quiero eso!" tal vez sea un buen indicador de que se
debe agregar un patrón único a la biblioteca de patrones.
Eliminar patrones
Los patrones pueden quedar obsoletos por varias razones. Quizás descubra
mediante el uso que un patrón en particular es una idea terrible. La retrospectiva
es 20/20, amigo. Quizás la industria se ha alejado de un patrón por UX o razones
técnicas. Quizás un patrón permaneció allí sin usar por ninguna aplicación
durante años. Tal vez los usuarios informaron con muchos comentarios negativos
sobre trabajar con un patrón en particular.
Tener un plan para dejar de lado los patrones es una gran idea. Pero, ¿cómo se eliminan
los patrones del sistema de diseño sin quitar la alfombra de debajo de las personas que
confían en esos patrones en sus

-- 155 of 178 --

---

## Sección 78: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 159

aplicaciones? Para abordar este problema, Salesforce creó una utilidad ordenada
llamada Sass Deprecate que marca los patrones que se dirigen al bloque de corte
en un futuro próximo. A través de un uso inteligente de las banderas variables y
el estilo de Sass, el equipo de creadores puede avisar a los usuarios de que un
patrón en particular está desaprobado y recomendar un patrón alternativo en su
lugar.
Hágalo mantenible
Con toda esta charla sobre la modificación, adición y eliminación de patrones, es
posible que se pregunte: "¿Cómo diablos se supone que nuestras aplicaciones se
mantienen al día con todos estos cambios?" Y al hacer esa pregunta, se habrá
topado con uno de los mayores desafíos que enfrentan las organizaciones para
mantener exitosamente un sistema de diseño.
La mayor amenaza existencial para cualquier sistema es la negligencia.
- Alex Schleifer, Airbnb
Muchos sistemas caen en mal estado porque el esfuerzo requerido para
realizar actualizaciones es demasiado alto. Si es difícil y requiere mucho
tiempo actualizar patrones, documentación y aplicaciones, las personas
eventualmente se sentirán tan frustradas que dejarán de hacer el
esfuerzo y el sistema de diseño comenzará a caer en el olvido.
La actualización de los patrones, la documentación y las aplicaciones de la
interfaz de usuario debe ser lo más sencilla posible. por lo que reducir esta fricción
debería convertirse en una alta prioridad para el equipo del sistema de diseño. Esto
implica una consideración cuidadosa desde el punto de vista tecnológico y del flujo de
trabajo.
En busca del santo grial
El santo grial del sistema de diseño implica la creación de un entorno en el que la
biblioteca de patrones y las aplicaciones en vivo estén perfectamente
sincronizadas. La idea es que debería poder realizar un cambio en un patrón de IU y
ver ese cambio reflejado automáticamente en la biblioteca de patrones
y en cualquier
lugar donde el patrón esté incluido en la producción.

-- 156 of 178 --

160 DISEÑO ATÓMICO
Esta técnica elimina cualquier duplicación de esfuerzo y asegura que la
biblioteca de patrones y las aplicaciones que utilizan los patrones
permanezcan sincronizadas. Suena como un sueño, ¿verdad?
Resulta que este sueño puede ser una realidad. Lonely Planet, la compañía de
guías de viajes, fue una de las primeras en establecer un sistema de diseño del
santo grial llamado Rizzo . A través de una arquitectura inteligente, crearon una
API para sus patrones de IU que se alimenta en su entorno de producción, así
como en su biblioteca de patrones. El resultado
es un sistema de diseño centralizado que garantiza que su aplicación en vivo y la
documentación permanezcan perfectamente sincronizadas.
Este enfoque no es una tarea fácil, ya que requiere una arquitectura
técnica sofisticada, personas inteligentes para configurarlo todo y una
cultura organizacional relativamente centralizada. La forma de perseguir el
santo grial, o incluso si puede lograrlo, depende de una gran cantidad de
factores, incluida la arquitectura técnica y la estructura organizativa.
El santo grial de los sistemas de diseño es un entorno en el que realizar cambios en un patrón de interfaz de
usuario actualiza simultáneamente la biblioteca de patrones y las aplicaciones de producción.

-- 157 of 178 --

---

## Sección 79: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 161

Eliminación de obstáculos técnicos
Mantener una biblioteca de patrones sincronizada con los entornos de producción
requiere compartir código de una manera inteligente, escalable y fácil de mantener.
Detallar todas las diferentes estrategias técnicas y consideraciones en torno al santo
grial requeriría su propio libro, pero cubramos algunas áreas importantes sobre cómo
mantener sincronizado el código de front-end.
El front-end de las cosas
Un sistema de diseño de IU se manifiesta como el front-end de una experiencia web,
que se compone de HTML, CSS y JavaScript. Cómo podemos introducir ese código de
front-end en un entorno de producción, con una lógica de aplicación compleja y un
código de back-end, es la tarea que tenemos entre manos.
En su artículo “ Persiguiendo el Santo Grial ”, El desarrollador web Marcelo
Somers detalla varios enfoques técnicos para lograr el santo grial. Destaca
los pros y los contras de cada estrategia para alimentar a un
Lonely Planet creó una API para sus patrones de interfaz de usuario que es consumida tanto por su biblioteca de
patrones como por su entorno de producción. Al construir su sistema de diseño de esta manera, los cambios en
los patrones de la interfaz de usuario se reflejan automáticamente tanto en la biblioteca de patrones como en el entorno de producción.

-- 158 of 178 --

162 DISEÑO ATÓMICO
diseñar el sistema en aplicaciones para mantener ambas bases de código en
sincronía. Si bien no detallaré cada una de las estrategias de Marcelo, vale la
pena señalar que hay un espectro de enfoques para elegir: copiar y pegar código
de front-end manual y crudo en un extremo, para hornear la biblioteca de
patrones directamente en el entorno de producción. en el otro.
En mi experiencia, descubrí que compartir CSS y JavaScript de presentación
con entornos de producción es relativamente fácil, mientras que compartir
marcado es difícil. Debido a que CSS y JavaScript tienden a compilarse en un
solo archivo (o quizás en un puñado de archivos), es posible colocarlos en un
CDN y luego simplemente vincularlos a esos archivos en cada aplicación.
Marcelo explica cómo hacer esto teniendo en cuenta el control de versiones:
Proporcionaría a los equipos de desarrollo una URL versionada (por
ejemplo, http://mycdn.com/1.3.5/styles.css) y la actualización es tan
simple como agregar el número de versión en la URL.
- Marcelo Somers
Compartir CSS y JavaScript está muy bien, pero donde las cosas
más complicado es cuando desea compartir marcas entre entornos. ¿Por qué?
usted pregunta. Bueno, el marcado y la lógica de back-end a menudo están
entrelazados en la base de código de una aplicación, lo que tiende a dificultar la
tarea de copiar y pegar el marcado entre la biblioteca de patrones y los entornos
de producción. Afortunadamente, hay formas de solucionar este problema.
Cerrar la brecha de marcado con lenguajes de plantillas
El uso de lenguajes de plantillas HTML (como Moustache, Handlebars, Twig,
Underscore, Jade, Nunjucks y muchos otros) hace que el marcado sea más
portátil y dinámico. Los lenguajes de plantillas separan la estructura y los
datos, y potencian nuestro HTML para evitar que tengamos que escribir los
mismos patrones de marcado una y otra vez. La buena noticia es que
muchos CMS y entornos de aplicaciones también utilizan lenguajes de
plantillas para servir el marcado de front-end.

-- 159 of 178 --

---

## Sección 80: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 163

El lenguaje de plantillas puede servir como puente entre su biblioteca
de patrones y los entornos de producción. Si usa un lenguaje de
plantillas para crear los patrones en su sistema de diseño (algo que
discutimos extensamente en el capítulo 3), puede compartir fácilmente
esos patrones con entornos de producción que utilizan el mismo motor de
plantillas.
El equipo de Phase2 Technology logró el santo grial utilizando Pattern Lab como
su herramienta de desarrollo de biblioteca de patrones y Drupal como su
sistema de gestión de contenido. Debido a que tanto Pattern Lab como Drupal
admiten el popular Ramita motor de plantillas, Phase2 puede compartir
fácilmente patrones entre los dos entornos, lo que garantiza que las bibliotecas
de patrones y las compilaciones de producción de sus clientes estén siempre en
sintonía entre sí.
Al usar el mismo motor de plantillas, junto con la ayuda del módulo
Drupal de bibliotecas de componentes, la herramienta le da a Drupal la
capacidad de incluir, extender e incrustar directamente las plantillas Twig
que Pattern Lab usa para sus componentes sin ninguna duplicación de
plantilla.
- Evan Lovely, Tecnología Phase2
Un lenguaje de plantillas como Moustache, Handlebars, Underscore, Jade y otros pueden servir como un puente que
permite que el código de front-end se comparta entre la biblioteca de patrones y la aplicación de producción.

-- 160 of 178 --

164 DISEÑO ATÓMICO
¿Es compatible tu cultura con el santo grial?
Es posible que haya leído la última sección y haya pensado: “¡Eso es asombroso!
¡Mi empresa necesita esto ahora! " Si bien los sistemas del santo grial son
realmente excelentes, hay razones por las que es posible que no pueda
mantener sincronizados automáticamente sus entornos de producción y su
biblioteca de patrones. Quizás su organización crea toneladas de productos
digitales en muchas plataformas diferentes utilizando tecnologías
tremendamente diferentes. Quizás seas una empresa multinacional gigante
diseminada por todo el mundo. Tal vez su empresa tenga una cultura autónoma
extremadamente descentralizada. O quizás eres un gobierno federal gigantesco.
El sistema de diseño del gobierno de EE. UU., Llamado Borrador de estándares digitales
web de EE. UU. - es una colección de componentes de interfaz de usuario y estilos
visuales creados para ayudar a las personas que crean sitios web gubernamentales a
crear interfaces de usuario más consistentes. El sistema de diseño proporciona marcas y
estilos para que los usuarios descarguen e incorporen a sus aplicaciones. Ciertamente
sería asombroso ver un sistema de diseño del santo grial implementado a una escala tan
gigantesca, pero como puede imaginar, es una tarea bastante difícil. La inmensidad y la
naturaleza descentralizada de la organización.
Los Borradores de los Estándares de Diseño Web de EE. UU. Son el sistema de diseño del gobierno federal de los Estados Unidos.

-- 161 of 178 --

---

## Sección 81: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 165

significa que una biblioteca de patrones sincronizados no se puede lograr sin
una reestructuración dramática de cómo se construyen los sitios web del
gobierno federal.
Si una cultura descentralizada relativamente dispersa es su realidad, ¡no se
desanime! Incluso consiguiendo
algunos El sistema de diseño implementado (un
puñado de patrones de IU de referencia, documentación útil y principios
rectores) puede mostrarle a su organización la luz que apunta hacia el grial.
Como hemos comentado a lo largo de este capítulo, estos esfuerzos deben ser
continuos y, antes de poder ejecutar, primero debe aprender a gatear.
Hágalo interdisciplinario
Las guías de estilo suelen saltar directamente a los fragmentos de código y al uso de patrones
en beneficio de los usuarios del sistema de diseño. Por supuesto, una biblioteca de patrones
debe ser útil para las personas que realmente hacen uso de los patrones, pero tratar una
guía de estilo únicamente como un recurso para desarrolladores limita su potencial.
Una guía de estilo tiene la oportunidad de servir como abrevadero para
toda la organización, ayudando a establecer un vocabulario común para
cada disciplina invertida en el éxito de los productos digitales de la
empresa. Establecer este vocabulario común puede conducir a un trabajo
más eficiente, mejor comunicación y más colaboración entre disciplinas en
toda la organización. Es por eso que la guía de estilo debe ser un lugar
atractivo para todos, no solo para los usuarios del sistema de diseño.
Coge el carrusel (¡por favor!). Este componente es sorprendentemente complejo desde
el punto de vista organizativo. Un carrusel de página de inicio en un sitio web de
comercio electrónico requiere la participación de una serie de disciplinas en toda la
organización. Los propietarios de negocios y el personal editorial deben elegir los
productos que se incluirán en el carrusel. Los redactores deben asegurarse de que la
copia sea eficaz y se mantenga dentro de las limitaciones del diseño. Los directores de
arte deben asegurarse de que el diseño estético sea agradable y que la fotografía del
producto sea legible en todos los tamaños de pantalla. Los diseñadores de UX deben
confirmar que la funcionalidad y los controles son intuitivos. La gente de front-end
debe asegurarse de que el componente responda, sea accesible y funcione. Los
desarrolladores de back-end deben asegurarse de que el componente esté
correctamente conectado al sistema de back-end. Entiendes la idea.

-- 162 of 178 --

166 DISEÑO ATÓMICO
Una guía de estilo bien elaborada puede ayudar a administrar todas estas
partes móviles y garantizar que las muchas perspectivas que influyen en cada
patrón estén debidamente documentadas en la guía de estilo. Haga que la
biblioteca de patrones sea accesible para todas las disciplinas y piense en cómo
hacerla fácil y atractiva para que diferentes disciplinas contribuyan a la
documentación.
Hágalo accesible
No debería sorprender a nadie que las personas tiendan a gravitar hacia
cosas atractivas. Una gran parte de hacer de una guía de estilo un recurso
interdisciplinario es asegurarse de que el contenedor que alberga su
biblioteca de patrones y otra documentación sea atractivo, atractivo y fácil
de navegar.
Tomarse el tiempo para crear un hogar atractivo para su guía de estilo y
documentación puede llevar a un mayor uso, ayudar a crear conciencia, ayudar a
crear una inversión organizacional y ayudar a que los no desarrolladores se fijen
en la guía de estilo. Todo esto contribuye a ese importante vocabulario
compartido que conduce a una mejor colaboración interdisciplinaria.
Pero la creación de una experiencia de guía de estilo intuitiva y de gran apariencia no
ocurre por casualidad, y esto puede ser problemático cuando se obtiene
Un carrusel de página de inicio en un sitio como Walmart requiere la participación de muchas disciplinas y
partes interesadas diferentes. Una guía de estilo puede ayudar a reunir esas diferentes perspectivas bajo un mismo techo.

-- 163 of 178 --

---

## Sección 82: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 167

una guía de estilo del suelo. Si los equipos piensan que hacer una guía de
estilo útil implica hacer algo grande y oficial con una marca personalizada
y un sitio web brillante, es posible que se vean disuadidos de iniciar la
iniciativa. Así que recuerda:
1. Haz una cosa.
2. Demuestre que es útil.
3. Hágalo oficial.
La creación de un sistema de diseño útil debería ser la primera prioridad del
equipo. Es posible que la construcción de un hogar feliz que lo contenga todo no
suceda de inmediato, pero debería convertirse en una prioridad mayor una vez
que el sistema de diseño se vuelva oficial. Hacer una guía de estilo atractiva no
es solo un diseño por el diseño; refleja el compromiso de una organización de
crear y mantener un sistema de diseño reflexivo y deliberado.
Hazlo visible
La visibilidad es de vital importancia para la salud continua de su sistema de
diseño. Un esfuerzo tan importante no debería estar escondido
La guía de estilo de Yelp tiene una portada atractiva y amigable que explica qué es el recurso, para
quién es y cómo usarlo.

-- 164 of 178 --

168 DISEÑO ATÓMICO
en un rincón oscuro de su intranet. ¿Qué pasos puede tomar para asegurarse de
que el sistema de diseño siga siendo la piedra angular de sus flujos de trabajo de
diseño y desarrollo?
Evangelismo del sistema de diseño
Puede crear la mejor guía de estilo del mundo, utilizar la tecnología más
sofisticada, tener un equipo increíble en su lugar y tener usuarios
entusiasmados, pero si no promueve activamente el sistema de diseño y
comunica los cambios, todo el esfuerzo sufrirá enormemente.
La evangelización de los esfuerzos de su sistema de diseño puede y debe suceder
incluso antes de que el sistema despegue. Al inicio de su proyecto, puede
configurar lugares para documentar el progreso del proyecto para ayudar a
generar conciencia y entusiasmo por el esfuerzo del sistema de diseño. Un cliente
mío configuró un blog interno para publicar actualizaciones del proyecto, así
como un canal de Yammer del sistema de diseño donde los desarrolladores y
otras partes interesadas pueden compartir ideas, abordar inquietudes, dar
comentarios y hacer preguntas. Establecer una cultura de comunicación al
principio del proceso aumentará la probabilidad de que el sistema de diseño eche
raíces.
Comunicando el cambio
Una vez que el sistema de diseño está despegado y se está utilizando en
aplicaciones reales, es imperativo comunicar cambios, actualizaciones y una
visión continua a toda la organización.
Las tácticas para esta comunicación pueden variar desde utilidades prácticas hasta
esfuerzos de marketing más orientados hacia el exterior. A continuación, se muestran
algunos materiales que pueden ayudar a comunicar el cambio:
ɕ Cambiar registros: "Esto es lo que ha cambiado en la biblioteca de patrones.
mes."
Mapa vial: "Esto es lo que vendrá en los próximos meses".
Historias de éxito: “Team X lanzó esta gran aplicación nueva
utilizando el sistema de diseño; lea más sobre cómo lo hicieron ".
Consejos y trucos: "A continuación, presentamos algunas recomendaciones y
consideraciones para usar los botones de nuestro sistema en toda su aplicación".
ɕ
ɕ
ɕ

-- 165 of 178 --

---

## Sección 83: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 169

Tener una base para todos estos materiales es una gran idea, y
mantenerlos adyacentes (o incluso dentro) de la guía de estilo también
tiene mucho sentido.
Los cambios, las actualizaciones y las solicitudes del sistema de diseño deben
comunicarse donde sea que esté su equipo. Eso puede incluir Slack, Basecamp,
GitHub, wikis, Yammer, listas de correo electrónico, blogs de la empresa, intranets y
cualquier otra herramienta interna que utilice su equipo para comunicarse y colaborar.
Si eso le parece mucho trabajo, ¡no tema! Mantener a su equipo y a los usuarios
actualizados no tiene por qué requerir un gran esfuerzo manual. Gracias a la naturaleza
conectada de nuestras herramientas, los equipos pueden recibir alertas
automáticamente sobre los cambios a través del software, como explica Micah Sivitz de
Shyp:
Cada vez que alguien realiza una solicitud de extracción, envía una
notificación a nuestro canal #Design slack, anunciando al equipo que hay
un cambio de propuesta y que se requieren comentarios.
- Micah Sivitz, Shyp
El equipo de diseño de materiales publica un útil registro de cambios dentro de su guía de estilo para que los
usuarios puedan conocer fácilmente las últimas actualizaciones y mejoras del sistema.

-- 166 of 178 --

170 DISEÑO ATÓMICO
Integrar esta comunicación en el flujo de trabajo diario del equipo mantiene
comprometidos a los creadores, usuarios y partes interesadas, y ayuda a tranquilizar a
los usuarios de que la biblioteca de patrones se mantiene y mejora activamente.
Capacitación y apoyo
No le daría a alguien un martillo, una sierra y un destornillador y luego diría:
“Está bien, tienes lo que necesitas; ahora ve y constrúyeme una hermosa casa
nueva ". Saber cómo utilizar correctamente una herramienta suele ser incluso
más importante que la disponibilidad de esa herramienta. La documentación en
forma de guía de estilo es sin duda útil, pero por sí sola no es suficiente. Es
esencial brindar la capacitación adecuada y ofrecer soporte continuo a los
usuarios de su sistema de diseño para garantizar que se pongan en
funcionamiento con éxito con el kit de herramientas y continúen creando un
gran trabajo con él.
La formación de los usuarios sobre cómo trabajar con el sistema de diseño puede adoptar muchas formas,
entre las que se incluyen:
ɕ Sesiones en pareja: Nada mejor que tirar de una silla y trabajar
juntos en un proyecto. Si bien requiere más tiempo que otros vehículos
de capacitación, es la mejor manera de lograr que los fabricantes y los
usuarios colaboren juntos, aprendan cómo funciona el sistema y
expongan nuevas oportunidades y deficiencias.
Talleres de trabajo: Desde sesiones inmersivas de un día completo hasta
tutoriales rápidos, es increíblemente útil configurar talleres de capacitación
cara a cara que involucren tanto a los creadores como a los usuarios. Estas
sesiones pueden ayudar a suavizar cualquier concepto erróneo sobre el
sistema, ayudar a los usuarios a subir de nivel con orientación práctica y
crear una relación saludable entre las personas a cargo del mantenimiento
del sistema y las personas a cargo de trabajar con él.
Seminarios web: Si no es posible realizar talleres o sesiones en pareja, o si necesita
capacitar a muchos usuarios a gran escala, los seminarios web pueden ser fantásticos.
Los usuarios pueden sintonizar sesiones en línea para aprender cómo usar
correctamente el sistema. Al realizar seminarios web, asegúrese de contar con suficiente
tiempo de preguntas y respuestas para responder preguntas, inquietudes y comentarios
tanto en audio como mecanografiados.
Tutoriales: Una serie de publicaciones de blog y screencasts pueden
encapsular perfectamente los conceptos básicos del trabajo con el sistema de
diseño. Estos no solo sirven como una herramienta de capacitación, sino que
también pueden servir como una gran referencia a la que volver.
ɕ
ɕ
ɕ

-- 167 of 178 --

---

## Sección 84: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 171

ɕ Inducción: Una excelente manera de inyectar su sistema de diseño en la cultura de
su empresa es incorporar la capacitación del sistema de diseño directamente en el
proceso de incorporación de nuevos empleados. Los nuevos colegas
comprenderán la importancia de la modularidad, la reutilización y todos los demás
beneficios que aporta un sistema de diseño.
Los usuarios, sin duda, tendrán preguntas o encontrarán problemas una vez que
se pongan en funcionamiento y comiencen a construir cosas con el sistema de
diseño. Necesitan saber que existe un sólido sistema de soporte para ayudar a
responder cualquier pregunta, escuchar sus requisitos y corregir errores. Existe
una gran cantidad de mecanismos para brindar apoyo a los usuarios, que
incluyen:
ɕ Seguimiento de problemas: Herramientas como JIRA y GitHub Issues son excelentes
para que los usuarios y los creadores informen de errores y mantengan
conversaciones técnicas. Los usuarios deben conocer el protocolo para la presentación
de errores y sentirse capacitados para contribuir.
Horas de oficina: Programe horarios regulares en los que el equipo del sistema de
diseño esté disponible para responder preguntas, abordar problemas y hablar sobre
lo que sigue para el sistema de diseño.
Herramientas de holgura y chat: La naturaleza en tiempo real de muchas de nuestras
herramientas de colaboración en el trabajo presenta una gran oportunidad para
mantener la conversación cargada de patrones. Gracias a herramientas como Slack,
Yammer y HipChat, los creadores y los usuarios pueden interactuar entre sí cuando y
donde sea.
Foros: Comunidades como Stack Overflow y GitHub han demostrado ser
extremadamente efectivas para permitir el apoyo de base impulsado por la
comunidad. En lugar de que los creadores de sistemas de diseño se conviertan en
un cuello de botella de soporte, puede valer la pena abrir el soporte a toda la
comunidad de usuarios.
Superar a: No todo el mundo tiene el tiempo o la personalidad para hacer
preguntas y sugerir cambios. Los creadores de sistemas de diseño deben ser
proactivos y llegar a los desarrolladores que utilizan el sistema de diseño.
para ver si tienen algún problema o inquietud. Este tipo de acciones
pueden ayudar a construir una relación genuina y positiva entre
creadores y usuarios.
ɕ
ɕ
ɕ
ɕ

-- 168 of 178 --

172 DISEÑO ATÓMICO
Gracias a herramientas como GitHub, los usuarios de sistemas de diseño no tienen que ser
relegados al papel de consumidores tontos. Las personas que usan el sistema día tras día
pueden ser contribuyentes extremadamente valiosos para el sistema de diseño si se les da la
oportunidad. Acepte el hecho de que los usuarios están ansiosos por colaborar y hacer que el
sistema sea lo mejor posible. A continuación se muestran algunas tácticas para fomentar las
contribuciones de los usuarios:
ɕ Sugerencias y solicitudes de extracción: Anime a cualquiera que use el
sistema de diseño para sugerir cambios y nuevas funciones. Mejor aún, invite a
los usuarios a enviar cambios en forma de solicitudes de extracción que se
pueden fusionar directamente en la base de código.
Entrevistas individuales y mesas redondas: Siempre es una buena
idea hablar con los usuarios, así que programe un tiempo para charlar
con las personas que están tocando estos patrones de forma regular.
Absorba todo, escuche lo bueno y lo malo, y determine colectivamente
un plan de ataque para abordar cualquier problema y sugerencia.
ɕ
El sistema Draft US Web Digital Standards rastrea los problemas usando GitHub, proporcionando un lugar para
que los usuarios y los creadores presenten errores y tengan conversaciones sobre el meollo de la cuestión.

-- 169 of 178 --

---

## Sección 85: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 173

ɕ Solicitudes de comentarios: Administrar un sistema que potencialmente se puede
implementar en cientos de aplicaciones puede resultar complicado. Antes de
apretar el gatillo en decisiones que podrían afectar a muchas personas, solicite
opiniones: "Estamos considerando desaprobar nuestro patrón de carrusel y nos
gustaría escuchar lo que piensa".
Encuestas: Si las entrevistas no son factibles, puede apoyarse en encuestas
rápidas para tener una idea de cuán efectivos son los patrones de IU y la guía
de estilo. Preguntas como “En una escala del uno al cinco, ¿qué tan útil es la
documentación del patrón? ¿Alguna sugerencia?" puede ayudar a identificar
puntos ciegos y hacer que los usuarios sugieran funciones que les facilitarían
la vida.
Reuniones periódicas del "estado de la unión": Programe reuniones
periódicas en las que el equipo del sistema de diseño discuta la hoja de ruta
del producto, las lecciones aprendidas a lo largo del camino y las
sugerencias y comentarios. Anime a todos a unirse a la reunión y asegúrese
de grabar y distribuir estas sesiones para que todos conozcan el plan
maestro.
ɕ
ɕ
Hazlo público
Comunicar el cambio, evangelizar y establecer la capacitación y el soporte
adecuados son cosas excelentes para aumentar la visibilidad de su
sistema. Pero hay otra gran oportunidad para llevar su estrategia de
comunicación a otro nivel: hacer que su guía de estilo sea accesible al
público.
¿Por qué? ¿No es una guía de estilo simplemente un recurso interno para ayudar
a las personas de su organización a trabajar mejor juntas? ¿De qué le sirve al
mundo exterior? ¿Y publicar tu guía de estilo no revelaría todos tus secretos
comerciales?
La publicación de su guía de estilo para que el mundo la vea aumenta su
visibilidad, aumenta la responsabilidad y sirve como una herramienta de
reclutamiento asombrosa.
Poner su guía de estilo detrás de un inicio de sesión o firewall reduce la
visibilidad y agrega una carga innecesaria a su equipo y socios, lo que limita la
efectividad y el potencial del recurso. Y los temores de revelar sus secretos
comerciales son completamente infundados. Estos son patrones de interfaz de
usuario, no códigos nucleares.

-- 170 of 178 --

174 DISEÑO ATÓMICO
Además de facilitar el acceso a la documentación importante, una guía
de estilo pública ayuda a crear responsabilidad organizacional.
La publicación de su guía de estilo demuestra el compromiso de su
organización con el sistema de diseño, lo que genera una presión útil
para mantenerlo como un recurso útil y actualizado.
Las guías de estilo orientadas al público también muy útil para la contratación.
Los diseñadores, desarrolladores y personas que trabajan en otras disciplinas
quieren trabajar para organizaciones que adoptan las mejores prácticas digitales
modernas y (como hemos discutido a lo largo de este libro) los sistemas de diseño
se están convirtiendo rápidamente en una mejor práctica para toda la industria. La
publicación de su guía de estilo envía una fuerte Bat-Señal que
puede atraer a personas apasionadas y con mentalidad de patrones. Por ejemplo, la
experta en guías de estilo Jina Bolton se incorporó a Salesforce después de ver la guía
de estilo de la empresa para su producto Salesforce1.
Cuando vi [la guía de estilo de Salesforce] pensé que era hermosa y
por eso quería unirme a este equipo.
- Jina Bolton
Styleguides.io reúne más de 150 guías de estilo para el público de organizaciones de todo el mundo.

-- 171 of 178 --

---

## Sección 86: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 175

Desde que se unió a Salesforce, ayudó a crear el exitoso Lightning Design
System y ayuda a administrar su creciente equipo de sistemas de diseño.
La historia de Jina no es aislada; Casi todos los invitados que Anna
Debenham y yo entrevistamos en el Podcast de guías de estilo
discutieron lo útil que fue su biblioteca de patrones de cara al público para atraer
talento. Todo eso significa que su guía de estilo pública hace que su organización
más
competitivo, no menos.
Hazlo más grande
Una biblioteca de patrones visible, interdisciplinaria y accesible es aquella a
la que su equipo volverá una y otra vez. Úsalo a tu favor. Dado que los ojos
del equipo ya están fijos en ese recurso, existe una gran oportunidad de
ampliarlo para incluir otra documentación útil como la voz y el tono, la
marca, el código, los principios de diseño y las pautas de redacción que
discutimos en Capítulo 1 .
Ahora, es posible que su organización no necesite implementar todos los tipos de
guías de estilo que existen, pero el punto es que La creación de un centro de guías
de estilo centralizado genera una mayor conciencia de las mejores prácticas, lo
que aumenta la eficacia de la documentación.
El sistema de diseño Harmony de Intuit incluye una biblioteca de patrones, principios de diseño, voz y tono,
pautas de marketing y más. Alojar esta útil documentación bajo un mismo techo ayuda a aumentar su visibilidad y
eficacia.

-- 172 of 178 --

176 DISEÑO ATÓMICO
Otra forma de ampliar la funcionalidad de la biblioteca de patrones es incluir pautas
para los patrones de la plataforma nativa junto con los patrones basados en la web.
Podemos mirar al sistema de diseño Harmony de Intuit una vez más para ver un ejemplo
de cómo los patrones de plataforma móvil nativa para iOS y Android pueden vivir junto a
sus contrapartes basadas en la web.
Hágalo independiente del contexto
La forma en que se nombran los patrones de la interfaz de usuario indudablemente
determinará cómo se utilizan. Cuanto más agnósticos son los nombres de los patrones,
más versátiles y reutilizables se vuelven.
Debido a que tendemos a establecer patrones de IU en el contexto de una página más
amplia, puede ser tentador nombrar los componentes según el lugar donde viven. Pero
en lugar de nombrar su componente "carrusel de la página de inicio" (perdone mi
obsesión mórbida con los carruseles), simplemente puede llamarlo "carrusel", lo que
significa que ahora puede poner carruseles en todas partes. (Pero por el amor de todo
lo que es santo, por favor no lo hagas).
Otro desafío para nombrar
monitor patrones es que tendemos a distraernos con los
contenido
patrones que viven dentro de ellos. Por ejemplo, si trabaja en un sitio de comercio
electrónico, puede tener la tentación de llamar a un bloque que contiene una imagen
de producto y un título como "tarjeta de producto".
La biblioteca de patrones Harmony de Intuit incluye botones para cambiar entre web, iOS y Android para cada
patrón. Esto permite al equipo mantener un sistema de diseño mayoritariamente consistente en todas las
plataformas, pero también documentar las divergencias de patrones cuando ocurren.

-- 173 of 178 --

---

## Sección 87: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 177

Pero nombrar las cosas de esta manera limita inmediatamente qué tipo de contenido
puede vivir dentro de él. Al nombrar el patrón simplemente "tarjeta", puede poner todo
tipo de patrones de contenido en su interior: productos, promociones, ubicaciones de
tiendas, etc.
Advertencia justa: nombrar cosas es realmente difícil. Pero existen estrategias
que le ayudarán a crear nombres sólidos para sus patrones. Realización de un
inventario de interfaz ( como se detalla en el capítulo 4 ) ayuda a eliminar patrones
del contexto de la página donde residen normalmente, lo que significa que su
equipo puede crear nombres que no se distraigan con su contexto. He realizado
ejercicios de nomenclatura con equipos en los que hemos difuminado el
contenido que reside dentro de un patrón para que todos puedan concentrarse
en el patrón.
estructura en lugar del
contenido que vive en su interior.
Si bien nombrar cosas siempre será un desafío, los nombres de patrones que son
independientes del contexto y el contenido serán más portátiles, reutilizables y
versátiles.
Hazlo contextual
Mostrar patrones de IU en una biblioteca de patrones está muy bien, pero necesita
demostrar el contexto para que los usuarios del sistema de diseño comprendan
cómo y dónde usarlos correctamente. La mayoría de los patrones
Un buen ejercicio al nombrar patrones es difuminar el contenido para que sus nombres reflejen las estructuras de
los patrones en lugar del contenido que vive dentro de ellos.

-- 174 of 178 --

178 DISEÑO ATÓMICO
las bibliotecas muestran una demostración de cada patrón de interfaz de usuario, pero como
hemos comentado, esos patrones no viven en el vacío. ¿Dónde se utilizan exactamente estos
patrones?
Una forma de demostrar el contexto podría incluir mostrar capturas de
pantalla o videos de un componente en acción. La documentación de
Material Design hace un trabajo fantástico en esto; cada componente es
rico en fotos, videos y detalles de uso para brindar a los usuarios una
comprensión clara de cómo se ven estos patrones en el contexto de una
aplicación y demostrar cómo se debe usar cada patrón.
Otra forma de mostrar el contexto es proporcionar información de linaje para
cada patrón. Como discutimos en el Capítulo 3, una herramienta como Pattern
Lab genera automáticamente esta información, lo que le permite ver qué
patrones componen un componente dado, además de mostrar dónde se emplea
cada componente. Esto proporciona una especie de rastro de papel de patrón
que ayuda enormemente con los esfuerzos de control de calidad, ya que resalta
exactamente qué patrones y plantillas deberían probarse si se hicieran cambios
en un patrón en particular.
La biblioteca de componentes de Material Design no solo contiene un ejemplo de cada componente;
documenta a fondo el uso del componente con muchas imágenes y videos para respaldarlo.

-- 175 of 178 --

Haz que dure
Hacer un sistema de diseño es un esfuerzo increíble e importante. Pero
sin el mantenimiento adecuado, el valor de su sistema de diseño se
depreciará como un automóvil que acaba de salir del concesionario. En
cambio, su sistema de diseño debe ser como una botella de buen vino
que aumenta de valor con el tiempo.

---

## Sección 88: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 179

Herramientas como Pattern Lab brindan información sobre el linaje, lo que permite a los equipos ver qué
componentes más pequeños se incluyen en un componente determinado, así como dónde se usa cada patrón.

-- 176 of 178 --

180 DISEÑO ATÓMICO
Como hemos comentado a lo largo de este capítulo, hacer que su sistema
de diseño resista la prueba del tiempo requiere una cantidad significativa
de tiempo y esfuerzo. ¿Pero no es así con todos los seres vivos? Los
animales necesitan comer y las plantas necesitan agua y luz solar para
sobrevivir. Crear un sistema de diseño vivo significa prestarle atención y
cuidado para que siga prosperando.
Todo ese esfuerzo no solo crea un mejor regalo para su organización, sino que lo
prepara para el éxito a largo plazo. Establecer un plan de gobierno claro,
comunicar el cambio e implementar los otros consejos que se encuentran en este
capítulo ayuda a que el sistema de diseño se arraigue y se convierta en una parte
integral del flujo de trabajo de su organización. Crear la maldita cosa en primer
lugar es la parte difícil, pero una vez establecida, tienes una base sólida sobre la
que construir en los próximos años. Incluso si tuviera que quemar todo y
reconstruir un nuevo sistema desde cero, encontrará que sus interfaces de
usuario seguirán necesitando botones, campos de formulario, pestañas y otros
componentes existentes. Y necesitará un hogar feliz para mostrar y documentar
el sistema. ¡No tires al bebé con el agua de la bañera!
Con el mantenimiento adecuado, su sistema de diseño debería aumentar de valor con el tiempo, como una botella
de buen vino, en lugar de un automóvil usado que acaba de salir del lote. Credito de imagen: Sabin Paul Croce en
Flickr y Ray Larabie en Flickr

-- 177 of 178 --

---

## Sección 89: CAPÍTULO 5 / MANTENIMIENTO DE LOS SISTEMAS DE DISEÑO 181

Así que ahí lo tienes. Para crear un sistema de diseño que se pueda
mantener, debe:
ɕ Hágalo oficial asignando tiempo real, dinero y recursos a
su sistema de diseño.
Hágalo adaptable contando con el cambio y estableciendo un plan
de gobernanza claro.
Hágalo mantenible buscando el santo grial y facilitando la
implementación y comunicación de cambios en el sistema de diseño.
Hágalo interdisciplinario Al hacer de su biblioteca de patrones un
abrevadero, toda la organización puede reunirse.
Hágalo accesible haciendo una guía de estilo atractiva y fácil de
usar con documentación adjunta útil.
Hazlo visible comunicando el cambio, evangelizando el sistema de
diseño y haciéndolo público.
Hazlo más grande al incluir marca, voz y tono, código, principios de
diseño y pautas de redacción.
Hazlo agnóstico nombrando patrones de acuerdo con su
estructura en lugar de su contexto o contenido.
Hazlo contextual demostrando qué patrones componen un patrón en
particular y mostrando dónde se usa cada patrón.
Haz que dure colocando una base sólida sobre la que construir en los
próximos años.
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
ɕ
Ve y sé atómico
Tenemos la tarea de hacer que una gran cantidad de productos, sitios y
aplicaciones funcionen y se vean geniales en una increíble variedad de diferentes
dispositivos, tamaños de pantalla, factores de forma y entornos. Espero que los
conceptos cubiertos en este libro le brinden una base sólida en la que pararse
mientras aborda con valentía este panorama digital cada vez más diverso. Al crear
sistemas de diseño, ser deliberado en cómo construye interfaces de usuario,
establecer un flujo de trabajo colaborativo y basado en patrones y configurar
procesos para mantener con éxito su sistema de diseño, espero que usted y su
equipo puedan crear grandes cosas juntos. ¡Avanza y sé atómico!

-- 178 of 178 --
