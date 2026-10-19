**Alcance:** Libro completo Código Limpio (Robert C. Martin): principios de código limpio, funciones cohesivas, nombres semánticos, manejo de errores y refactorización. (Fuente migrada y curada desde Centinela Studio Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

---
titulo: "Código Limpio: Manual de estilo para el desarrollo ágil de software"
autor: "Robert C. Martin (Uncle Bob)"
dominio: "Funciones Pequeñas, Nombres Claros y Cero Duplicación"
tipo: "libro_tecnico_completo"
paginas_originales: 644
secciones_totales: 159
fecha_ingesta: "2026-10-06T02:43:32.231Z"
---

# 📖 Código Limpio: Manual de estilo para el desarrollo ágil de software
**Autor:** Robert C. Martin (Uncle Bob) | **Dominio:** Funciones Pequeñas, Nombres Claros y Cero Duplicación | **Páginas originales:** 644

> **Nota de Arquitectura Centinela:** Este documento contiene el texto íntegro estructurado por secciones y capítulos para consulta profunda del equipo de agentes y búsqueda híbrida (BM25 + semántica).

---

## [Sección 1] Introducción y Fundamentos

-- 1 of 644 --

Cada año, se invierten innumerables horas y se pierden numerosos
recursos debido a código mal escrito, ralentizando el desarrollo,
disminuyendo la productividad, generando graves fallos e incluso
pudiendo acabar con la organización o empresa.
El reconocido experto de software Robert C. Martin, junto con sus
colegas de Object Mentor, nos presentan sus óptimas técnicas y
metodologías ágiles para limpiar el código sobre la marcha y crearlo
de forma correcta, de este modo mejorará como programador.
Esta obra se divide en tres partes. La primera describe los principios,
patrones y prácticas para crear código limpio. La segunda incluye
varios casos de estudio cuya complejidad va aumentando. Cada
ejemplo es un ejercicio de limpieza y transformación de código con
problemas. La tercera parte del libro contiene una lista de heurística y
síntomas de código erróneo (smells) confeccionada al crear los casos
prácticos. El resultado es una base de conocimientos que describe
cómo pensamos cuando creamos, leemos y limpiamos código.
Imprescindible para cualquier desarrollador, ingeniero de software,
director de proyectos, jefe de equipo o analista de sistemas
interesado en crear código de mejor calidad.
¡El libro que todo programador debe leer!
-- 2 of 644 --

Robert Cecil Martin
Código limpio
Manual de estilo para el desarrollo ágil de software
ePub r1.1
XcUiDi 21.03.2018
-- 3 of 644 --

Título original: Clean code: A handbook of agile software craftsmanship
Robert Cecil Martin, 2009
Traducción: José Luis Gómez Celador
Ilustraciones: Jeniffer Kohnke & Angela Brooks
Editor digital: XcUiDi
Colaborador: Mario J. C. (PDF-Español)
ePub base r1.2
Este libro se ha maquetado siguiendo los estándares de calidad de
www.epublibre.org. La página, y sus editores, no obtienen ningún tipo de
beneficio económico por ello. Si ha llegado a tu poder desde otra web debes saber
que seguramente sus propietarios sí obtengan ingresos publicitarios mediante
archivos como este
-- 4 of 644 --

Para Ann Marie: El verdadero amor de mi vida.
-- 5 of 644 --

Agradecimientos
Me gustaría dar las gracias a mis dos artistas, Jeniffer Kohnke y Angela
Brooks. Jennifer es la encargada de las impresionantes ilustraciones del inicio
de cada capítulo y también de los retratos de Kent Beck, Ward Cunningham,
Bjarne Stroustrup, Ron Jeffries, Grady Booch, Dave Thomas, Michael
Feathers y el mío propio.
Angela se encarga de las ilustraciones internas de los capítulos. Ha
realizado muchos dibujos para mí en los últimos años, incluidos muchos de
los del libro Agile Software Development: Principles, Patterns, and
Practices. También es mi primogénita.
Un agradecimiento especial a los revisores Bob Bogetti, George Bullock,
Jeffrey Overbey y especialmente Matt Heusser. Han sido increíbles. Han sido
inmisericordes. Han sido minuciosos. Me han forzado al máximo para
realizar las mejoras necesarias.
Gracias a mi editor, Chris Guzikowski, por su apoyo, aliento y amistad.
Gracias a todo el personal de la editorial, incluida Raina Chrobak, que se
encargó de que fuera honesto y cumpliera los plazos.
Gracias a Micah Martin y a todos los de 8th Light (www.8thlight.com)
por sus críticas y su apoyo.
Gracias a todos los Object Mentor, pasados, presentes y futuros, incluidos
Bob Koss, Michael Feathers, Michael Hill, Erik Meade, Jeff Langr, Pascal
Roy, David Farber, Brett Schuchert, Dean Wampler, Tim Ottinger, Dave
Thomas, James Grenning, Brian Button, Ron Jeffries, Lowell Lindstrom,
Angelique Martin, Cindy Sprague, Libby Ottinger, Joleen Craig, Janice
-- 6 of 644 --

Brown, Susan Rosso y el resto.
Gracias Jim Newkirk, mi amigo y socio, que me ha enseñado más de lo
que cree. Mi agradecimiento a Kent Beck, Martin Fowler, Ward
Cunningham, Bjarne Stroustrup, Grady Booch y todos mis mentores,
compatriotas y colegas. Gracias a John Vlissides por estar ahí cuando lo
necesitaba. Gracias a todos los de Zebra por permitirme despotricar sobre la
extensión que debe tener una función.
Y, por último, darle las gracias por leer estos agradecimientos.
-- 7 of 644 --

---

## [Sección 2] Introducción y Fundamentos

Prólogo
Una de nuestras golosinas preferidas en Dinamarca es Ga-Jol, con un fuerte
sabor a regaliz, que constituye un complemento perfecto para nuestro
húmedo y frío clima. Parte del encanto de Ga-Jol para los daneses es la frase
que suele incluir en el envoltorio. Esta mañana compré un paquete de dos y
me encontré con este antiguo dicho danés:
Ærlighed i små ting er ikke nogen lille ting.
«La honestidad por las cosas pequeñas no es algo menor». Perfecto para
que lo que pensaba escribir. Las cosas pequeñas importan. Este libro trata
sobre humildes preocupaciones cuyo valor dista mucho de ser menor.
-- 8 of 644 --

Dios está en los detalles, afirmó el arquitecto Ludwig mies van der Rohe.
Esta cita recuerda argumentos contemporáneos sobre el papel de la
arquitectura en el desarrollo de software, en especial en el universo ágil. Bob
y yo hemos tenido esta conversación muchas veces. Y sí, mies van der Rohe
se fijaba en la utilidad y la forma atemporal de la construcción que subyace a
las grandes creaciones arquitectónicas. Por otra parte, seleccionaba
personalmente los pomos de todas las puertas de todas las casas que diseñaba.
¿Por qué? Porque las cosas pequeñas importan.
En nuestro interminable debate sobre TDD, Bob y yo coincidimos en que
la arquitectura del software desempeña una importante labor en el desarrollo,
aunque tenemos diferentes visiones de lo que esto significa. Estas diferencias
carecen de importancia, ya que podemos aceptar que los profesionales
responsables dedican parte de su tiempo a planificar un proyecto antes de
comenzarlo. Las nociones de diseño controlado únicamente por pruebas y el
código, propias de finales de la década de 1990, ya no son válidas. Y la
atención al detalle es un pilar fundamental de los profesionales, casi como
cualquier visión. Por un lado, la práctica en los detalles otorga dominio a los
profesionales, y aumenta su confianza para la práctica a mayor escala. Por
otra parte, el más mínimo fallo de construcción, una puerta que no cierre bien
o un baldosín mal colocado, acaba con el encanto del todo. De eso se trata el
código limpio.
Pero la arquitectura es sólo una metáfora del desarrollo de software y en
concreto de la parte del software que ofrece el producto inicial, de la misma
forma que un arquitecto entrega un edificio inmaculado. Hoy en día, el
objetivo es comercializar rápidamente los productos. Queremos que las
fábricas produzcan software a pleno rendimiento. Se trata de fábricas
humanas, programadores que piensan, que sienten y que trabajan para crear
un producto. La metáfora de la manufacturación es incluso más evidente en
este pensamiento. Los aspectos productivos de las fábricas de automóviles
japonesas fueron una gran inspiración para Serum.
Pero incluso en la industria automovilística, gran parte del trabajo no
radica en la fabricación sino en el mantenimiento, o más bien en cómo
evitarlo. En el software, el 80 por 100 o más de lo que hacemos se denomina
cuantitativamente mantenimiento, el acto de reparar. En lugar de optar por la
-- 9 of 644 --

típica costumbre occidental de crear software de calidad, debemos pensar
como reparadores o mecánicos. ¿Qué piensan los directores japoneses de
todo esto?
En 1951, un enfoque de calidad denominado TPM (Total Productive
Maintenance o Mantenimiento productivo total) apareció en escena. Se
centraba en el mantenimiento y no en la producción. Uno de los pilares de
TPM es el conjunto de principios denominados 5S, una serie de disciplinas.
Estos principios 5S son en realidad la base Lean, otro conocido término en la
escena occidental, y cada vez más presente en el mundo del software. Estos
principios no son opcionales. Como indica Uncle Bob, la práctica del
software correcto requiere disciplina. No siempre se trata de hacer, de
producir a la velocidad óptima.
La filosofía 5S incluye estos conceptos:
Seiri u organización: Es fundamental saber dónde están las cosas,
mediante enfoques como el uso de nombres correctos. ¿Cree que los
nombres de los identificadores no son relevantes? Lea los siguientes
capítulos.
Seiton o sistematización: Existe un antiguo dicho norteamericano: un
sitio para cada cosa y cada cosa en su sitio. Un fragmento de código
debe estar donde esperamos encontrarlo; en caso contrario, refactorice
hasta conseguirlo.
Seiso o limpieza: Mantenga limpio el lugar de trabajo. ¿Qué dicen los
autores sobre inundar el código de comentarios y líneas que capturan
historias o deseos futuros? Elimínelos.
Seiketsu o estandarización: El grupo decide cómo mantener limpio el
lugar de trabajo. ¿Cree que este libro habla sobre tener un estilo de
código coherente y una serie de prácticas dentro del grupo? ¿De dónde
provienen esos estándares? Siga leyendo.
Shutsuke o disciplina: Significa ser disciplinado en la aplicación de las
prácticas y reflejarlas en el trabajo y aceptar los cambios.
Si acepta el reto, ha leído bien, el reto, de leer y llevar a la práctica este
libro, podrá comprender y apreciar el último punto. Aquí nos acercamos a la
-- 10 of 644 --

---

## [Sección 3] Introducción y Fundamentos

raíz de la profesionalidad responsable de una profesión que debería
preocuparse del ciclo vital de un producto. Al igual que mantenemos coches
y otras máquinas, el mantenimiento divisible, esperar a que surjan los errores,
es la excepción. Por el contrario, ascendemos un nivel: inspeccionamos
diariamente las máquinas y arreglamos los componentes gastados antes de
que se rompan, o cambiamos el aceite cada varios miles de kilómetros para
evitar problemas. En el código, debemos refactorizar sin compasión. Puede
ascender otro nivel más, como hizo el movimiento TPM hace 50 años: crear
máquinas que se pueden mantener mejor. Crear código legible es tan
importante como crear código ejecutable. La práctica definitiva, que apareció
en los círculos TPM en 1960, es la que se centra en introducir nuevas
máquinas o sustituir las antiguas. Como Fred Brooks nos advirtió,
deberíamos rehacer el software cada siete años para eliminar los problemas
latentes. Tendríamos que actualizar este plazo por semanas, días e incluso
horas en lugar de años. Ahí es donde se encuentra el detalle.
El detalle tiene un gran poder, y es un enfoque vital humilde y profundo,
como es de esperar de cualquier enfoque de origen japonés. Pero no es sólo la
visión oriental de la vida; también lo encontramos en el pueblo
norteamericano. La cita seiton anterior proviene de la pluma de un ministro
de Ohio que, literalmente, consideraba la limpieza como un remedio para
todas las formas del mal. ¿Y seiso? La limpieza es la pureza. Aunque una
casa sea bella, el mobiliario inadecuado acaba con su encanto. ¿Y la opinión
de shutsuke al respecto? El que confíe en lo pequeño confiará en lo superior.
¿Y la predisposición a refactorizar en el momento adecuado, reforzando
nuestra posición para las posteriores grandes decisiones, en lugar de dejarlo
pasar? Una puntada a tiempo ahorra ciento. Al que madruga, Dios le ayuda.
No dejes para mañana lo que puedas hacer hoy (éste era el sentido original
de la frase «en el momento adecuado» de Lean hasta que cayó en manos de
consultores de software). ¿Y sobre calibrar la importancia de los pequeños
esfuerzos individuales en un todo mayor? De pequeñas semillas crecen
grandes árboles. ¿Y la integración de sencillas tareas preventivas en la vida
diaria? Más vale prevenir que curar. El código limpio honra las raíces de la
sabiduría popular, de antes o de ahora, y se puede aplicar con atención al
detalle.
-- 11 of 644 --

Incluso en la literatura arquitectónica encontramos ejemplos de estos
detalles. Piense en los pomos de mies van der Rohe. Eso es seiri. Es la
atención a todos los nombres de variables. Debe bautizar a una variable con
el mismo cuidado como si fuera su primogénito.
Y como todo sabemos, este cuidado no acaba nunca. El arquitecto
Christopher Alexander, padre de patrones y lenguajes de patrones, considera
todo acto de diseño como un pequeño acto local de reparación, y considera la
maestría de la estructura como competencia única del arquitecto; las formas
mayores se ceden a los patrones y su aplicación a los habitantes. El diseño es
interminable no sólo al añadir una nueva habitación a una casa, sino al prestar
atención a la pintura, a cambiar las alfombras o a instalar un nuevo fregadero
en la cocina. Otras artes muestran sentimientos análogos. En nuestra
búsqueda por la importancia de los detalles, nos topamos con el autor francés
del siglo XIX Gustav Flaubert. El poeta francés Paul Valery afirma que un
poema no se acaba nunca y que tiene que retocarse continuamente, y que
dejar de trabajar en el poema es señal de abandono. Tal preocupación por el
detalle es común en todas las empresas de excelencia. Puede que esto no sea
nada nuevo, pero al leer este libro sentirá la necesidad de adoptar disciplinas
rechazadas en su momento por apatía o por un deseo de espontaneidad o una
simple respuesta al cambio.
Desafortunadamente, no solemos considerar estas preocupaciones la
clave del arte de la programación. Renunciamos pronto a nuestro código, no
porque lo hayamos completado, sino porque nuestro sistema de valores se
centra en el futuro más que en la sustancia de nuestros productos.
Esto tiene un precio final: hierba mala nunca muere. La investigación, ni
en el mundo industrial ni en el académico, se reduce a mantener limpio el
código. Cuando trabajaba en la organización Bell Labs Software Production
Research (sin duda de producción) comprobamos que un estilo de sangrado
coherente era uno de los mayores indicadores estadísticamente significativos
de una baja densidad de errores. Queremos que una arquitectura, un lenguaje
de programación u otra noción superior sea el motivo de la calidad; como
seres cuya supuesta profesionalidad se debe al dominio de herramientas y
métodos de diseño, nos sentimos insultados por el valor que los
programadores añaden con tan sólo aplicar un estilo de sangrado coherente.
-- 12 of 644 --

---

## [Sección 4] Introducción y Fundamentos

Para citar mi propio libro de hace 17 años, dicho estilo distingue la excelencia
de la simple competencia. La visión japonesa comprende el verdadero valor
del trabajador cotidiano y, en especial, de los sistemas de desarrollo que
dependen de las sencillas acciones diarias de tales trabajadores. La calidad es
el resultado de un millón de acciones cuidadosas, no de un método magnífico
caído del cielo. Que dichas acciones sean simples no significa que sean
simplistas, y mucho menos que sean sencillas. Son la base de la grandeza y,
cada vez más, de cualquier empresa humana. Ignorarlas no es humano en
absoluto.
Evidentemente, todavía defiendo el pensamiento global, en especial el
valor de los enfoques arquitectónicos cimentados en el conocimiento de los
dominios y la capacidad de uso del software. Este libro no versa sobre esto, al
menos no de forma evidente. Este libro transmite un mensaje más sutil cuya
profundidad no debe menospreciarse. Coincide con la visión de gente como
Peter Sommerlad, Kevlin Henney y Giovanni Asproni, cuyos mantras son
«El código es el diseño» y «Código simple». Aunque debemos recordar que
la interfaz es el programa y que sus estructuras dicen mucho sobre la propia
estructura del programa, es fundamental adoptar de forma continuada la
humilde posición de que el diseño vive en el código. Y aunque los cambios y
la metáfora de la fábrica supongan costes, los cambios de diseño suponen
valor. Debemos considerar al código como la articulación de los esfuerzos de
diseño, visto como un proceso, no como algo estático. Es en el código donde
se desarrollan los conceptos arquitectónicos de conexión y cohesión. Si
escucha a Larry Constantine describir la conexión y la cohesión, lo hace en
términos del código, no desde conceptos abstractos propios de UML. En su
ensayo Abstraction Descant, Richard Gabriel afirma que la abstracción es el
mal. El código es el remedio al mal y el código limpio puede que sea divino.
Volviendo a mi caja de Ga-Jol, considero importante recordar que la
sabiduría danesa nos recomienda no sólo prestar atención a las pequeñas
cosas, sino también ser honestos con ellas. Esto significa ser honesto con el
código, con nuestros colegas sobre el estado del código y, en especial, con
nosotros mismos. ¿Hemos hecho todo lo posible para dejar las cosas mejor
que como las encontramos? ¿Hemos refactorizado el código antes de
terminarlo? No se trata de preocupaciones periféricas, sino que se encuentran
-- 13 of 644 --

en la base misma de los valores Agile. En Serum se recomienda que la
refactorización sea parte del concepto de Terminado. Ni la arquitectura ni el
código limpio insisten en la perfección, sino en la honestidad y en hacerlo lo
mejor posible. Errar es humano; perdonar es divino. En Serum, todo lo
hacemos de forma visible. Aireamos los trapos sucios. Somos honestos sobre
el estado de nuestro código ya que nunca es perfecto. Nos hemos hecho más
humanos, más merecedores de lo divino y estamos más próximos a la
grandeza de los detalles.
En nuestra profesión, necesitamos desesperadamente toda la ayuda
posible. Si un suelo seco reduce el riesgo de resbalones y las herramientas
bien organizadas aumentan la productividad, es nuestra meta. Y en cuanto al
libro, es la mejor aplicación pragmática de los principios Lean de software
que he visto nunca en formato impreso. No esperaba menos de este grupo de
individuos que durante años se han esforzado no sólo por mejorar sino en
ofrecer sus conocimientos a la industria mediante obras como la que ahora
tiene entre manos. Hace que el mundo sea un poco mejor que antes de que
Uncle Bob me enviara el manuscrito.
Y tras completar este ejercicio, me dispongo a limpiar mi escritorio.
James O. Coplien
Mørdrup, Dinamarca
-- 14 of 644 --

Introducción
Reproducido con permiso de Thom Holwerda.
http://www.osnews.com/story/19266/WTFs_m. © 2008 Focus Shift.
¿Qué puerta representa su código? ¿Qué puerta representa a su equipo o a su
-- 15 of 644 --

empresa? ¿Por qué estamos en esa habitación? ¿Es una sencilla revisión del
código o hemos detectado un sinfín de problemas terribles? ¿Depuramos
presas del pánico el código que pensábamos que funcionaba? ¿Los clientes
huyen despavoridos y los directores nos pisan los talones? ¿Cómo
asegurarnos de que abrimos la puerta correcta cuando las cosas se ponen
feas? La respuesta: la maestría.
La maestría se consigue de dos formas: conocimientos y trabajo. Debe
adquirir el conocimiento de los principios, patrones, prácticas y heurística
propios de un maestro, y dominar dichos conocimientos a través de la
práctica.
Puedo enseñarle la teoría de montar en bicicleta. De hecho, los conceptos
matemáticos clásicos son muy sencillos. Gravedad, fricción, velocidad
angular, centro de masa, etc., se pueden demostrar en menos de una página
repleta de ecuaciones. Con esas fórmulas, puedo demostrar que montar en
bicicleta es práctico y proporcionarle los conocimientos necesarios para
conseguirlo. Pero la primera vez que se monte en una bici se caerá al suelo.
El diseño de código no es diferente. Podríamos enumerar todos los
principios del código limpio y confiar en que se encargue del resto (es decir,
dejar que se cayera de la bici) pero entonces la pregunta sería qué clase de
profesores somos y qué clase de alumno sería.
No. Así no funciona este libro.
Aprender a crear código limpio es complicado. Requiere algo más que
conocer principios y patrones. Tiene que sudar. Debe practicarlo y fallar.
Debe ver cómo otros practican y fallan. Debe observar cómo se caen y
recuperan el paso. Debe ver cómo agonizan en cada decisión y el precio que
pagan por tomar decisiones equivocadas.
Para leer este libro, prepárese a trabajar duro. No es un libro que se pueda
leer en un avión y terminarlo antes de aterrizar. Este libro le hará trabajar, y
mucho. ¿Y qué tipo de trabajo? Tendrá que leer código, en abundancia. Y se
le pedirá que piense en qué acierta el código y en qué falla. Se le pedirá que
siga nuestras descripciones mientras despedazamos módulos y los volvemos
a ensamblar. Para ello necesitará tiempo y esfuerzo, pero creemos que merece
la pena.
Hemos dividido el libro en tres partes. Los primeros capítulos describen
-- 16 of 644 --

---

## [Sección 5] Introducción y Fundamentos

los principios, patrones y prácticas para crear código limpio. Incluyen
abundante código y resultan difíciles de leer. Sirven como preparación a la
segunda parte. Si abandona tras leer la primera sección, que tenga buena
suerte.
La segunda parte del libro es la más difícil. Incluye varios casos de
estudio cuya complejidad va aumentando. Cada ejemplo es un ejercicio de
limpieza de código, transformar código con problemas para que tenga menos
problemas. El detalle de esta parte es abundante. Tendrá que alternar entre el
texto y los listados de código. Tendrá que analizar y entender el código, y
comprender el razonamiento de cada cambio realizado. Piense en que esta
parte le llevará varios días.
La tercera parte del libro es un único capítulo que contiene una lista de
heurística y síntomas de código erróneo (smells) confeccionada al crear los
casos prácticos. Al analizar y limpiar el código de los ejemplos,
documentamos el motivo de todas nuestras acciones como heurística o
síntoma. Intentamos comprender nuestras reacciones al código que leíamos y
modificábamos, y nos esforzamos por capturar las sensaciones que tuvimos y
las decisiones que adoptamos. El resultado es una base de conocimientos que
describe cómo pensamos cuando creamos, leemos y limpiamos código.
Esta base de conocimientos no le servirá de mucho si no lee atentamente
los casos de la segunda parte del libro. En esos capítulos hemos anotado con
precisión todos los cambios realizados con referencias a la heurística. Estas
referencias se muestran entre corchetes, como [H22]. De este modo puede ver
el contexto en el que se ha aplicado y creado dicha heurística. No importa
tanto el propio valor de las heurísticas sino la relación entre ellas y las
decisiones adoptadas al limpiar el código en los ejemplos.
Si lee la primera y la tercera parte y se salta los casos prácticos, habrá
leído otro libro distinto sobre cómo crear código correcto, pero si dedica
tiempo a analizar los casos, sigue todos y cada uno de los pasos, cada una de
las decisiones, si se pone en nuestro lugar y se obliga a pensar tal y como lo
hicimos nosotros, entonces comprenderá mucho mejor todos los principios,
patrones, prácticas y heurística. Ya no será un conocimiento superficial. Se
convertirá en algo profundo. Lo integrará de la misma forma que una
bicicleta se convierte en una extensión propia una vez dominada la forma de
-- 17 of 644 --

montar.
-- 18 of 644 --

Sobre la imagen de cubierta
La imagen de la portada es M104: la Galaxia del Sombrero. M104 se
encuentra en Virgo, a unos 30 millones de años luz, y su núcleo es un súper
agujero negro que pesa aproximadamente mil millones de masas solares.
¿La imagen le recuerda la explosión de la luna Praxis de Klingon?
Recuerdo la escena de Star Trek VI en la que se mostraba un anillo de restos
flotando tras la explosión. Tras esa escena, el anillo se ha convertido en un
elemento habitual de las explosiones de ciencia ficción. Incluso se añadió a la
explosión de Alderaan en ediciones posteriores de la primera película de La
Guerra de las Galaxias.
¿Qué provocó la formación de este anillo alrededor de M104? ¿Por qué
tiene un centro de tales dimensiones y un núcleo tan brillante y diminuto?
Parece como si el agujero negro central hubiera provocado un orificio de
30 000 años luz en el centro de la galaxia. La desgracia caería sobre las
civilizaciones que se encontraran en el camino de este desastre cósmico.
Los súper agujeros negros desayunan estrellas y convierten parte de su
masa en energía. E=MC2 puede bastar, pero cuando M es una masa estelar
hay que tener cuidado. ¿Cuántas estrellas habrá engullido este monstruo antes
de saciar su apetito? El tamaño del vacío central podría ser una pista.
La imagen de M104 de la portada es una combinación de la famosa
fotografía del Hubble (imagen superior) y la reciente imagen de infrarrojos
del observatorio orbital Spitzer (inferior).
Esta última muestra claramente la forma de anillo de la galaxia.
A la luz, sólo vemos el borde frontal de la silueta del anillo.
-- 19 of 644 --

---

## [Sección 6] Introducción y Fundamentos

Imagen de portada: © Spitzet Space
Telescope.
La masa central oculta el resto.
Pero en la imagen de infrarrojos, las
partículas calientes del anillo brillan a través
de la masa central. Las dos imágenes
combinadas nos ofrecen una vista desconocida
hasta ahora e implican que hace tiempo era un
auténtico infierno activo.
-- 20 of 644 --
Código Limpio
Está leyendo este libro por dos motivos. Por un lado, es programador. Por
otro, quiere ser mejor programador. Perfecto. Necesitamos mejores
-- 21 of 644 --

programadores.
Este libro trata sobre programación correcta. Está repleto de código. Lo
analizaremos desde todas las direcciones. Desde arriba, desde abajo y desde
dentro. Cuando terminemos, sabremos mucho sobre código y, en especial
sabremos distinguir entre código correcto e incorrecto. Sabremos cómo
escribir código correcto y cómo transformar código incorrecto en código
correcto.
Hágase el código
Se podría afirmar que un libro sobre código es algo obsoleto, que el código
ya no es el problema y que deberíamos centrarnos en modelos y requisitos.
Hay quienes sugieren que el final del código está próximo. Que los
programadores ya no serán necesarios porque los empresarios generarán
programas a partir de especificaciones.
No es cierto. El código nunca desaparecerá, ya que representa los detalles
de los requisitos. En algún nivel, dichos detalles no se pueden ignorar ni
abstraer; deben especificarse, y para especificar requisitos de forma que un
equipo pueda ejecutarlos se necesita la programación. Dicha especificación es
el código.
Espero que el nivel de abstracción de nuestros lenguajes siga
aumentando. También espero que aumente el número de lenguajes
específicos de dominios. Será algo positivo, pero no eliminará el código. De
hecho, todas las especificaciones creadas en estos lenguajes de nivel superior
y específicos de los dominios serán código, y tendrá que ser riguroso, preciso,
formal y detallado para que un equipo pueda entenderlo y ejecutarlo.
El que piense que el código va a desaparecer es como el matemático que
espera que un día las matemáticas no sean formales. Esperan descubrir una
forma de crear máquinas que hagan lo que queramos en lugar de lo que
digamos. Esas máquinas tendrían que entendernos de tal forma que puedan
traducir necesidades ambiguas en programas perfectamente ejecutados que
satisfagan dichas necesidades a la perfección.
Esto nunca sucederá. Ni siquiera los humanos, con toda su intuición y
-- 22 of 644 --

creatividad, han sido capaces de crear sistemas satisfactorios a partir de las
sensaciones de sus clientes. En realidad, si la disciplina de la especificación
de requisitos nos ha enseñado algo es que los requisitos bien especificados
son tan formales como el código y que pueden actuar como pruebas
ejecutables de dicho código.
Recuerde que el código es básicamente el lenguaje en el que expresamos
los requisitos en última instancia. Podemos crear lenguajes que se asemejen a
dichos requisitos. Podemos crear herramientas que nos permitan analizar y
combinar dichos requisitos en estructuras formales, pero nunca eliminaremos
la precisión necesaria; por ello, siempre habrá código.
Código Incorrecto
Recientemente leí el prólogo del libro
Implementation Pattern[1] de Kent Beck,
donde afirmaba que «…este libro se basa en
una frágil premisa: que el código correcto
es relevante…». ¿Una frágil premisa? En
absoluto. Considero que es una de las más
robustas, admitidas e importantes de
nuestro sector (y creo que Kent lo sabe).
Sabemos que el código correcto es
relevante porque durante mucho tiempo
hemos tenido que sufrir su ausencia.
Sé de una empresa que, a finales de la
década de 1980, creó una magnífica
aplicación, muy popular y que muchos
profesionales compraron y utilizaron. Pero los ciclos de publicación
empezaron a distanciarse. No se corrigieron los errores entre una versión y la
siguiente. Crecieron los tiempos de carga y aumentaron los fallos. Todavía
recuerdo el día en que apagué el producto y nunca más lo volví a usar.
Poco después, la empresa desapareció.
-- 23 of 644 --

---

## [Sección 7] Introducción y Fundamentos

Dos décadas después conocí a uno de los empleados de la empresa y le
pregunté sobre lo que había pasado. La respuesta confirmó mis temores.
Habían comercializado el producto antes de tiempo con graves fallos en el
código. Al añadir nuevas funciones, el código empeoró hasta que ya no
pudieron controlarlo. El código incorrecto fue el motivo del fin de la
empresa.
¿En alguna ocasión el código incorrecto le ha supuesto un obstáculo? Si
es programador seguramente sí. De hecho, tenemos una palabra que lo
describe: sortear. Tenemos que sortear el código incorrecto. Nos arrastramos
por una maraña de zarzas y trampas ocultas. Intentamos buscar el camino,
una pista de lo que está pasando, pero lo único que vemos es más y más
código sin sentido.
Sin duda el código incorrecto le ha supuesto un obstáculo. Entonces, ¿por
qué lo escribió?
¿Tenía prisa? ¿Plazos de entrega? Seguramente. Puede que pensara que
no tenía tiempo para hacer un buen trabajo; que su jefe se enfadaría si
necesitaba tiempo para limpiar su código. O puede que estuviera cansado de
trabajar en ese programa y quisiera acabar cuanto antes. O que viera el
trabajo pendiente y tuviera que acabar con un módulo para pasar al siguiente.
A todos nos ha pasado.
Todos hemos visto el lío en el que estábamos y hemos optado por dejarlo
para otro día. Todos hemos sentido el alivio de ver cómo un programa
incorrecto funcionaba y hemos decidido que un mal programa que funciona
es mejor que nada. Todos hemos dicho que lo solucionaríamos después.
Evidentemente, por aquel entonces, no conocíamos la ley de LeBlanc:
Después es igual a nunca.
El coste total de un desastre
Si es programador desde hace dos o tres años, probablemente haya sufrido los
desastres cometidos por otros en el código. Si tiene más experiencia, lo habrá
sufrido en mayor medida. El grado de sufrimiento puede ser significativo. En
un periodo de un año o dos, los equipos que avancen rápidamente al inicio de
-- 24 of 644 --

un proyecto pueden acabar a paso de tortuga. Cada cambio en el código
afecta a dos o tres partes del mismo. Ningún cambio es trivial. Para ampliar o
modificar el sistema es necesario comprender todos los detalles, efectos y
consecuencias, para de ese modo poder añadir nuevos detalles, efectos y
consecuencias. Con el tiempo, el desastre aumenta de tal modo que no se
puede remediar. Es imposible.
Al aumentar este desastre, la productividad del equipo disminuye y acaba
por desaparecer. Al reducirse la productividad, el director hace lo único que
puede: ampliar la plantilla del proyecto con la esperanza de aumentar la
productividad. Pero esa nueva plantilla no conoce el diseño del sistema. No
conocen la diferencia entre un cambio adecuado al objetivo de diseño y otro
que lo destroce. Por tanto, todos se encuentran sometidos a una gran presión
para aumentar la productividad. Por ello, cometen más errores, aumenta el
desastre y la productividad se acerca a cero cada vez más (véase la figura
1.1).
Figura 1.1. Productividad frente a tiempo.
El gran cambio de diseño
En última instancia, el equipo se rebela. Informan al director que no pueden
seguir trabajando con ese código. Exigen un cambio de diseño. La dirección
no requiere invertir en un cambio de diseño del proyecto, pero no puede
ignorar el bajo nivel de productividad.
-- 25 of 644 --

Acaba por ceder a las exigencias de los programadores y autoriza el gran
cambio de diseño. Se selecciona un nuevo equipo. Todos quieren formar
parte del nuevo equipo por ser un lienzo en blanco. Pueden empezar de cero y
crear algo realmente bello, pero sólo los mejores serán elegidos para el nuevo
equipo. Los demás deben continuar con el mantenimiento del sistema actual.
Ahora los dos equipos compiten. El nuevo debe crear un sistema que haga
lo que el antiguo no puede. Además, deben asumir los cambios que
continuamente se aplican al sistema antiguo. La dirección no sustituirá el
sistema antiguo hasta que el nuevo sea capaz de hacer todo lo que hace el
antiguo.
Esta competición puede durar mucho tiempo. Conozco casos de casi 10
años. Y cuando acaba, los miembros originales del equipo nuevo han
desaparecido y los miembros actuales exigen un cambio de diseño del nuevo
sistema porque es un desastre.
Si ha experimentado alguna fase de esta historia, ya sabrá que dedicar
tiempo a que el código sea correcto no sólo es rentable, es una cuestión de
supervivencia profesional.
Actitud
¿Alguna vez ha tenido que superar un desastre tan grave que ha tardado
semanas en lo que normalmente hubiera tardado horas? ¿Ha visto un cambio
que debería haberse realizado en una línea, aplicado en cientos de módulos
distintos? Son síntomas demasiado habituales.
¿Por qué sucede en el código? ¿Por qué el código de calidad se
transforma tan rápidamente en código incorrecto? Hay muchas explicaciones.
Nos quejamos de que los requisitos cambian de forma que comprometen el
diseño original, de que los plazos de entrega son demasiado exigentes para
hacer las cosas bien. Culpamos a directores incompetentes, a usuarios
intolerantes y a comerciales sin sentido. Pero la culpa, querido Dilbert, es
nuestra. No somos profesionales.
Puede que resulte duro escucharlo. ¿Cómo es posible que seamos
responsables de tales desastres? ¿Qué pasa con los requisitos? ¿Y los plazos
de entrega? ¿Y los directores incompetentes y los comerciales sin sentido?
-- 26 of 644 --

---

## [Sección 8] Introducción y Fundamentos

¿No es también culpa suya?
No. Los directores y los comerciales nos exigen la información que
necesitan para realizar sus promesas y compromisos, e incluso cuando no
recurren a nosotros, no debemos tener miedo a decirles lo que pensamos. Los
usuarios acuden a nosotros para validar la forma de encajar los requisitos en
el sistema. Los directores de proyectos acuden a nosotros para determinar los
objetivos. Somos cómplices en la programación del proyecto y compartimos
gran parte de la responsabilidad de los fallos, en especial si tienen que ver
con código incorrecto.
Seguramente piense que, si no hace lo que su jefe le dice, le despedirán.
Es improbable. Muchos jefes sólo quieren la verdad, aunque lo disimulen.
Muchos quieren código correcto, aunque estén obsesionados con los
objetivos. Pueden defender apasionadamente los objetivos y los requisitos,
pero es su trabajo. El nuestro es defender el código con la misma intensidad.
Para resumir, imagine que es médico y un paciente le exige que no se lave
las manos antes de una operación porque se pierde demasiado tiempo[2]. En
este caso, el paciente es el jefe, pero el médico debe negarse a lo que pide.
¿Por qué? Porque el médico sabe más que el paciente sobre los riesgos de
infecciones. No sería profesional (incluso sería ilegal) que el médico cediera
a las exigencias del paciente.
Tampoco sería profesional que los programadores cedieran a la voluntad
de los jefes que no entienden los riesgos de un posible desastre.
El enigma
Los programadores se enfrentan a un enigma de valores básicos. Los que
tienen años de experiencia saben que un desastre ralentiza su trabajo, y aun
así todos los programadores sienten la presión de cometer errores para poder
cumplir los plazos de entrega. En definitiva, no toman el tiempo necesario
para avanzar.
Los verdaderos profesionales saben que la segunda parte del enigma no es
cierta. No se cumple un plazo de entrega cometiendo un error. De hecho, el
error nos ralentiza de forma inmediata y hace que no lleguemos al plazo de
entrega. La única forma de cumplirlo, la única forma de avanzar, es intentar
-- 27 of 644 --

que el código siempre sea limpio.
¿El arte del código limpio?
Imagine que cree que el código incorrecto es un obstáculo significativo.
Imagine que acepta que la única forma de avanzar es mantener el código
limpio. Entonces se preguntará cómo crear código limpio. No tiene sentido
intentar crearlo si no sabe lo que es.
La mala noticia es que crear código limpio es como pintar un cuadro.
Muchos sabemos si un cuadro se ha pintado bien o no, pero poder reconocer
la calidad de una obra no significa que sepamos pintar. Por ello, reconocer
código limpio no significa que sepamos cómo crearlo.
Para crearlo se requiere el uso disciplinado de miles de técnicas aplicadas
mediante un detallado sentido de la «corrección». Este sentido del código es
la clave.
Algunos nacen con este sentido. Otros han de luchar para conseguirlo. No
sólo permite distinguir entre código correcto e incorrecto, sino que también
muestra la estrategia para aplicar nuestra disciplina y transformar código
incorrecto en código correcto.
Un programador sin este sentido puede reconocer el desastre cometido en
un módulo, pero no saber cómo solucionarlo. Un programador con este
sentido verá las posibles opciones y elegirá la variante óptima para definir
una secuencia de cambios.
En definitiva, un programador que cree código limpio es un artista que
puede transformar un lienzo en blanco en un sistema de código elegante.
Concepto de código limpio
Existen tantas definiciones como programadores. Por ello, he consultado la
opinión de conocidos y experimentados programadores.
Bjarne Stroustrup, inventor de C++ y autor
de The C++ Programming Language
-- 28 of 644 --

Me gusta que mi código sea elegante y
eficaz. La lógica debe ser directa para
evitar errores ocultos, las dependencias
deben ser mínimas para facilitar el
mantenimiento, el procesamiento de
errores completo y sujeto a una
estrategia articulada, y el rendimiento
debe ser óptimo para que los usuarios
no tiendan a estropear el código con
optimizaciones sin sentido. El código
limpio hace bien una cosa.
Bjarne usa la palabra «elegante». Menuda palabra.
Según el diccionario, «elegante» significa «dotado de gracia, nobleza y
sencillez». Aparentemente Bjarne piensa que el código limpio es un placer a
la hora de leerlo. Su lectura debe hacernos sonreír, como una caja de música
o un coche bien diseñado.
Bjarne también menciona la eficacia, en dos ocasiones. No debería
sorprendemos viniendo del inventor de C++; pero considero que hay algo
más que el mero deseo de velocidad. Los ciclos malgastados no son
elegantes, no son un placer. Y fíjese en la palabra empleada por Bjarne para
describir la consecuencia de esta falta de elegancia. Usa tiendan. Una gran
verdad. El código incorrecto tiende a aumentar el desastre. Cuando otros
cambian código incorrecto, tienden a empeorarlo.
Dave Thomas y Andy Hunt lo expresan de forma diferente. Usan la
metáfora de las ventanas rotas[3]. Un edificio con ventanas rotas parece
abandonado. Y hace que otros lo abandonen. Dejan que se rompan otras
ventanas. E incluso las rompen a propósito. La fachada se ensucia con
pintadas y se acumula la basura. Una ventana rota inicia el proceso de la
decadencia.
Bjarne también menciona que el procesamiento de errores debe ser
completo, lo que se relaciona con la disciplina de prestar atención a los
detalles. El procesamiento de errores abreviado es una forma de ignorar los
detalles. Otras son las fugas de memoria, las condiciones de carrera o el uso
-- 29 of 644 --

---

## [Sección 9] Introducción y Fundamentos

incoherente de los nombres. En definitiva, el código limpio muestra gran
atención al detalle.
Bjarne termina afirmando que el código limpio hace una cosa bien. No es
accidental que existan tantos principios de diseño de software que se puedan
reducir a esta sencilla máxima. Muchos escritores han tratado de comunicar
este pensamiento. El código incorrecto intenta hacer demasiadas cosas y su
cometido es ambiguo y enrevesado. El código limpio es concreto. Cada
función, cada clase y cada módulo muestran una única actitud que se
mantiene invariable y no se contamina por los detalles circundantes.
Grady Booch, autor de Object Oriented
Analysis and Design with Applications
El código limpio es simple y directo. El
código limpio se lee como un texto bien
escrito. El código limpio no oculta la
intención del diseñador, sino que
muestra nítidas abstracciones y líneas
directas de control.
Grady mantiene las mismas ideas que
Bjarne, pero adopta una perspectiva de legibilidad. Me gusta especialmente
que el código limpio se pueda leer como un texto bien escrito. Piense en un
buen libro. Recordará que las palabras desaparecen y se sustituyen por
imágenes, como ver una película.
Mejor todavía. Es ver los caracteres, escuchar los sonidos, experimentar
las sensaciones.
Leer código limpio nunca será como leer El Señor de los Anillos. Pero
esta metáfora literaria no es incorrecta. Como una buena novela, el código
limpio debe mostrar de forma clara el suspense del problema que hay que
resolver. Debe llevar ese suspense hasta un punto álgido para después
demostrar al lector que los problemas y el suspense se han solucionado de
forma evidente.
-- 30 of 644 --

La frase «nítida abstracción» de Grady es un oxímoron fascinante. Nítido
es casi un sinónimo de concreto, con un potente mensaje. El código debe ser
específico y no especulativo. Sólo debe incluir lo necesario. Nuestros lectores
deben percibir que hemos tomado decisiones.
«Big» Dave Thomas, fundador de OTI, el
padrino de la estrategia Eclipse
El código limpio se puede leer y
mejorar por parte de un programador
que no sea su autor original. Tiene
pruebas de unidad y de aceptación.
Tiene nombres con sentido. Ofrece una
y no varias formas de hacer algo. Sus
dependencias son mínimas, se definen
de forma explícita y ofrece una API
clara y mínima. El código debe ser
culto en función del lenguaje, ya que no
toda la información necesaria se puede
expresar de forma clara en el código.
Big Dave comparte el deseo de Grady de la legibilidad, pero con una
importante variante. Dave afirma que el código limpio facilita las labores de
mejora de otros. Puede parecer evidente pero no debemos excedernos.
Después de todo, existe una diferencia entre el código fácil de leer y el
código fácil de cambiar.
Dave vincula la limpieza a las pruebas. Hace 10 años esto hubiera
provocado cierta controversia. Pero la disciplina del Desarrollo controlado
por pruebas ha tenido un gran impacto en nuestro sector y se ha convertido en
uno de sus pilares. Dave tiene razón. El código, sin pruebas, no es limpio.
Independientemente de su elegancia, legibilidad y accesibilidad, si no tiene
pruebas, no será limpio.
Dave usa dos veces la palabra mínimo. Valora el código de tamaño
-- 31 of 644 --

reducido, una opinión habitual en la literatura de software desde su
concepción. Cuanto más pequeño, mejor.
También afirma que el código debe ser culto, una referencia indirecta a la
programación de Knuth[4] y que en definitiva indica que el código debe
redactarse de una forma legible para los humanos.
Michael Feathers, autor de Working
Effectively with Legacy Code
Podría enumerar todas las cualidades
del código limpio, pero hay una
principal que engloba a todas ellas. El
código limpio siempre parece que ha
sido escrito por alguien a quien le
importa. No hay nada evidente que
hacer para mejorarlo. El autor del
código pensó en todos los aspectos
posibles y si intentamos imaginar
alguna mejora, volvemos al punto de
partida y sólo nos queda disfrutar del
código que alguien a quien le importa realmente nos ha
proporcionado.
Una palabra; dar importancia. Es el verdadero tema de este libro, que
incluso podría usar el subtítulo «Cómo dar importancia al código».
Michael ha acertado de pleno. El código limpio es aquél al que se le ha
dado importancia. Alguien ha dedicado su tiempo para que sea sencillo y ha
prestado atención a los detalles. Se ha preocupado.
Ron Jeffries, autor de Extreme
Programming Installed y Extreme
Programming Adventures in C#
-- 32 of 644 --

---

## [Sección 10] Introducción y Fundamentos

Ron comenzó su carrera como
programador con Fortran en Strategic Air
Command y ha escrito código para la
práctica totalidad de lenguajes y equipos.
Merece la pena fijarse en sus palabras:
En los últimos años, comencé y
prácticamente terminé con las reglas de
código simple de Beck.
En orden de prioridad, el código simple:
Ejecuta todas las pruebas.
No contiene duplicados.
Expresa todos los conceptos de diseño del sistema.
Minimiza el número de entidades como clases, métodos,
funciones y similares.
De todos ellos, me quedo con la duplicación. Cuando algo se repite
una y otra vez, es una señal de que tenemos una idea que no acabamos
de representar correctamente en el código. Intento determinar cuál es
y, después, expresar esa idea con mayor claridad. Para mí, la
expresividad debe incluir nombres con sentido y estoy dispuesto a
cambiar los nombres de las cosas varias veces. Con las modernas
herramientas de creación de código como Eclipse, el cambio de
nombres es muy sencillo, por lo que no me supone problema alguno.
La expresividad va más allá de los nombres. También me fijo si un
objeto o un método hacen más de una cosa. Si se trata de un objeto,
probablemente tenga que dividirse en dos o más. Si se trata de un
método, siempre recurro a la refactorización de extracción de métodos
para generar un método que exprese con mayor claridad su cometido
y varios métodos secundarios que expliquen cómo lo hace.
La duplicación y la expresividad son dos factores que permiten
mejorar considerablemente código que no sea limpio. Sin embargo,
-- 33 of 644 --

existe otra cosa que también hago conscientemente, aunque sea más
difícil de explicar.
Tras años en este trabajo, creo que todos los programas están
formados de elementos muy similares. Un ejemplo es la búsqueda de
elementos en una colección. Independientemente de que sea una base
de datos de registros de empleados o un mapa de claves y valores, o
una matriz de elementos, por lo general tenemos que buscar un
elemento concreto de esa colección. Cuando esto sucede, suelo incluir
esa implementación concreta en un método o una clase más
abstractos. De ese modo disfruto de una serie de interesantes ventajas.
Puedo implementar la funcionalidad con algo sencillo, como un mapa
hash, por ejemplo, pero como ahora todas las referencias a la
búsqueda se ocultan en mi pequeña abstracción, puedo modificar la
implementación siempre que desee. Puedo avanzar rápidamente al
tiempo que conservo la posibilidad de realizar cambios posteriores.
Además, la abstracción de la colección suele captar mi atención en lo
que realmente sucede e impide que implemente comportamientos de
colecciones arbitrarias si lo que realmente necesito es una forma
sencilla de localizar un elemento.
Reducir los duplicados, maximizar la expresividad y diseñar sencillas
abstracciones en las fases iniciales. Para mí, es lo que hace que el
código sea limpio.
En estos breves párrafos, Ron resume el contenido de este libro. Nada de
duplicados, un objetivo, expresividad y pequeñas abstracciones. Todo está
ahí.
Ward Cunningham, inventor de Wiki, Fit,
y uno de los inventores de la programación
eXtreme. Uno de los impulsores de los
patrones de diseño. Una de las mentes tras
Smalltalk y la programación orientada a
objetos. El padrino de todos a los que les
importa el código.
-- 34 of 644 --

Sabemos que estamos trabajando con
código limpio cuando cada rutina que
leemos resulta ser lo que esperábamos.
Se puede denominar código atractivo
cuando el código hace que parezca que
el lenguaje se ha creado para el
problema en cuestión.
Este tipo de afirmaciones son
características de Ward. Las leemos,
asentimos y pasamos a la siguiente. Es tan
razonable y evidente que apenas parece profundo. Incluso podemos pensar
que es lo que esperábamos. Pero preste atención.
«… resulta ser lo que esperábamos». ¿Cuándo fue la última vez que vio
un módulo que fuera más o menos lo que esperaba? ¿Lo habitual no es ver
módulos complicados y enrevesados? ¿No es esta falta de concreción lo
habitual? ¿No está acostumbrado a intentar extraer el razonamiento de un
sistema para llegar al módulo que está leyendo? ¿Cuándo fue la última vez
que leyó un código y asintió como seguramente haya hecho al leer la
afirmación de Ward?
Ward espera que al leer código limpio no le sorprenda. De hecho, ni
siquiera tendrá que esforzarse. Lo leerá y será prácticamente lo que esperaba.
Será evidente, sencillo y atractivo. Cada módulo prepara el camino del
siguiente. Cada uno indica cómo se escribirá el siguiente. Los programas
limpios están tan bien escritos que ni siquiera se dará cuenta. El diseñador
consigue simplificarlo todo enormemente, como sucede con todos los diseños
excepcionales.
¿Y la noción de atractivo de Ward? Todos hemos criticado que nuestros
lenguajes no se hayan diseñado para nuestros problemas. Pero la afirmación
de Ward hace que ahora la responsabilidad sea nuestra. Afirma que el código
atractivo hace que el lenguaje parezca creado para el problema. Por tanto,
somos responsables de que el lenguaje parezca sencillo. No es el lenguaje el
que hace que los programas parezcan sencillos, sino el programador que
consigue que el lenguaje lo parezca.
-- 35 of 644 --

---

## [Sección 11] Introducción y Fundamentos

Escuelas de pensamiento
¿Y yo (Uncle Bob)? ¿Qué es para mí el
código limpio? En este libro le contaremos,
con todo detalle, lo que yo y mis colegas
pensamos del código limpio. Le contaremos
lo que pensamos que hace que un nombre
de variable, una función o una clase sean
limpias.
Presentaremos estas opiniones de forma
absoluta, sin disculparnos. En este punto de
nuestra carrera, ya son absolutas. Son
nuestra escuela de pensamiento del código
limpio.
Los especialistas de las artes marciales no se ponen de acuerdo sobre cuál
es la mejor de todas, ni siquiera sobre cuál es la mejor técnica de un arte
marcial. Es habitual que los maestros de las artes marciales creen sus propias
escuelas de pensamiento y los alumnos aprendan de ellos. De esta forma
nació Gracie Jiu Jitsu, creada e impartida por la familia Gracie en Brasil;
Hakkoryu Jiu Jitsu, fundada e impartida por Okuyama Ryuho en Tokio o Jeet
Kune Do, fundada e impartida por Bruce Lee en Estados Unidos.
Los alumnos de estas disciplinas se sumergen en las enseñanzas del
fundador. Se dedican a aprender lo que su maestro les enseña y suelen excluir
las enseñanzas de otros maestros. Después, cuando han mejorado su arte,
pueden convertirse en alumnos de otro maestro diferente para ampliar sus
conocimientos y su experiencia. Algunos seguirán mejorando sus
habilidades, descubriendo nuevas técnicas y fundando sus propias escuelas.
Ninguna de estas escuelas tiene la razón absoluta pero dentro de cada una
actuamos como si las enseñanzas y las técnicas fueran correctas. Después de
todo, existe una forma correcta de practicar Hakkoryu Jiu Jitsu o Jeet Kune
Do, pero esta corrección dentro de una escuela determinada no anula las
enseñanzas de otra diferente.
-- 36 of 644 --

Imagine que este libro es una descripción de la Escuela de mentores del
código limpio. Las técnicas y enseñanzas impartidas son la forma en la que
practicamos nuestro arte. Podemos afirmar que, si sigue nuestras enseñanzas,
disfrutará de lo que hemos disfrutado nosotros, y aprenderá a crear código
limpio y profesional. Pero no cometa el error de pensar que somos los únicos
que tenemos razón. Existen otras escuelas y otros maestros tan profesionales
como nosotros, y su labor es aprender de ellos también.
De hecho, muchas de las recomendaciones del libro son controvertidas,
seguramente no esté de acuerdo con muchas de ellas y puede que rechace
algunas de forma definitiva. Es correcto. No somos la autoridad final. Pero,
por otra parte, las recomendaciones del libro son algo en lo que hemos
pensado mucho. Las hemos aprendido tras décadas de experiencia y ensayo y
error. Por lo tanto, esté o no de acuerdo, sería una lástima que no apreciara, y
respetara, nuestro punto de vista.
Somos autores
El campo @author de un Javadoc indica quiénes somos. Somos autores. Y los
autores tienen lectores. De hecho, los autores son responsables de
comunicarse correctamente con sus lectores. La próxima vez que escriba una
línea de código, recuerde que es un autor y que escribe para que sus lectores
juzguen su esfuerzo.
Seguramente se pregunte qué cantidad de código se lee realmente y si la
mayor parte del esfuerzo no se concentra en crearlo.
¿Alguna vez ha reproducido una sesión de edición? En las décadas de
1980 y 1990 teníamos editores como Emacs que controlaban cada pulsación
de tecla. Se podía trabajar durante una hora y después reproducir la sesión de
edición completa como una película a alta velocidad. Cuando lo hice, los
resultados fueron fascinantes.
La mayor parte de la reproducción eran desplazamientos entre módulos.
Bob accede al módulo.
Se desplaza hasta la función que tiene que cambiar.
-- 37 of 644 --

Se detiene y piensa en las posibles opciones.
Oh, vuelve al inicio del módulo para comprobar la inicialización de
una variable.
Ahora vuelve a bajar y comienza a escribir.
Vaya, borra lo que había escrito.
Vuelve a escribirlo.
Lo vuelve a borrar.
Escribe algo diferente pero también lo borra.
Se desplaza a otra función que invoca la función que está
modificando para comprobar cómo se invoca.
Vuelve a subir y escribe el mismo código que acaba de borrar.
Se detiene.
Vuelve a borrar el código.
Abre otra ventana y examina las subclases. ¿Se ha reemplazado esa
función?
…
Se hace una idea. En realidad, la proporción entre tiempo dedicado a leer
frente a tiempo dedicado a escribir es de más de 10:1. Constantemente
tenemos que leer código antiguo como parte del esfuerzo de crear código
nuevo.
Al ser una proporción tan elevada, queremos que la lectura del código sea
sencilla, aunque eso complique su creación. Evidentemente, no se puede
escribir código sin leerlo, de modo que si es más fácil de leer será más fácil
de escribir.
Es una lógica sin escapatoria. No se puede escribir código si no se puede
leer el código circundante. El código que intente escribir hoy será fácil o
difícil de escribir en función de lo fácil o difícil de leer que sea el código
circundante. Si quiere avanzar rápidamente, terminar cuanto antes y que su
código sea fácil de escribir, haga que sea fácil de leer.
La regla del Boy Scout
-- 38 of 644 --

---

## [Sección 12] Introducción y Fundamentos

No basta con escribir código correctamente. El código debe limpiarse con el
tiempo. Todos hemos visto que el código se corrompe con el tiempo, de
modo que debemos adoptar un papel activo para evitarlo.
Los Boy Scouts norteamericanos tienen una sencilla regla que podemos
aplicar a nuestra profesión:
Dejar el campamento más limpio de lo que se ha encontrado[5].
Si todos entregamos el código más limpio de lo que lo hemos recibido, no
se corromperá. No hace falta que la limpieza sea masiva. Cambie el nombre
de una variable, divida una función demasiado extensa, elimine elementos
duplicados, simplifique una instrucción if compuesta.
¿Se imagina trabajar en un proyecto en el que el código mejorara con el
tiempo? ¿Cree que hay otras opciones que puedan considerarse
profesionales? De hecho, ¿la mejora continuada no es una parte intrínseca de
la profesionalidad?
Precuela y principios
En muchos aspectos, este libro es una «precuela» de otro que escribí en 2002
titulado Agile Software Development: Principles, Patterns, and Practices
(PPP). El libro PPP trata sobre los principios del diseño orientado a objetos y
muchas de las técnicas empleadas por desarrolladores profesionales. Si no ha
leído PPP, comprobará que continúa la historia contada en este libro. Si lo ha
leído, encontrará muchas de las sensaciones de ese libro reproducidas en éste
a nivel del código.
En este libro encontrará referencias esporádicas a distintos principios de
diseño como SRP (Single Responsibility Principle o Principio de
responsabilidad única), OCP (Open Closed Principle o Principio
Abierto/Cerrado) y DIP (Dependency Inversion Principle o Principio de
inversión de dependencias) entre otros. Todos estos principios se describen
detalladamente en PPP.
-- 39 of 644 --

Conclusión
Los libros sobre arte no le prometen que se convertirá en artista. Solamente
pueden mostrarle herramientas, técnicas y procesos de pensamiento que otros
artistas hayan utilizado. Del mismo modo, este libro no puede prometer que
se convierta en un buen programador, que tenga sentido del código. Sólo
puede mostrarle los procesos de pensamiento de buenos programadores y los
trucos, técnicas y herramientas que emplean.
Al igual que un libro sobre arte, este libro está repleto de detalles.
Encontrará mucho código. Verá código correcto y código incorrecto. Verá
código incorrecto transformado en código correcto. Verá listas de heurística,
disciplinas y técnicas. Verá un ejemplo tras otro. Y después de todo, será
responsabilidad suya.
¿Recuerda el chiste sobre el violinista que se pierde camino de un
concierto? Se cruza con un anciano y le pregunta cómo llegar al Teatro Real.
El anciano mira al violinista y al violín que lleva bajo el brazo y le responde:
«Practique joven, practique».
Bibliografía
[Beck07]: Implementation Patterns, Kent Beck, Addison-Wesley, 2007.
[Knuth92]: Literate Programming, Donald E. Knuth, Center for the
Study of Language and Information, Leland Stanford Junior University,
1992.
-- 40 of 644 --
Nombres con sentido
por Tim Ottinger
Introducción
En el software, los nombres son omnipresentes. Aparecen en variables,
-- 41 of 644 --

funciones, argumentos, clases y paquetes. Asignamos nombres a archivos y a
directorios, a archivos jar, war y ear. Usamos nombres constantemente. Por
ello, debemos hacerlo bien. A continuación, veremos algunas reglas básicas
para crear nombres correctos.
Usar nombres que revelen las intenciones
Es fácil afirmar que los nombres deben revelar nuestras intenciones. Lo que
queremos recalcar es la importancia de hacerlo. Elegir nombres correctos
lleva tiempo, pero también ahorra trabajo. Por ello, preste atención a los
nombres y cámbielos cuando encuentre otros mejores. Todo el que lea su
código se lo agradecerá.
El nombre de una variable, función o clase debe responder una serie de
cuestiones básicas. Debe indicar por qué existe, qué hace y cómo se usa. Si
un nombre requiere un comentario, significa que no revela su cometido.
int d; // tiempo transcurrido en días
El nombre d no revela nada. No evoca una sensación de tiempo
transcurrido, ni de días. Debe elegir un nombre que especifique lo que se
mide y la unidad de dicha medida:
int elapsedTimeInDays;
int daysSinceCreation;
int daysSinceModification;
int fileAgeInDays;
La elección de nombres que revelen intenciones facilita
considerablemente la comprensión y la modificación del código. ¿Para qué
sirve el siguiente código?
public List<int[]> getThem() {
List<int[]> list1 = new ArrayList<int[]>();
for (int[] x : theList)
if (x[0] == 4)
list1.add(x);
return list1;
}
¿Por qué es complicado saber la función de este código? No hay
expresiones complejas. Los espacios y el sangrado son razonables. Sólo hay
tres variables y dos constantes. Ni siquiera contiene clases complejas o
-- 42 of 644 --

---

## [Sección 13] Introducción y Fundamentos

métodos polimórficos, sólo una lista de matrices (o eso parece).
El problema no es la simplicidad del código sino su carácter implícito: el
grado en el que el contexto no es explícito en el propio código.
Implícitamente, el código requiere que sepamos las respuestas a las siguientes
preguntas:
¿Qué contiene theList?
¿Qué significado tiene el subíndice cero de un elemento de theList?
¿Qué importancia tiene el valor 4?
¿Cómo se usa la lista devuelta?
Las respuestas a estas preguntas no se encuentran en el código, pero se
podrían haber incluido. Imagine que trabaja en un juego de buscar minas. El
tablero es una lista de celdas llamada theList. Cambiemos el nombre por
gameBoard.
Cada celda del teclado se representa por medio de una matriz. El
subíndice cero es la ubicación de un valor de estado que, cuando es 4,
significa que se ha detectado. Al asignar nombres a estos conceptos
mejoramos considerablemente el código:
public List<int[]> getFlaggedCells() {
List<int[]> flaggedCells = new ArrayList<int[]>();
for (int[] cell : gameBoard)
if (cell[STATUS_VALUE] == FLAGGED)
flaggedCells.add(cell);
return flaggedCells;
}
La simplicidad del código no ha cambiado. Sigue teniendo los mismos
operadores y constantes y el mismo número de niveles anidados, pero ahora
es mucho más explícito. Podemos crear una sencilla clase para celdas en
lugar de usar una matriz de elementos int. Puede incluir una función que
revele el objetivo (con el nombre isFlagged) para ocultar los números. El
resultado es una nueva versión de la función:
public List<Cell> getFlaggedCells() {
List<Cell> flaggedCells = new ArrayList<Cell>();
for (Cell cell : gameBoard)
if (cell.isFlagged())
flaggedCells.add(cell);
-- 43 of 644 --

return flaggedCells;
}
Con estos sencillos cambios de nombre, es fácil saber qué sucede. Es la
ventaja de seleccionar nombres adecuados.
Evitar la desinformación
Los programadores deben evitar dejar pistas falsas que dificulten el
significado del código. Debemos evitar palabras cuyo significado se aleje del
que pretendemos. Por ejemplo, hp, aix y sco son nombres de variables
pobres ya que son los nombres de plataformas o variantes de Unix. Aunque
se trate del código de una hipotenusa y hp parezca la abreviatura correcta,
puede no serlo.
No haga referencia a un grupo de cuentas como accountList a menos
que realmente sea una lista (List). La palabra lista tiene un significado
concreto para los programadores. Si el contenedor de las cuentas no es
realmente una lista, puede provocar falsas conclusiones[6]. Por tanto, resulta
más adecuado usar accountGroup, bunchOfAccounts o simplemente
accounts.
Evite usar nombres con variaciones mínimas. ¿Cuánto se tarda en
apreciar la sutil diferencia entre
XYZControllerForEfficientHandlingOfStrings y
XYZControllerForEfficientStorageOfStrings en un módulo? Ambas
palabras tienen una forma similar.
La ortografía similar de conceptos parecidos es información; el uso de
ortografía incoherente es desinformación. En los entornos modernos de Java,
el código se completa de forma automática. Escribimos varios caracteres de
un nombre y pulsamos varias teclas para obtener una lista de posibles
opciones de un nombre. Es muy útil si los nombres de elementos similares se
ordenan alfabéticamente de forma conjunta y si las diferencias son muy
evidentes, ya que es probable que el programador elija un objeto por nombre
sin fijarse en los comentarios o la lista de métodos proporcionados por una
clase.
-- 44 of 644 --

Un ejemplo de nombre desinformativo sería el uso de la L minúscula o la
O mayúscula como nombres de variables, sobre todo combinados. El
problema, evidentemente, es que se parecen a las constantes 1 y 0
respectivamente:
int a = l;
if ( O == l )
a = O1;
else
l = 01;
El lector puede pensar que es una invención, pero hemos visto código con
abundancia de estos elementos. En un caso, el autor del código, sugirió usar
una fuente distinta para que las diferencias fueran más evidentes, una
solución que se hubiera transmitido a todos los futuros programadores como
tradición oral o en un documento escrito. El problema se resolvió con
carácter definitivo y sin necesidad de crear nuevos productos, con tan sólo
cambiar los nombres.
Realizar distinciones con sentido
Los programadores se crean un problema al
crear código únicamente dirigido a un
compilador o intérprete. Por ejemplo, como
se puede usar el mismo nombre para hacer
referencia a dos elementos distintos en el
mismo ámbito, puede verse tentado a cambiar un nombre de forma arbitraria.
En ocasiones se hace escribiéndolo incorrectamente, lo que provoca que los
errores ortográficos impidan la compilación[7].
No basta con añadir series de números o palabras adicionales, aunque eso
satisfaga al compilador. Si los nombres tienen que ser distintos, también
deben tener un significado diferente.
Los nombres de series numéricas (a1, a2… aN) son lo contrario a los
nombres intencionados. No desinforman, simplemente no ofrecen
información; son una pista sobre la intención del autor. Fíjese en lo siguiente:
-- 45 of 644 --

---

## [Sección 14] Introducción y Fundamentos

public static void copyChars(char a1[], char a2[]) {
for (int i = 0; i < a1.length; i++) {
a2[i] = a1[i];
}
}
Esta función se lee mejor cuando se usa source y destination como
nombres de argumentos.
Las palabras adicionales son otra distinción sin sentido. Imagine que tiene
la clase Product. Si tiene otra clase con el nombre ProductInfo o
ProductData, habrá creado nombres distintos, pero con el mismo significado.
Info y Data son palabras adicionales, como a, an y the.
No es incorrecto usar prefijos como a y the mientras la distinción tenga
sentido. Imagine que usa a para variables locales y for para argumentos de
funciones[8]. El problema aparece cuando decide invocar la variable theZork
porque ya tiene otra variable con el nombre zork.
Las palabras adicionales son redundantes. La palabra variable no debe
incluirse nunca en el nombre de una variable. La palabra table no debe
incluirse nunca en el nombre de una tabla. ¿Es mejor NameString que Name?
¿Podría ser Name un número de coma flotante? En caso afirmativo, incumple
la regla anterior sobre desinformación. Imagine que encuentra una clase con
el nombre Customer y otra con el nombre CustomerObject. ¿Cuál sería la
distinción? ¿Cuál representa mejor el historial de pagos de un cliente?
Existe una aplicación que lo ilustra. Hemos cambiado los nombres para
proteger al culpable. Veamos el error exacto:
getActiveAccount();
getActiveAccounts();
getActiveAccountInfo();
¿Cómo saben los programadores de este proyecto qué función deben
invocar?
En ausencia de convenciones concretas, la variable moneyAmount no se
distingue de money, customerInfo no se distingue de customer, accountData
no se distingue de account y theMessage no se distingue de message. Debe
diferenciar los nombres de forma que el lector aprecie las diferencias.
-- 46 of 644 --

Usar nombres que se puedan pronunciar
A los humanos se nos dan bien las palabras. Gran parte de nuestro cerebro se
dedica al concepto de palabras. Y, por definición, las palabras son
pronunciables. Sería una pena malgastar esa parte de nuestro cerebro
dedicada al lenguaje hablado. Por tanto, cree nombres pronunciables. Si no lo
puede pronunciar, no podrá explicarlo sin parecer tonto. Es un factor
importante, ya que la programación es una actividad social.
Conozco una empresa que usa genymdhms (fecha de generación, año, mes,
día, hora, minuto y segundo) y lo pronuncian tal cual. Yo tengo la costumbre
de pronunciar todo tal y como lo veo escrito, de forma que muchos analistas
y diseñadores acabaron por llamarme algo como «genimedemes». Era un
chiste y nos parecía divertido, pero en realidad estábamos tolerando el uso de
nombres pobres. Teníamos que explicar las variables a los nuevos
programadores y cuando las pronunciaban, usaban palabras inventadas en
lugar de nombres correctos. Compare:
class DtaRcrd102 {
private Date genymdhms;
private Date modymdhms;
private final String pszqint = “102”;
/*… */
};
con:
class Customer {
private Date generationTimestamp;
private Date modificationTimestamp;
private final String recordId = “102”;
/*… */
};
Ahora se puede mantener una conversación inteligente: «Eh, Mikey, fíjate
en este registro. La marca de tiempo de generación es para mañana. ¿Cómo
es posible?»
Usar nombres que se puedan buscar
-- 47 of 644 --

Los nombres de una letra y las constantes numéricas tienen un problema: no
son fáciles de localizar en el texto. Se puede detectar
MAX_CLASSES_PER_STUDENT, pero el número 7 resulta más complicado. Las
búsquedas pueden devolver el dígito como parte de nombres de archivo, otras
definiciones de constantes o expresiones en las que se use con otra intención.
Mucho peor si la constante es un número extenso y alguien ha intercambiado
los dígitos, lo que genera un error inmediato y no aparece en la búsqueda.
Del mismo modo, el nombre e es una opción muy pobre para variables
que el programador tenga que buscar. Es la letra más usada en inglés y
aparece en la práctica totalidad de los textos de un programa. A este respecto,
los nombres extensos superan a los breves y cualquier nombre que se pueda
buscar supera a una constante en el código.
Personalmente prefiero nombres de una letra que sólo se puedan usar
como variables locales dentro de métodos breves. La longitud de un nombre
debe corresponderse al tamaño de su ámbito [N5]. Si una variable o
constante se usa en varios puntos del código, debe asignarle un nombre que
se pueda buscar. Compare:
for (int j=0; j<34; j++) {
s += (t[j]*4)/5;
}
con:
int realDaysPerIdealDay = 4;
const int WORK_DAYS_PER_WEEK = 5;
int sum = 0;
for (int j = 0; j < NUMBER_OF_TASKS; j++) {
int realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
int realTaskWeeks = (realdays / WORK_DAYS_PER_WEEK);
sum += realTaskWeeks;
}
En este ejemplo, sum no es un nombre especialmente útil, pero al menos
se puede buscar. Se usa una función más extensa, pero comprobará que
resulta mucho más fácil buscar WORK_DAYS_PER_WEEK que todas las instancias
de 5 y filtrar la lista a los casos con el significado adecuado.
Evitar codificaciones
-- 48 of 644 --

---

## [Sección 15] Introducción y Fundamentos

Ya tenemos suficientes codificaciones como para tener que añadir otras
nuevas. Al codificar información de tipos o ámbitos en un nombre se dificulta
la descodificación. No parece razonable que todos los nuevos empleados
tengan que aprender otro lenguaje de codificación además del código con el
que van a trabajar. Es una carga mental innecesaria a la hora de intentar
solucionar un problema. Los nombres codificados resultan impronunciables y
suelen escribirse de forma incorrecta.
Notación húngara
Antiguamente, cuando trabajábamos con lenguajes en los que la longitud de
los nombres era un reto, incumplíamos esta regla a nuestro pesar. Fortran
forzaba las codificaciones convirtiendo la primera letra de un tipo en código.
En sus primeras versiones, BASIC sólo se permitía una letra y un dígito. La
notación húngara (HN) lo llevó a un nuevo nivel.
HN se consideraba muy importante en el API C de Windows, donde todo
era un control entero, un puntero long, un puntero void o una de varias
implementaciones de string (con diferentes usos y atributos). Por aquel
entonces, el compilador no comprobaba los tipos, de modo que los
programadores tenían que recordarlos.
En los lenguajes modernos disponemos de sistemas de tipos más
completos y los compiladores recuerdan los tipos y los aplican. Es más,
existe una tendencia a usar clases y funciones más breves para que los
usuarios aprecien la declaración de las variables que usan.
Los programadores de Java no tienen que codificar tipos. Los objetos son
de tipos fuertes y los entornos de edición han avanzado tanto que detectan un
error de tipo antes de ejecutar la compilación. Por ello, en la actualidad HN y
otras formas de codificación de tipos no son más que un impedimento. Hacen
que sea más complicado cambiar el nombre o el tipo de una variable o clase.
Dificultan la legibilidad del código y pueden hacer que el sistema de
codificación confunda al lector:
PhoneNumber phoneString;
// el nombre no cambia cuando cambia el tipo
-- 49 of 644 --

Prefijos de miembros
Tampoco es necesario añadir m_ como prefijo a los nombres de variables. Las
clases y funciones tienen el tamaño necesario para no tener que hacerlo, y
debe usar un entorno de edición que resalte o coloree los miembros para
distinguirlos.
public class Part {
private String m_dsc; // La descripción textual
void setName(String name) {
m_dsc = name;
}
}
public class Part {
String description;
void setDescription(String description) {
this.description = description;
}
}
Además, los usuarios aprenden rápidamente a ignorar el prefijo (o sufijo)
y fijarse en la parte con sentido del nombre. Cuanto más código leemos,
menos nos fijamos en los prefijos. En última instancia, los prefijos son un
indicio de código antiguo.
Interfaces e Implementaciones
Existe un caso especial para usar codificaciones. Imagine por ejemplo que
crea una factoría abstracta para crear formas. Esta factoría será una interfaz y
se implementará por medio de una clase concreta. ¿Qué nombres debe
asignar? ¿IShapeFactory y ShapeFactory? Prefiero las interfaces sin
adornos. La I inicial, tan habitual en los archivos de legado actuales es, en el
mejor de los casos, una distracción, y en el peor, un exceso de información.
No quiero que mis usuarios sepan que se trata de una interfaz, solamente que
se trata de ShapeFactory. Si tengo que codificar la interfaz o la
implementación, opto por ésta última. Es mejor usar ShapeFactoryImp o
incluso CShapeFactory, que codificar la interfaz.
-- 50 of 644 --

Evitar asignaciones mentales
Los lectores no tienen que traducir mentalmente sus nombres en otros que ya
conocen. Este problema suele aparecer al elegir entre no usar términos de
dominio de problemas o de soluciones.
Es un problema de los nombres de variables de una sola letra. Un
contador de bucles se podría bautizar como i, j o k (pero nunca l) si su
ámbito es muy reducido y no hay conflictos con otros nombres, ya que los
nombres de una letra son tradicionales en contadores de bucles. Sin embargo,
en otros contextos, un nombre de una letra es una opción muy pobre: es como
un marcador de posición que el lector debe asignar mentalmente a un
concepto real. No hay peor motivo para usar el nombre c que a y b ya estén
seleccionados.
Por lo general, los programadores son gente inteligente. A la gente
inteligente le gusta presumir de sus habilidades mentales. Si puede recordar
que r es la versión en minúscula de una URL sin el host y el sistema, debe ser
muy listo.
Una diferencia entre un programador inteligente y un programador
profesional es que este último sabe que la claridad es lo que importa. Los
profesionales usan sus poderes para hacer el bien y crean código que otros
puedan entender.
Nombres de clases
Las clases y los objetos deben tener nombres o frases de nombre como
Customer, WikiPage, Account y AddressParser. Evite palabras como
Manager, Processor, Data, o Info en el nombre de una clase. El nombre de
una clase no debe ser un verbo.
Nombres de métodos
-- 51 of 644 --

---

## [Sección 16] Introducción y Fundamentos

Los métodos deben tener nombres de verbo como postPayment, deletePage
o save. Los métodos de acceso, de modificación y los predicados deben tener
como nombre su valor y usar como prefijo get, set e is de acuerdo al
estándar de javabean[9].
string name = employee.getName();
customer.setName(“mike”);
if (paycheck.isPosted())…
Al sobrecargar constructores, use métodos de factoría estáticos con
nombres que describan los argumentos. Por ejemplo:
Complex fulcrumPoint = Complex.FromRealNumber(23.0);
es mejor que:
Complex fulcrumPoint = new Complex(23.0);
Refuerce su uso convirtiendo en privados sus constructores
correspondientes.
No se exceda con el atractivo
Si los nombres son demasiado inteligentes,
sólo los recordarán los que compartan el
sentido del humor de su autor, y sólo
mientras se acuerden del chiste. ¿Sabrán
qué significa la función HolyHandGrenade?
Sin duda es atractiva, pero en este caso
puede que DeleteItems fuera más indicado. Opte por la claridad antes que
por el entretenimiento. En el código, el atractivo suele aparecer como formas
coloquiales o jergas. Por ejemplo, no use whack() en lugar de kill(). No
recurra a bromas culturales como eatMyShorts() si quiere decir abort().
Diga lo que piense. Piense lo que diga.
Una palabra por concepto
Elija una palabra por cada concepto abstracto y manténgala. Por ejemplo,
-- 52 of 644 --

resulta confuso usar fetch, retrieve y get como métodos equivalentes de
clases distintas. ¿Cómo va a recordar qué método se corresponde a cada
clase? Desafortunadamente, tendrá que recordar qué empresa, grupo o
individuo ha creado la biblioteca o clase en cuestión para recordar qué
término se ha empleado. En caso contrario, perderá mucho tiempo buscando
en encabezados y fragmentos de código.
Los entornos de edición modernos como Eclipse e IntelliJ ofrecen pistas
sensibles al contexto, como la lista de métodos que puede invocar en un
determinado objeto. Pero esta lista no suele incluir los comentarios de
nombres de funciones y listas de parámetros. Tendrá suerte si muestra los
nombres de parámetros de las declaraciones de funciones. Los nombres de
funciones deben ser independientes y coherentes para que pueda elegir el
método correcto sin necesidad de búsquedas adicionales.
Del mismo modo, resulta confuso tener un controlador, un administrador
y un control en la misma base de código. ¿Cuál es la diferencia entre
DeviceManager y ProtocolController? ¿Por qué no son los dos
controladores o administradores? ¿Son controladores? El nombre hace que
espere que dos objetos tengan un tipo diferente y clases diferentes.
Un léxico coherente es una gran ventaja para los programadores que
tengan que usar su código.
No haga juegos de palabras
Evite usar la misma palabra con dos fines distintos. Suele hacerse en juegos
de palabras. Si aplica la regla de una palabra por conceptos, acabará con
muchas clases que por ejemplo tengan un método add. Mientras las listas de
parámetros y los valores devueltos de los distintos métodos add sean
semánticamente equivalentes, no hay problema.
Sin embargo, alguien puede decidir usar la palabra add por motivos de
coherencia, aunque no sea en el mismo sentido. Imagine que hay varias
clases en las que add crea un nuevo valor sumando o concatenando dos
valores existentes. Imagine ahora que crea una nueva clase con un método
-- 53 of 644 --

que añada su parámetro a una colección. ¿Este método debe tener el método
add? Parece coherente ya que hay otros muchos métodos add, pero en este
caso hay una diferencia semántica, de modo que debemos usar un nombre
como insert o append. Llamar add al nuevo método sería un juego de
palabras.
Nuestro objetivo, como autores, es facilitar la comprensión del código.
Queremos que el código sea algo rápido, no un estudio exhaustivo. Queremos
usar un modelo en el que el autor sea el responsable de transmitir el
significado, no un modelo académico que exija investigar el significado
mostrado.
Usar nombres de dominios de soluciones
Recuerde que los lectores de su código serán programadores. Por ello, use
términos informáticos, algoritmos, nombres de patrones, términos
matemáticos y demás. No conviene extraer todos los nombres del dominio de
problemas ya que no queremos que nuestros colegas tengan que preguntar el
significado de cada nombre en especial cuando ya conocen el concepto bajo
otro nombre diferente.
El nombre AccountVisitor tiene mucho significado para un programador
familiarizado con el patrón VISITOR. ¿Qué programador no sabe lo que es
JobQueue? Hay cientos de cosas técnicas que los programadores tienen que
hacer y elegir nombres técnicos para dichas cosas suele ser lo más adecuado.
Usar nombres de dominios de problemas
Cuando no exista un término de programación para lo que esté haciendo, use
el nombre del dominio de problemas. Al menos el programador que
mantenga su código podrá preguntar el significado a un experto en dominios.
Separar los conceptos de dominio de soluciones y de problemas es parte
del trabajo de un buen programador y diseñador. El código que tenga más
relación con los conceptos del dominio de problemas tendrá nombres
-- 54 of 644 --

---

## [Sección 17] Introducción y Fundamentos

extraídos de dicho dominio.
Añadir contexto con sentido
Algunos nombres tienen significado por sí mismos, pero la mayoría no. Por
ello, debe incluirlos en un contexto, en clases, funciones y espacios de
nombres con nombres adecuados. Cuando todo lo demás falle, pueden usarse
prefijos como último recurso.
Imagine que tiene las variables firstName, lastName, street,
houseNumber, city, state y zipcode. Si las combina, es evidente que forman
una dirección. Pero si la variable state se usa de forma aislada en un
método, ¿sabría que forma parte de una dirección? Puede añadir contexto por
medio de prefijos: addrFirstName, addrLastName, addrState, etc. Al menos
los lectores comprenderán que estas variables forman parte de una estructura
mayor. Evidentemente, es mejor crear la clase Address. De ese modo, incluso
el compilador sabrá que las variables pertenecen a un concepto más amplio.
Fíjese en el método del Listado 2-1. ¿Las variables necesitan un contexto
con más sentido? El nombre de la función sólo ofrece parte del contexto, el
resto se obtiene del algoritmo. Tras leer la función, verá que las tres variables
number, verb y pluralModifier forman parte del mensaje guess
statistics. Desafortunadamente, es necesario inferir el contexto. Al leer el
método, el significado de las variables no es evidente.
Listado 2-1
Variables en un contexto ambiguo.
private void printGuessStatistics(char candidate, int count) {
String number;
String verb;
String pluralModifier;
if (count == 0) {
number = “no”;
verb = “are”;
pluralModifier = “s”;
} else if (count == 1) {
number = “1”;
-- 55 of 644 --

verb = “is”;
pluralModifier = “”;
} else {
number = Integer.toString(count);
verb = “are”;
pluralModifier = “s”;
}
String guessMessage = String.format(
“There %s %s %s%s”, verb, number, candidate, pluralModifier
);
print(guessMessage);
}
La función es demasiado extensa y las variables aparecen por todas
partes. Para dividir la función en fragmentos más reducidos necesitamos crear
una clase GuessStatisticsMessage y convertir a las tres variables en
campos de la misma. De este modo contamos con un contexto más obvio
para las tres variables. Forman parte sin duda de GuessStatisticsMessage.
La mejora del contexto también permite que el algoritmo sea más limpio y se
divida en funciones más reducidas (véase el Listado 2-2).
Listado 2-2
Variables con un contexto.
public class GuessStatisticsMessage (
private String number;
private String verb;
private String pluralModifier;
public String make(char candidate, int count) {
createPluralDependentMessageParts(count);
return String.format(
“There %s %s %s%s,
verb, number, candidate, pluralModifier);
}
private void createPluralDependentMessageParts(int count) {
if (count == 0) {
thereAreNoLetters();
} else if (cout == 1) {
thereIsOneLetter();
} else {
thereAreManyLetters(count);
}
}
private void thereAreManyLetters(int count) {
number = “1”;
-- 56 of 644 --

verb = “is”;
pluralModifier = “”;
}
private void thereIsOneLetter() {
number = “1”;
verb = “is”;
pluralModifier = “”;
}
private void thereAreNoLetters() {
number = “no”;
verb = “are”;
pluralModifier = “s”;
}
}
No añadir contextos innecesarios
En la aplicación imaginaria Gas Station Deluxe, no es aconsejable usar el
prefijo GSD en todas las clases. Es trabajar contra las herramientas
proporcionadas. Introduzca G y pulse la tecla de finalización para acceder a
una lista interminable de todas las clases del sistema. ¿Es lo correcto? ¿Por
qué dificultar la ayuda del IDE?
Del mismo modo, imagine que ha creado la clase MailingAddress en un
módulo de contabilidad de GSD, con el nombre GSDAccountAddress. Después,
necesita una dirección de correo para la aplicación de contacto con el cliente.
¿Usará GSDAccountAddress? ¿Le parece el nombre correcto? 10 de los 17
caracteres son redundantes o irrelevantes.
Los nombres breves suelen ser más adecuados que los extensos, siempre
que sean claros. No añada más contexto del necesario a un nombre. Los
nombres accountAddress y customerAddress son perfectos para instancias
de la clase Address pero no sirven como nombres de clase. Address sirve
como nombre de clase. Para distinguir entre direcciones MAC, direcciones de
puertos y direcciones Web, podría usar PostalAddress, MAC y URI. Los
nombres resultantes son más precisos, el objetivo de cualquier nombre.
-- 57 of 644 --

---

## [Sección 18] Introducción y Fundamentos

Conclusión
Lo más complicado a la hora de elegir un buen nombre es que requiere
habilidad descriptiva y acervo cultural. Es un problema de formación más
que técnico, empresarial o administrativo. Como resultado, mucha gente del
sector no aprende a hacerlo bien.
La gente teme que al cambiar los nombres otros programadores se quejen.
Nosotros no compartimos ese temor y agradecemos los cambios de nombre
(siempre que sean a mejor). En muchos casos no memorizamos los nombres
de clases y métodos. Usamos herramientas modernas para estos detalles y así
poder centrarnos en si el código se lee como frases o párrafos, o al menos
como tablas y estructuras de datos (una frase no siempre es la mejor forma de
mostrar datos). Seguramente acabará sorprendiendo a alguien cuando cambie
los nombres, como puede suceder con cualquier otra mejora del código. No
deje que le detenga.
Aplique estas reglas y compruebe si mejora o no la legibilidad de su
código. Si es el encargado de mantener código de terceros, use herramientas
para solucionar estos problemas. Obtendrá recompensas a corto y largo plazo.
-- 58 of 644 --
Funciones
-- 59 of 644 --

En los inicios de la programación, creábamos sistemas a partir de rutinas y
subrutinas. Después, en la época de Fortran y PL/1, creábamos nuestros
sistemas con programas, subprogramas y funciones. En la actualidad, sólo las
funciones han sobrevivido. Son la primera línea organizativa en cualquier
programa. En este capítulo veremos cómo crearlas.
Fíjese en el código del Listado 3-1. Es complicado encontrar una función
extensa en FitNesse[10], pero acabé encontrando ésta. No sólo es extensa, sino
que también contiene código duplicado, muchas cadenas y tipos de datos
extraños, además de API poco habituales y nada evidentes. Intente
-- 60 of 644 --

comprenderlo en los próximos tres minutos.
Listado 3-1
HtmlUtil.java (FitNesse 20070619).
public static String testableHtml {
PageData pageData,
boolean includeSuiteSetup
} throws Exception {
WikiPage wikiPage = pageData.getWikiPage();
StringBuffer buffer = new StringBuffer();
if (pageData.hasAttribute(“Test”)) {
if (includeSuiteSetup) {
WikiPage suiteSetup =
PageCrawlerImpl.getInheritedPage(
SuiteResponder.SUITE_SETUP_NAME, wikiPage
);
if (suiteSetup != null) {
WikiPagePath pagePath =
suiteSetup.getPageCrawler().getFullPath (suiteSetup);
String pagePathName = PathParser.render(pagePath);
buffer.append(“!include -setup .”)
.append(pagePathName)
.append(“\n”);
}
}
WikiPage setup =
PageCrawlerImpl.getInheritedPage(“SetUp”, wikiPage);
if (setup != null) {
WikiPagePath setupPath =
wikiPage.getPageCrawler().getFullPath(setup);
String setupPathName = PathParser.render(setupPath);
buffer.append(“!include -setup .”)
.append(setupPathName)
.append(“\n”);
}
}
buffer.append(pageData.getContent());
if (pageData.hasAttribute(“Test”)) {
WikiPage teardown =
PageCrawlerImpl.getInheritedPage(“TearDown”, wikiPage);
if (teardown != null) {
WikiPagePath tearDownPath =
wikiPage.getPageCrawler().getFullPath(teardown);
String tearDownPathName = PathParser.render(tearDownPath);
buffer.append(“\n”)
.append(“!include -teardown .”)
.append(tearDownPathName)
.append(“\n”);
}
if (includeSuiteSetup) {
-- 61 of 644 --

WikiPage suiteTeardown =
PageCrawlerImpl.getInheritedPage(
SuiteResponder.SUITE_TEARDOWN_NAME,
wikiPage
);
if (suiteTeardown != null) {
WikiPagePath pagePath =
suiteTeardown.getPageCrawler().getFullPath (suiteTeardown);
String pagePathName = PathParser.render(pagePath);
buffer.append(“!include -teardown .”)
.append(pagePathName)
.append(“\n”);
}
}
}
pageData.setContent(buffer.toString());
return pageData.getHtml();
}
¿Tras tres minutos entiende la función? Seguramente no. Pasan
demasiadas cosas y hay demasiados niveles de abstracción diferentes. Hay
cadenas extrañas e invocaciones de funciones mezcladas en instrucciones if
doblemente anidadas controladas por indicadores. Sin embargo, con sencillas
extracciones de código, algún cambio de nombres y cierta reestructuración,
pude capturar la intención de la función en las nueve líneas del Listado 3-2.
Compruebe si ahora la entiende.
Listado 3-2
HtmlUtil.java (refactorización).
public static String renderPageWithSetupsAndTeardowns(
PageData pageData, boolean isSuite
) throws Exception {
boolean isTestPage = pageData.hasAttribute(“Test”);
if (isTestPage) {
WikiPage testPage = pageData.getWikiPage();
StringBuffer newPageContent = new StringBuffer();
includeSetupPages (testPage, newPageContent, isSuite);
newPageContent.append(pageData.getContent());
includeTeardownPages(testPage, newPageContent, isSuite);
pageData.setContent(newPageContent.toString());
}
return pageData.getHtml();
}
A menos que sea un alumno de FitNesse, seguramente no entienda los
-- 62 of 644 --

---

## [Sección 19] Introducción y Fundamentos

detalles. Entenderá que la función se encarga de añadir páginas de
configuración y detalles en una página de prueba, que después muestra en
HTML. Si está familiarizado con JUnit[11], verá que esta función pertenece a
algún tipo de estructura de pruebas basada en la Web y, evidentemente, es
correcto. Resulta sencillo adivinar esta información del Listado 3-2 pero no
del Listado 3-1. ¿Qué tiene la función del Listado 3-2 para que resulte
sencilla de leer y entender? ¿Qué hay que hacer para que una función
transmita su intención? ¿Qué atributos podemos asignar a nuestras funciones
para que el lector pueda intuir el tipo de programa al que pertenecen?
Tamaño reducido
La primera regla de las funciones es que deben ser de tamaño reducido. La
segunda es que deben ser todavía más reducidas. No es una afirmación que
pueda justificar. No puedo mostrar referencias a estudios que demuestren que
las funciones muy reducidas sean mejores. Lo que sí puedo afirmar es que
durante casi cuatro décadas he creado funciones de diferentes tamaños. He
creado monstruos de casi 3000 líneas y otras muchas funciones de entre 100
y 300 líneas. También he creado funciones de 20 a 30 líneas de longitud. Esta
experiencia me ha demostrado, mediante ensayo y error, que las funciones
deben ser muy reducidas.
En la década de 1980 se decía que una función no debía superar el
tamaño de una pantalla. Por aquel entonces, las pantallas VT100 tenían 24
líneas por 80 columnas, y nuestros editores usaban 4 líneas para tareas
administrativas. En la actualidad, con una fuente mínima y un monitor de
gran tamaño, se pueden encajar 150 caracteres por línea y 100 líneas o más
en una pantalla. Las líneas no deben tener 150 caracteres. Las funciones no
deben tener 100 líneas de longitud. Las funciones deben tener una longitud
aproximada de 20 líneas.
¿Qué tamaño mínimo debe tener una función? En 1999 visité a Kent
Beck en su casa de Oregon. Nos sentamos y comenzamos a programar. Me
enseñó un atractivo programa de Java/Swing que había llamado Sparkle.
Generaba un efecto visual en pantalla, similar a la varita mágica del hada de
-- 63 of 644 --

Cenicienta. Al mover el ratón, salían estrellitas del cursor, y descendían a la
parte inferior de la pantalla en un campo gravitatorio simulado. Cuando Kent
me enseñó el código, me sorprendió la brevedad de las funciones. Estaba
acostumbrado a ver programas de Swing con funciones que ocupaban
kilómetros de espacio vertical. En este programa, las funciones tenían dos,
tres o cuatro líneas de longitud. Todas eran obvias. Todas contaban una
historia y cada una llevaba a la siguiente en un orden atractivo. ¡Así de breves
deberían ser todas las funciones![12]
¿Qué tamaño mínimo deben tener sus funciones? Deberían ser más
breves que las del Listado 3-2. De hecho, el Listado 3-2 debería reducirse
como el Listado 3-3.
Listado 3-3
HtmlUtil.java (nueva refactorización).
public static String renderPageWithSetupsAndTeardowns(
PageData pageData, boolean isSuite) throws Exception {
if (isTestPage(pageData))
includeSetupAndTeardownPages(pageData, isSuite);
return pageData.getHtml();
}
Bloques y sangrado
Esto implica que los bloques en instrucciones if, else, while y similares
deben tener una línea de longitud que, seguramente, sea la invocación de una
función. De esta forma, no sólo se reduce el tamaño de la función, sino que
también se añade valor documental ya que la función invocada desde el
bloque puede tener un nombre descriptivo. También implica que las
funciones no deben tener un tamaño excesivo que albergue estructuras
anidadas. Por tanto, el nivel de sangrado de una función no debe ser mayor de
uno o dos. Evidentemente, de esta forma las funciones son más fáciles de leer
y entender.
Hacer una cosa
-- 64 of 644 --

Es evidente que el Listado 3-1 hace más de
una cosa. Crea búferes, obtiene páginas,
busca páginas heredadas, añade cadenas
antiguas y genera HTML. El Listado 3-1
está muy ocupado realizando varias tareas.
Por su parte, el Listado 3-3 sólo hace una
cosa: incluye configuraciones y detalles en
páginas de prueba.
El siguiente consejo lleva vigente, de
una u otra forma, durante más de 30 años:
LAS FUNCIONES SÓLO DEBEN HACER UNA COSA. DEBEN
HACERLO BIEN Y DEBE SER LO ÚNICO QUE HAGAN.
El problema de esta afirmación es saber qué es una cosa. ¿El Listado 3-3
hace una cosa? Se podría pensar que hace tres:
1. Determinar si la página es una página de prueba.
2. En caso afirmativo, incluir configuraciones y detalles.
3. Representar la página en HTML.
¿Cuál será de las tres? ¿La función hace una o tres cosas? Los tres pasos
de la función se encuentran un nivel de abstracción por debajo del nombre de
la función. Podemos describir la función como un breve párrafo TO (PARA)
[13]:
Para renderPageWithSetupsAndTeardowns, comprobamos si la
página es de prueba y, en caso afirmativo, incluimos las
configuraciones y los detalles. En ambos casos, la representamos en
HTML.
Si una función sólo realiza los pasos situados un nivel por debajo del
nombre de la función, entonces hace una cosa. En definitiva, creamos
funciones para descomponer conceptos más amplios (es decir, el nombre de
-- 65 of 644 --

---

## [Sección 20] Introducción y Fundamentos

la función) en un conjunto de pasos en el siguiente nivel de abstracción. Es
evidente que el Listado 3-1 contiene pasos en distintos niveles de abstracción,
por lo que es obvio que hace más de una cosa. Incluso el Listado 3-2 tiene
tres niveles de abstracción, como ha demostrado la capacidad de reducirlo,
pero sería complicado reducir con sentido el Listado 3-3. Podríamos extraer
la instrucción if en la función includeSetupsAndTeardownsIfTestPage,
pero sólo reduciríamos el código sin cambiar el nivel de abstracción.
Por ello, otra forma de saber que una función hace más de una cosa es
extraer otra función de la misma con un nombre que no sea una reducción de
su implementación [G34].
Secciones en funciones
Fíjese en el Listado 4-7. Verá que la función generatePrimes se divide en
secciones como declaraciones, inicializaciones y filtros. Es un síntoma
evidente de que hace más de una cosa. Las funciones que hacen una sola cosa
no se pueden dividir en secciones.
Un nivel de abstracción por función
Para que las funciones realicen «una cosa», asegúrese de que las
instrucciones de la función se encuentran en el mismo nivel de abstracción.
El Listado 3-1 incumple esta regla. Incluye conceptos a un elevado nivel de
abstracción, como getHtml(); otros se encuentran en un nivel intermedio,
como StringpagePathName = PathParser.render(pagePath) y hay otros
en un nivel especialmente bajo, como .append(“\n”).
La mezcla de niveles de abstracción en una función siempre resulta
confusa. Los lectores no sabrán si una determinada expresión es un concepto
esencial o un detalle. Peor todavía, si se mezclan detalles con conceptos
esenciales, aumentarán los detalles dentro de la función.
-- 66 of 644 --

Leer código de arriba a abajo: la regla descendente
El objetivo es que el código se lea como un texto de arriba a abajo[14].
Queremos que tras todas las funciones aparezcan las del siguiente nivel de
abstracción para poder leer el programa, descendiendo un nivel de
abstracción por vez mientras leemos la lista de funciones. Es lo que
denomino la regla descendente.
Para decirlo de otra forma, queremos leer el programa como si fuera un
conjunto de párrafos TO, en el que cada uno describe el nivel actual de
abstracción y hace referencia a los párrafos TO posteriores en el siguiente
nivel.
Para incluir configuraciones y detalles, incluimos configuraciones,
después del contenido de la página de prueba, y por último los
detalles.
Para incluir las configuraciones, incluimos la configuración de suite
si se trata de una suite, y después la configuración convencional.
Para incluir la configuración de suite; buscamos la jerarquía
principal de la página SuiteSetUp y añadimos una instrucción
include con la ruta de dicha página.
Para buscar la jerarquía principal…
A los programadores les resulta complicado aprender esta regla y crear
funciones en un único nivel de abstracción, pero es un truco importante. Es la
clave para reducir la longitud de las funciones y garantizar que sólo hagan
una cosa. Al conseguir que el código se lea de arriba a abajo, se mantiene la
coherencia de los niveles de abstracción.
Fíjese en el Listado 3-7 del final del capítulo. Muestra la función
testableHtml modificada de acuerdo a estos principios. Cada función
presenta a la siguiente y se mantiene en un nivel de abstracción coherente.
Instrucciones Switch
-- 67 of 644 --

Es complicado usar una instrucción switch de tamaño reducido[15]. Aunque
sólo tenga dos casos, es mayor de lo que un bloque o función debería ser.
También es complicado crear una instrucción switch que haga una sola cosa.
Por su naturaleza, las instrucciones switch siempre hacen N cosas.
Desafortunadamente, no siempre podemos evitar las instrucciones switch
pero podemos asegurarnos de incluirlas en una clase de nivel inferior y de no
repetirlas. Para ello, evidentemente, recurrimos al polimorfismo.
Fíjese en el Listado 3-4. Muestra una de las operaciones que pueden
depender del tipo de empleado.
Listado 3-4
Payroll.java.
public Money calculatePay(Employee e)
throws InvalidEmployeeType (
switch (e.type) {
case COMMISSIONED:
return calculateCommissionedPay(e);
case HOURLY:
return calculateHourlyPay(e);
case SALARIED:
return calculateSalariedPay(e);
default:
throw new InvalidEmployeeType(e.type);
}
}
Esta función tiene varios problemas. Por un lado, es de gran tamaño y
cuando se añadan nuevos tipos de empleado, aumentará más. Por otra parte,
hace más de una cosa. También incumple el Principio de responsabilidad
única (Single Responsibility Principie o SRP)[16] ya que hay más de un
motivo para cambiarla. Además, incumple el Principio de abierto/cerrado
(Open Closed Principle u OCP)[17], ya que debe cambiar cuando se añadan
nuevos tipos, pero posiblemente el peor de los problemas es que hay un
número ilimitado de funciones que tienen la misma estructura.
Por ejemplo, podríamos tener:
isPayday(Employee e, Date date),
o
-- 68 of 644 --

---

## [Sección 21] Introducción y Fundamentos

deliverPay(Employee e, Date date),
o muchas otras, todas con la misma estructura.
La solución al problema (véase el Listado 3-5) consiste en ocultar la
instrucción switch en una factoría abstracta[18] e impedir que nadie la vea. La
factoría usa la instrucción switch para crear las instancias adecuadas de los
derivados de Employee y las distintas funciones, como calculatePay,
isPayday y deliverPay, se entregarán de forma polimórfica a través de la
interfaz Employee.
Listado 3-5
Employee y Factory.
public abstract class Employee {
public abstract boolean isPayday();
public abstract Money calculatePay();
public abstract void deliverPay(Money pay);
}
public interface EmployeeFactory {
public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}
public class EmployeeFactoryImpl implements EmployeeFactory {
public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType
{
switch (r.type) {
case COMMISSIONED:
return new CommissionedEmployee(r);
case HOURLY:
return new HourlyEmployee(r);
case SALARIED:
return new SalariedEmployee(r);
default:
throw new InvalidEmployeeType(r.type);
}
}
}
Mi regla general para las instrucciones switch es que se pueden tolerar si
sólo aparecen una vez, se usan para crear objetos polimórficos y se ocultan
tras una relación de herencia para que el resto del sistema no las pueda ver
[G23]. Evidentemente, cada caso es diferente y en ocasiones se puede
-- 69 of 644 --

incumplir una o varias partes de esta regla.
Usar nombres descriptivos
En el Listado 3-7, hemos cambiado el nombre de la función de ejemplo de
testableHtml a SetupTeardownIncluder.render. Es un nombre más
apropiado ya que describe mejor el cometido de la función. También hemos
asignado a los métodos privados un nombre descriptivo como isTestable o
includeSetupAndTeardownPages. No hay que olvidar el valor de los nombres
correctos. Recuerde el principio de Ward: «Sabemos que trabajamos con
código limpio cuando cada rutina es más o menos lo que esperábamos». Para
alcanzar este principio, gran parte del esfuerzo se basa en seleccionar
nombres adecuados para pequeñas funciones que hacen una cosa. Cuanto más
reducida y concreta sea una función, más sencillo será elegir un nombre
descriptivo. No tema los nombres extensos. Un nombre descriptivo extenso
es mucho mejor que uno breve pero enigmático. Use una convención de
nombres que permita leer varias palabras en los nombres de las funciones y
use esas palabras para asignar a la función un nombre que describa su
cometido.
No tema dedicar tiempo a elegir un buen nombre. De hecho, debería
probar con varios nombres y leer el código con todos ellos. Los IDE
modernos como Eclipse o IntelliJ facilitan el cambio de nombres. Use uno de
estos IDE y experimente con diferentes nombres hasta que encuentre uno que
sea lo bastante descriptivo.
La elección de nombres descriptivos clarifica el diseño de los módulos y
le permite mejorarlos. No es extraño que la búsqueda de nombres adecuados
genere una reestructuración favorable del código. Sea coherente con los
nombres. Use las mismas frases, sustantivos y verbos en los nombres de
función que elija para los módulos. Pruebe, por ejemplo, con
includeSetupAndTeardownPages, includeSetupPages,
includeSuiteSetupPage e includeSetupPage. La estructura similar de estos
nombres permite que la secuencia cuente una historia. En realidad, si ve la
secuencia anterior, seguramente se pregunte qué ha pasado con
-- 70 of 644 --

includeTeardownPages, includeSuiteTeardownPage e
includeTeardownPage.
Argumentos de funciones
El número ideal de argumentos para una
función es cero. Después uno (monádico) y
dos (diádico). Siempre que sea posible,
evite la presencia de tres argumentos
(triádico). Más de tres argumentos
(poliádico) requiere una justificación
especial y no es muy habitual.
Los argumentos son complejos ya que
requieren un gran poder conceptual. Por
ello suelo evitarlos en los ejemplos. Fíjese
en StringBuffer. Podríamos haberlo
pasado como argumento en lugar de como
variable de instancia, pero los lectores habrían tenido que interpretarlo cada
vez que lo vieran. Al leer la historia que cuenta el módulo,
includeSetupPage() es más sencillo de interpretar que
includeSetupPageInto(newPageContent). El argumento se encuentra en un
nivel de abstracción diferente que el nombre de la función y nos obliga a
conocer un detalle (StringBuffer) que no es especialmente importante en
ese momento.
Los argumentos son todavía más complicados desde un punto de vista de
pruebas. Imagine la dificultad de crear todos los casos de prueba para
garantizar el funcionamiento de las distintas combinaciones de argumentos.
Si no hay argumentos, todo es más sencillo. Si hay uno, no es demasiado
difícil. Con dos argumentos el problema es más complejo. Con más de dos
argumentos, probar cada combinación de valores adecuados es todo un reto.
Los argumentos de salida son más difíciles de entender que los de entrada. Al
leer una función, estamos acostumbrados al concepto de información añadida
-- 71 of 644 --

---

## [Sección 22] Introducción y Fundamentos

a la función a través de argumentos y extraída a través de un valor devuelto.
No esperamos que la información se devuelva a través de los argumentos. Por
ello, los argumentos de salida suelen obligamos a realizar una comprobación
doble.
Un argumento de salida es la mejor opción, después de la ausencia de
argumentos. SetupTeardownIncluder.render(pageData) se entiende bien.
Evidentemente, vamos a representar los datos en el objeto pageData.
Formas monádicas habituales
Hay dos motivos principales para pasar un solo argumento a una función.
Puede que realice una pregunta sobre el argumento, como en boolean
fileExists(“MyFile”), o que procese el argumento, lo transforme en otra
cosa y lo devuelva. Por ejemplo, InputStream fileOpen(“MyFile”)
transforma un nombre de archivo String en un valor devuelto InputStream.
Los usuarios esperan estos dos usos cuando ven una función. Debe elegir
nombres que realicen la distinción con claridad y usar siempre ambas formas
en un contexto coherente (consulte el apartado sobre separación de consultas
de comandos).
Una forma menos habitual pero muy útil para un argumento es un evento.
En esta forma, hay argumento de entrada pero no de salida. El programa debe
interpretar la invocación de la función como evento y usar el argumento para
alterar el estado del sistema, por ejemplo, void
passwordAttemptFailedNtimes(int attempts). Use esta forma con
precaución. Debe ser claro para el lector que se trata de un evento. Elija
nombres y contextos con atención. Intente evitar funciones monádicas que no
tengan estas formas, por ejemplo, void
includeSetupPageInto(StringBuffer pageText). El uso de un argumento
de salida en lugar de un valor devuelto para realizar transformaciones resulta
confuso. Si una función va a transformar su argumento de entrada, la
transformación debe aparecer como valor devuelto. Sin duda
StringBuffertransform(StringBuffer in) es mejor que void
-- 72 of 644 --

transform(StringBuffer out), aunque la implementación del primer caso
devuelva solamente el argumento de entrada. Al menos se ajusta a la forma
de la transformación.
Argumentos de indicador
Los argumentos de indicador son horribles. Pasar un valor Booleano a una
función es una práctica totalmente desaconsejable. Complica inmediatamente
la firma del método e indica que la función hace más de una cosa. Hace algo
si el indicador es true y otra cosa diferente si es false. En el Listado 3-7 no
se puede evitar, porque los invocadores ya pasan el indicador y el objetivo
era limitar el ámbito a la función y después, pero la invocación de render
(true) es confusa para el lector. Si se desplaza el ratón sobre la invocación
vemos que render (boolean isSuite) puede ayudar, pero no demasiado.
Tendremos que dividir la función en dos: renderForSuite() y
renderForSingleTest().
Funciones diádicas
Una función con dos argumentos es más difícil de entender que una función
monádica. Por ejemplo writeField(name) es más fácil de entender que
writeField (outputStream, name)[19]. Aunque en ambos casos el
significado es evidente, la primera se capta mejor visualmente. La segunda
requiere una breve pausa hasta que ignoramos el segundo parámetro, lo que
en última instancia genera problemas ya que no debemos ignorar esa parte
del código. Las partes que ignoramos son las que esconden los errores. Pero
en ocasiones se necesitan dos argumentos. Por ejemplo. Point p = new
Point(0,0); es totalmente razonable. Los puntos cartesianos suelen adoptar
dos argumentos. De hecho, sería muy sorprendente ver Point(0). Sin
embargo, en este caso ambos argumentos son componentes ordenados de un
mismo valor, mientras que outputStream y name carecen de una cohesión o
un orden natural.
-- 73 of 644 --

Incluso funciones diádicas evidentes como assertEquals(expected,
actual) resultan problemáticas. ¿Cuántas veces ha incluido el valor real en
su posición esperada? Los dos argumentos carecen de un orden natural. El
orden real y esperado es una convención que se adquiere gracias a la práctica.
Las combinaciones diádicas no son el mal en persona y tendrá que
usarlas. Sin embargo, recuerde que tienen un precio y que debe aprovechar
los mecanismos disponibles para convertirlas en unitarias. Por ejemplo,
puede hacer que el método writeField sea un miembro de outputStream
para poder usar outputStream.writeField(name), o podría convertir
outputStream en una variable miembro de la clase actual para no tener que
pasarla. Incluso podría extraer una nueva clase como FieldWriter que usara
outputStream en su constructor y tuviera un método write.
Triadas
Las funciones que aceptan tres argumentos son sin duda mucho más difíciles
de entender que las de dos. Los problemas a la hora de ordenar, ignorar o
detenerse en los argumentos se duplican. Piense atentamente antes de crear
una triada.
Por ejemplo, fíjese en la sobrecarga de assertEquals que acepta tres
argumentos: assertEquals(message, expected, actual). ¿Cuántas veces
lee el mensaje y piensa que es lo esperado? He visto esta triada en concreto
muchas veces. De hecho, siempre que la veo, tengo que repasarla antes de
ignorar el mensaje.
Por otra parte, hay otra triada que no es tan negativa: assertEquals(1.0,
amount, .001). Aunque también exija doble atención, merece la pena.
Conviene recordar siempre que la igualdad de los valores de coma flotante es
algo relativo.
Objeto de argumento
Cuando una función parece necesitar dos o más argumentos, es probable que
-- 74 of 644 --

---

## [Sección 23] Introducción y Fundamentos

alguno de ellos se incluya en una clase propia. Fíjese en la diferencia entre las
dos siguientes declaraciones:
Circle makeCircle (double x, double y, double radius);
Circle makeCircle(Point center, double radius);
La reducción del número de argumentos mediante la creación de objetos
puede parecer una trampa pero no lo es. Cuando se pasan grupos de variables
de forma conjunta, como x e y en el ejemplo anterior, es probable que formen
parte de un concepto que se merece un nombre propio.
Listas de argumentos
En ocasiones tendremos que pasar un número variable de argumentos a una
función. Fíjese en el método String.format:
String.format (“%s worked %.2f hours.”, name, hours);
Si los argumentos variables se procesan de la misma forma, como en el
ejemplo anterior, serán equivalentes a un único argumento de tipo List. Por
tanto, String.format es en realidad diádico. De hecho, la siguiente
declaración de String.format es claramente diádica.
public String format(String format, Object… args)
Así pues, se aplican las mismas reglas. Las funciones que aceptan
argumentos variables pueden ser monádicas, diádicas o incluso triádicas, pero
sería un error asignar más argumentos.
void monad(Integer… args);
void dyad(String name, Integer… args);
void triad(String name, int count, Integer… args);
Verbos y palabras clave
La selección de nombres correctos para una función mejora la explicación de
su cometido, así como el orden y el cometido de los argumentos. En formato
monádico, la función y el argumento deben formar un par de verbo y
sustantivo. Por ejemplo, write(name) resulta muy evocador. Sea lo que sea
name, sin duda se escribe (write).
-- 75 of 644 --

Un nombre más acertado podría ser writeField(name), que nos dice que
name es un campo (field). Éste es un ejemplo de palabra clave como
nombre de función. Con este formato codificamos los nombres de los
argumentos en el nombre de la función. Por ejemplo, assertEquals se podría
haber escrito como assertExpectedEqualsActual(expected, actual), lo
que mitiga el problema de tener que recordar el orden de los argumentos.
Sin efectos secundarios
Los efectos secundarios son mentiras. Su función promete hacer una cosa,
pero también hace otras cosas ocultas. En ocasiones realiza cambios
inesperados en las variables de su propia clase. En ocasiones las convierte en
las variables pasadas a la función o a elementos globales del sistema. En
cualquier caso, se comete un engaño que suele provocar extrañas
combinaciones temporales y dependencias de orden.
Fíjese en la función del Listado 3-6, aparentemente inofensiva. Usa un
algoritmo estándar para comparar userName con password. Devuelve true si
coinciden y false si hay algún problema, pero también hay un efecto
secundario. ¿Lo detecta?
Listado 3-6
UserValidator.java.
public class UserValidator {
private Cryptographer cryptographer;
public boolean checkPassword(String userName, String password) {
User user = UserGateway.findByName(userName);
if (user != User.NULL) {
String codedPhrase = user.getPhraseEncodedByPassword();
String phrase = cryptographer.decrypt(codedPhrase, password);
if (“Valid Password”.equals(phrase)){
Session.initialize();
return true;
}
}
return false;
}
-- 76 of 644 --

}
El efecto secundario es la invocación de Session.initialize(). La
función checkPassword, por su nombre, afirma comprobar la contraseña. El
nombre no implica que inicialice la sesión. Por tanto, un invocador que se
crea lo que dice el nombre de la función se arriesga a borrar los datos de
sesión actuales cuando decida comprobar la validez del usuario. Este efecto
secundario genera una combinación temporal. Es decir, sólo se puede invocar
checkPassword en determinados momentos (cuando se pueda inicializar la
sesión). Si no se invoca en orden, se pueden perder los datos de la sesión. Las
combinaciones temporales son confusas, en especial cuando se ocultan como
efecto secundario. Si tiene que realizar una combinación temporal, hágalo de
forma clara en el nombre de la función. En este caso, podríamos cambiar el
nombre de la función por checkPasswordAndInitializeSession, pero
incumpliría la norma de hacer una sola cosa.
Argumentos de salida
Los argumentos suelen interpretarse como entradas de una función. Si lleva
varios años programando, estoy seguro de que habrá visto un argumento que
en vez de ser de entrada era de salida. Por ejemplo;
appendFooter(s);
¿Está función añade s al final de algo? ¿O añade el final de algo a s? ¿s
es una entrada o una salida? Lo sabemos al ver la firma de la función:
public void appendFooter(StringBuffer report)
Esto lo aclara todo, pero para ello hay que comprobar la declaración de la
función. Todo lo que le obligue a comprobar la firma de la función es un
esfuerzo doble. Es una pausa cognitiva y debe evitarse.
Antes de la programación orientada a objetos, era necesario tener
argumentos de salida. Sin embargo, gran parte de su necesidad desaparece en
los lenguajes orientados a objetos, pensados para actuar como argumento de
salida. Es decir, sería más indicado invocar appendFooter como
report.appendFooter();.
Por lo general, los argumentos de salida deben evitarse. Si su función
-- 77 of 644 --

---

## [Sección 24] Introducción y Fundamentos

tiene que cambiar el estado de un elemento, haga que cambie el estado de su
objeto contenedor.
Separación de consultas de comando
Las funciones deben hacer algo o responder a algo, pero no ambas cosas. Su
función debe cambiar el estado de un objeto o devolver información sobre el
mismo, pero ambas operaciones causan confusión. Fíjese en la siguiente
función:
public boolean set(String attribute, String value);
Esta función establece el valor de un atributo y devuelve true en caso de
éxito o false si el atributo no existe. Esto provoca la presencia de una
extraña instrucción como la siguiente:
if (set(“username”, “unclebob”))…
Imagínelo desde el punto de vista del lector. ¿Qué significa? ¿Pregunta si
el atributo «username» se ha establecido antes en «unclebob», o si el atributo
«username» se ha establecido correctamente en «unclebob»? Es complicado
saberlo por la invocación ya que no es evidente si set es un verbo o un
adjetivo.
El autor pretendía que set fuera un verbo, pero el contexto de la
instrucción if parece un adjetivo. La instrucción se lee como «si el atributo
username se ha establecido previamente en unclebob», no como «establecer
el atributo username en unclebob y si funciona, entonces…». Podríamos
solucionarlo si cambiamos el nombre de la función set por
setAndCheckIfExists, pero no mejoraría la legibilidad de la instrucción if.
La verdadera solución es separar el comando de la consulta para evitar la
ambigüedad.
if (attributeExists(“username”)) {
setAttribute(“username”, “unclebob”);
…
}
-- 78 of 644 --

Mejor excepciones que devolver códigos de error
Devolver códigos de error de funciones de comando es un sutil
incumplimiento de la separación de comandos de consulta. Hace que los
comandos usados asciendan a expresiones en los predicados de las
instrucciones if.
if (deletePage(page) == E_OK)
No padece la confusión entre verbo y adjetivo, pero genera estructuras
anidadas. Al devolver un código de error se crea un problema: el invocador
debe procesar el error de forma inmediata.
if (deletePage(page) == E_OK) {
if (registry.deleteReference(page.name) == E_OK) {
if (configKeys.deleteKey(page.name.makeKey()) == E_OK) {
logger.log(“page deleted”);
} else {
logger.log(“configKey not deleted”);
}
} else {
logger.log(“deleteReference from registry failed”);
}
} else {
logger.log(“delete failed”);
return E_ERROR;
}
Por otra parte, si usa excepciones en lugar de códigos de error, el código
de procesamiento del error se puede separar del código de ruta y se puede
simplificar:
try {
deletePage(page);
registry.deleteReference(page.name);
configKeys.deleteKey(page.name.makeKey());
}
catch (Exception e) {
logger.log(e.getMessage());
}
Extraer bloques Try/Catch
Los bloques try/catch no son atractivos por naturaleza. Confunden la
estructura del código y mezclan el procesamiento de errores con el normal.
-- 79 of 644 --

Por ello, conviene extraer el cuerpo de los bloques try y catch en funciones
individuales.
public void delete(Page page) {
try {
deletePageAndAllReferences(page);
}
catch (Exception e) {
logError(e);
}
}
private void deletePageAndAllReferences(Page page) throws Exception {
deletePage(page);
registry.deleteReference(page.name);
configKeys.deleteKey(page.name.makeKey());
}
private void logError(Exception e) {
logger.log(e.getMessage());
}
En este caso, la función delete es de procesamiento de errores. Es fácil
de entender e ignorar. La función deletePageAndAllReferences es para los
procesos de borrar una página. El procesamiento de errores se puede ignorar.
De este modo, la separación facilita la comprensión y la modificación del
código.
El procesamiento de errores es una cosa
Las funciones sólo deben hacer una cosa y el procesamiento de errores es un
ejemplo. Por tanto, una función que procese errores no debe hacer nada más.
Esto implica (como en el ejemplo anterior) que, si una función incluye la
palabra clave try, debe ser la primera de la función y que no debe haber nada
más después de los bloques catch/finally.
El imán de dependencias Error.java
La devolución de códigos de error suele implicar que existe una clase o
enumeración en la que se definen los códigos de error.
public enum Error {
-- 80 of 644 --

---

## [Sección 25] Introducción y Fundamentos

OK,
INVALID,
NO_SUCH,
LOCKED,
OUT_OF_RESOURCES,
WAITING_FOR_EVENT;
}
Clases como ésta son un imán para las dependencias; otras muchas clases
deben importarlas y usarlas. Por ello, cuando cambia la enumeración Error,
es necesario volver a compilar e implementar dichas clases[20]. Esto añade
presión a la clase Error. Los programadores no quieren añadir nuevos errores
porque tendrán que volver a generar e implementarlo todo. Por ello, reutilizan
códigos de error antiguos en lugar de añadir otros nuevos.
Al usar excepciones en lugar de códigos de error, las nuevas excepciones
son derivaciones de la clase de la excepción. Se pueden añadir sin necesidad
de volver a compilar o implementar[21].
No repetirse[22]
Fíjese de nuevo en el Listado 3-1; verá que
hay un algoritmo que se repite cuatro veces,
en los casos SetUp, SuiteSetUp, TearDown
y SuiteTearDown. No es fácil detectar esta
repetición ya que las cuatro instancias se
mezclan con otro código, pero la
duplicación es un problema ya que aumenta el tamaño del código y requerirá
una modificación cuádruple si alguna vez cambia el algoritmo.
También se cuadriplica el riesgo de errores.
Esta duplicación se remedia gracias al método include del Listado 3-7.
Vuelva a leer el código y fíjese en cómo se ha mejorado la legibilidad del
código reduciendo la duplicación.
La duplicación puede ser la raíz de todos los problemas del software.
Existen numerosos principios y prácticas para controlarla o eliminarla.
Imagine que todas las formas normales de la base de datos de Codd sirvieran
-- 81 of 644 --

para eliminar la duplicación de datos. Imagine también cómo la
programación orientada a objetos concentra el código en clases base que en
otros casos serian redundantes. La programación estructurada, la
programación orientada a aspecto y la orientada a componentes son, en parte,
estrategias para eliminar duplicados. Parece que, desde la aparición de las
subrutinas, las innovaciones en desarrollo de software han sido un intento
continuado por eliminar la duplicación de nuestro código fuente.
Programación estructurada
Algunos programadores siguen las reglas de programación estructurada de
Edsger Dijkstra[23]. Dijkstra afirma que todas las funciones y todos los
bloques de una función deben tener una entrada y una salida. Estas reglas
implican que sólo debe haber una instrucción return en una función, que no
debe haber instrucciones break o continue en un bucle y nunca, bajo ningún
concepto, debe haber instrucciones goto.
Aunque apreciemos los objetivos y disciplinas de la programación
estructurada, no sirven de mucho cuando las funciones son de reducido
tamaño. Su verdadero beneficio se aprecia en funciones de gran tamaño.
Por tanto, si sus funciones son de tamaño reducido, una instrucción
return, break o continue no hará daño alguno y en ocasiones puede resultar
más expresiva que la regla de una entrada y una salida. Por otra parte, goto
sólo tiene sentido en funciones de gran tamaño y debe evitarse.
Cómo crear este tipo de funciones
La creación de software es como cualquier otro proceso creativo. Al escribir
un informe o un artículo, primero se estructuran las ideas y después el
mensaje hasta que se lea bien. El primer borrador puede estar desorganizado,
de modo que lo retoca y mejora hasta que se lea de la forma adecuada.
Cuando creo funciones, suelen ser extensas y complicadas, con
abundancia de sangrados y bucles anidados. Con extensas listas de
-- 82 of 644 --

argumentos, nombres arbitrarios y código duplicado, pero también cuento
con una serie de pruebas de unidad que abarcan todas y cada una de las líneas
de código.
Por tanto, retoco el código, divido las funciones, cambio los nombres y
elimino los duplicados. Reduzco los métodos y los reordeno. En ocasiones,
elimino clases enteras, mientras mantengo las pruebas.
Al final, consigo funciones que cumplen las reglas detalladas en este
capítulo. No las escribo al comenzar y dudo que nadie pueda hacerlo.
Conclusión
Todo sistema se crea a partir de un lenguaje específico del dominio diseñado
por los programadores para describir dicho sistema. Las funciones son los
verbos del lenguaje y las clases los sustantivos. No es volver a la noción de
que los sustantivos y verbos de un documento de requisitos son las clases y
funciones de un sistema. Es una verdad mucho más antigua. El arte de la
programación es, y ha sido siempre, el arte del diseño del lenguaje.
Los programadores experimentados piensan en los sistemas como en
historias que contar, no como en programas que escribir. Recurren a las
prestaciones del lenguaje de programación seleccionado para crear un
lenguaje expresivo mejor y más completo que poder usar para contar esa
historia. Parte de ese lenguaje es la jerarquía de funciones que describen las
acciones que se pueden realizar en el sistema. Dichas acciones se crean para
usar el lenguaje de dominio concreto que definen para contar su pequeña
parte de la historia.
En este capítulo hemos visto la mecánica de la creación de funciones
correctas. Si aplica estas reglas, sus funciones serán breves, con nombres
correctos, y bien organizadas, pero no olvide que su verdadero objetivo es
contar la historia del sistema y que las funciones que escriba deben encajar en
un lenguaje claro y preciso que le sirva para contar esa historia.
SetupTeardownIncluder
-- 83 of 644 --

---

## [Sección 26] Introducción y Fundamentos

Listado 3-7
SetupTeardownIncluder.java.
package fitnesse.html;
import fitnesse.responders.run.SuiteResponder;
import fitnesse.wiki.*;
public class SetupTeardownIncluder {
private PageData pageData;
private boolean isSuite;
private WikiPage testPage;
private StringBuffer newPageContent;
private PageCrawler pageCrawler;
public static String render(PageData pageData) throws Exception {
return render(pageData, false);
}
public static String render(PageData pageData, boolean isSuite)
throws Exception {
return new SetupTeardownIncluder(pageData).render(isSuite);
}
private SetupTeardownIncluder(PageData pageData) {
this.pageData = pageData;
testPage = pageData.getWikiPage();
pageCrawler = testPage.getPageCrawler();
newPageContent = new StringBuffer();
}
private String render(boolean isSuite) throws Exception {
this.isSuite = isSuite;
if (isTestPage())
includeSetupAndTeardownPages();
return pageData.getHtml();
}
private boolean isTestPage() throws Exception {
return pageData.hasAttribute(“Test”);
}
private void includeSetupAndTeardownPages() throws Exception {
includeSetupPages();
includePageContent();
includeTeardownPages();
updatePageContent();
}
private void includeSetupPages() throws Exception {
if (isSuite)
includeSuiteSetupPage();
includeSetupPage();
}
-- 84 of 644 --

private void includeSuiteSetupPage() throws Exception {
include(SuiteResponder.SUITE_SETUP_NAME, “-setup”);
}
private void includeSetupPage() throws Exception {
include(“SetUp”, “-setup”);
}
private void includePageContent() throws Exception {
newPageContent.append(pageData.getContent());
}
private void includeTeardownPages() throws Exception {
includeTeardownPage();
if (isSuite)
includeSuiteTeardownPage();
}
private void includeTeardownPage() throws Exception {
include(“TearDown”, “-teardown”);
}
private void includeSuiteTeardownPage() throws Exception {
include(SuiteResponder.SUITE_TEARDOWN_NAME, “-teardown”);
}
private void updatePageContent() throws Exception {
pageData.setContent(newPageContent.toString());
}
private void include(String pageName, String arg) throws Exception (
WikiPage inheritedPage = findInheritedPage(pageName);
if (inheritedPage != null) {
String pagePathName = getPathNameForPage(inheritedPage);
buildIncludeDirective(pagePathName, arg);
}
}
private WikiPage findInheritedPage(String pageName) throws Exception {
return PageCrawlerImpl.getInheritedPage(pageName, testPage);
}
private String getPathNameForPage(WikiPage page) throws Exception {
WikiPagePath pagePath = pageCrawler.getFullPath(page);
return PathParser.render(pagePath);
}
private void buildIncludeDirective(String pagePathName, String arg) {
newPageContent
.append(“\n!include ”)
.append(arg)
.append(“ .”)
.append(pagePathName)
.append(“\n”);
}
-- 85 of 644 --

}
Bibliografía
[KP78]: Kernighan and Plaugher, The Elements of Programming Style,
2d. ed., McGraw-Hill, 1978.
[PPP02]: Robert C. Martin, Agile Software Development: Principles,
Patterns, and Practices, Prentice Hall, 2002.
[GOF]: Design Patterns: Elements of Reusable Object Oriented
Software, Gamma et al., Addison Wesley, 1996.
[PRAG]: The Pragmatic Programmer, Andrew Hunt, Dave Thomas,
Addison-Wesley, 2000.
[SP72]: Structured Programming, O. J. Dahl, E. W. Dijkstra, C. A. R.
Hoare, Academic Press, London, 1972.
-- 86 of 644 --
Comentarios
«No comente el código incorrecto, reescríbalo».
Brian W. Kernighan y P. J. Plaugher[24]
No hay nada más útil que un comentario bien colocado. No hay nada que
colapse más un módulo que comentarios dogmáticos innecesarios. No hay
nada más dañino que un comentario antiguo que propague mentiras y
desinformación.
Los comentarios no son como la Lista de Schindler. No son pura bondad.
De hecho, en el mejor de los casos, son un mal necesario. Si los lenguajes de
-- 87 of 644 --

programación fueran más expresivos o si pudiéramos dominarlos para
expresar nuestras intenciones, no necesitaríamos demasiados comentarios,
puede que incluso ninguno.
El uso correcto de los comentarios permite compensar nuestra
incapacidad para expresarnos en el código. He usado la palabra incapacidad,
a propósito. Los comentarios siempre son fallos. Debemos usarlos porque no
siempre sabemos cómo expresarnos sin ellos pero su uso no es motivo de
celebración.
Cuando tenga que escribir un comentario, piense si no existe otra forma
de expresarse en el código. Siempre que se exprese en el código, debe
felicitarse. Siempre que escriba un comentario, debe hacer un gesto de
desaprobación y sentir su incapacidad para expresarse.
¿Por qué estoy en contra de los comentarios? Porque mienten. No
siempre y no siempre intencionadamente, pero lo hacen. Cuando más antiguo
es un comentario y más se aleja del código que describe, mayor es la
probabilidad de que sea equivocado. El motivo es sencillo. Los
programadores no los pueden mantener.
El código cambia y evoluciona. Los fragmentos cambian de lugar, se
bifurcan, se reproducen y se vuelven a combinar para crear quimeras.
Desafortunadamente, los comentarios no siempre siguen el ritmo, no siempre
pueden hacerlo y suelen separarse del código que describen y se convierten
en huérfanos sin precisión alguna. Por ejemplo, fíjese en lo que sucede con
este comentario y la línea que pretendía describir:
MockRequest request;
private final String HTTP_DATE_REGEXP =
“[SMTWF][a-z]{2}\\,\\s[0-9]{2}\\s[JFMASOND][a-z]{2}\\s” +
“[0-9]{4}\\s[0-9]{2}\\:[0-9]{2}\\:[0-9]{2}\\sGMT”;
private Response response;
private FitNesseContext context;
private FileResponder responder;
private Locale saveLocale;
// Ejemplo: «Tue, 02 Apr 2003 22:18:49 GMT»
Seguramente se añadieron después otras variables de instancia entre la
constante HTTP_DATE_REGEXP y su comentario explicativo.
Se podría afirmar que los programadores deben ser lo bastante
disciplinados como para mantener los comentarios actualizados, relevantes y
precisos. De acuerdo, debería, pero esa energía debería invertirse en crear
-- 88 of 644 --

---

## [Sección 27] Introducción y Fundamentos

código claro y expresivo que no necesite comentario alguno.
Los comentarios imprecisos son mucho peor que la ausencia de
comentarios. Suelen confundir al usuario. Generan expectativas que nunca se
cumplen. Definen reglas que no deben seguirse en absoluto.
La verdad sólo se encuentra en un punto: el código. Sólo el código puede
contar lo que hace. Es la única fuente de información precisa. Por tanto,
aunque los comentarios sean necesarios en ocasiones, dedicaremos nuestra
energía a minimizarlos.
Los comentarios no compensan el código incorrecto
Una de las principales motivaciones para crear comentarios es el código
incorrecto. Creamos un módulo y sabemos que es confuso y está
desorganizado. Sabemos que es un desastre y entonces decidimos
comentarlo. Error. Mejor límpielo.
El código claro y expresivo sin apenas comentarios es muy superior al
código enrevesado y complejo con multitud de comentarios. En lugar de
perder tiempo escribiendo comentarios que expliquen el desastre cometido,
dedíquelo a solucionarlo.
Explicarse en el código
En ocasiones, el código es un pobre vehículo de expresión.
Desafortunadamente, muchos programadores lo entienden como que el
código no es un buen medio de expresión. Esto es falso. ¿Qué prefiere ver?
Esto:
// Comprobar si el empleado tiene derecho a todos los beneficios
if ((employee.flags & HOURLY_FLAG) &&
(employee.age > 65))
o esto otro:
if (employee.isEligibleForFullBenefits())
Apenas se tardan unos segundos en explicar nuestras intenciones en el
código. En muchos casos, basta con crear una función que diga lo mismo que
-- 89 of 644 --

el comentario que pensaba escribir.
Comentarios de calidad
Algunos comentarios son necesarios o beneficiosos. Veremos algunos de los
que considero válidos. No obstante, recuerde que el único comentario
realmente bueno es el que no tiene que escribir.
Comentarios legales
En ocasiones, nuestros estándares corporativos de creación de código nos
obligan a crear determinados comentarios por motivos legales. Por ejemplo,
los comentarios de derechos de autor son necesarios y deben incluirse al
inicio de cada archivo.
El siguiente encabezado de comentario se incluye de forma estándar al
inicio de todos los archivos fuente de FitNesse. Nuestro IDE evita que este
comentario parezca sobrante replegándolo de forma automática.
// Copyright (C) 2003,2004,2005 de Object Mentor, Inc. Todos los derechos
reservados.
// Publicado bajo las condiciones de la Licencia pública general GNU versión
2 o posterior.
Este tipo de comentarios no deben ser contratos ni tomos legales. Siempre
que sea posible, haga referencia a una licencia estándar o a otro documento
externo en lugar de incluir todos los términos y condiciones en el comentario.
Comentarios informativos
En ocasiones es útil proporcionar información básica con un comentario. Por
ejemplo, el siguiente comentario explica el valor devuelto por un método
abstracto:
// Devuelve una instancia del elemento Responder probado.
protected abstract Responder responderInstance();
Estos comentarios pueden ser útiles, pero es mejor usar el nombre de la
función para transmitir la información siempre que sea posible. Por ejemplo,
-- 90 of 644 --

en este caso el comentario sería redundante si cambiamos el nombre de la
función por responderBeingTested. Veamos un ejemplo mejor:
// el formato coincide con kk:mm:ss EEE, MMM dd, yyyy
Pattern timeMatcher = Pattern.compile(
“\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*”);
En este caso, el comentario nos indica que la expresión regular debe
coincidir con una fecha y una hora con el formato aplicado por la función
SimpleDateFormat.format con la cadena de formato especificada.
Hubiera resultado mejor y más claro si el código se hubiera cambiado a
una clase especial que convirtiera los formatos de fechas y horas. De ese
modo el comentario habría sido superfluo.
Explicar la intención
En ocasiones, un comentario es algo más que información útil sobre la
implementación y proporciona la intención de una decisión. En el siguiente
caso, vemos una interesante decisión documentada por un comentario. Al
comparar dos objetos, el autor decidió ordenar los objetos de su clase por
encima de los objetos de otra.
public int compareTo(Object o)
{
if (o instanceof WikiPagePath)
{
WikiPagePath p = (WikiPagePath) o;
String compressedName = StringUtil.join(names, “”);
String compressedArgumentName = StringUtil.join(p.names, “”);
return compressedName.compareTo(compressedArgumentName);
}
return 1; // somos mayores porque somos el tipo correcto.
}
Veamos otro ejemplo mejor. Puede que no esté de acuerdo con la
solución del programador, pero al menos sabe lo que intentaba hacer.
public void testConcurrentAddWidgets() throws Exception {
WidgetBuilder widgetBuilder =
new WidgetBuilder(new Class[](BoldWidget.class));
String text = “‘‘‘bold text’’’”;
ParentWidget parent =
new BoldWidget(new MockWidgetRoot(), “‘‘‘bold text’’’”);
AtomicBoolean failFlag = new AtomicBoolean();
failFlag.set(false);
-- 91 of 644 --

---

## [Sección 28] Introducción y Fundamentos

//Nuestro mejor intento de obtener una condición de carrera
//creando un gran número de procesos.
for (int i = 0; i < 25000; i++) {
WidgetBuilderThread widgetBuiIderThread =
new WidgetBuilderThread(WidgetBuilder, text, parent, failFlag);
Thread thread = new Thread(WidgetBuilderThread);
thread.start();
}
assertEquals(false, failFlag.get());
}
Clarificación
En ocasiones, basta con traducir el significado de un argumento o valor
devuelto en algo más legible. Por lo general, conviene buscar la forma de que
el argumento o el valor devuelto sean claros por sí mismos; pero cuando
forma parte de una biblioteca estándar o de código que no se puede alterar, un
comentario aclarativo puede ser muy útil.
public void testCompareTo() throws Exception
{
WikiPagePath a = PathParser.parse(“PageA”);
WikiPagePath ab = PathParser.parse(“PageA.PageB”);
WikiPagePath b = PathParser.parse(“PageB”);
WikiPagePath aa = PathParser.parse(“PageA.PageA”);
WikiPagePath bb = PathParser.parse(“PageB.PageB”);
WikiPagePath ba = PathParser.parse(“PageB.PageA”);
assertTrue(a.compareTo(a) == 0); // a == a
assertTrue(a.compareTo(b) != 0); // a != b
assertTrue(ab.compareTo(ab) == 0); // ab == ab
assertTrue(a.compareTo(b) == -1); // a < b
assertTrue(aa.compareTo(ab) == -1); // aa < ab
assertTrue(ba.compareTo(bb) == -1); // ba < bb
assertTrue(b.compareTo(a) == 1); // b > a
assertTrue(ab.compareTo (aa) == 1); // ab > aa
assertTrue(bb.compareTo(ba) == 1); // bb > ba
}
Pero también existe el riesgo de que un comentario aclarativo sea
incorrecto. En el ejemplo anterior, compruebe lo difícil que resulta
comprobar si los comentarios son correctos. Esto explica por qué la
clarificación es necesaria y también arriesgada. Por ello, antes de escribir
estos comentarios, asegúrese de que no hay una solución mejor y también de
que sean precisos.
-- 92 of 644 --

Advertir de las consecuencias
En ocasiones es muy útil advertir a otros
programadores de determinadas
consecuencias. Por ejemplo, el siguiente
comentario explica por qué un determinado
caso de prueba está desactivado:
// No ejecutar a menos
// que le sobre tiempo.
public void _testWithReallyBigFile()
{
writeLinesToFile(10000000);
response.setBody(testFile);
response.readyToSend(this);
String responseString = output.toString();
assertSubString(“Content-Length: 1000000000”, responseString);
assertTrue(bytesSent > 1000000000);
}
En la actualidad, evidentemente, desactivaríamos la prueba por medio del
atributo @Ignore con la correspondiente cadena explicativa: @Ignore(“Takes
too long to run”), pero antes de la aparición de JUnit 4, era habitual añadir
un guion bajo delante del nombre del método. El comentario realizaba su
cometido. Veamos otro ejemplo:
public static SimpleDateFormat makeStandardHttpDateFormat()
{
//SimpleDataFormat no es compatible con procesos,
//por lo que debe crear cada instancia de forma independiente.
SimpleDateFormat df = new SimpleDateFormat(“EEE, dd MMM yyyy HH:mm:ss z”);
df.setTimeZone (TimeZone.getTimeZone (“GMT”));
return df;
}
Seguramente conozca soluciones mejores para este problema. Estoy de
acuerdo, pero el comentario es perfectamente razonable. Evita que un
programador use un inicializador estático por motivos de eficacia.
Comentarios TODO
En ocasiones conviene usar notas con forma de comentarios //TODO. En el
-- 93 of 644 --

siguiente caso, el comentario TODO explica por qué la función tiene una
implementación incorrecta y cuál debe ser su futuro.
// TODO-MdM no son necesarios
// Esperamos que desaparezca en el modelo definitivo
protected VersionInfo makeVersion() throws Exception
{
return null;
}
TODO son tareas que el programador piensa que debería haber hecho pero
que no es así. Pueden ser un recordatorio para eliminar una función obsoleta
o una petición para resolver un problema.
Pueden ser una solicitud para buscar un nombre más adecuado o para
realizar un cambio que dependa de un evento planeado. Sea lo que sea, no es
excusa para mantener código incorrecto en el sistema.
En la actualidad, muchos IDE cuentan con funciones especiales para
localizar comentarios TODO, por lo que seguramente no se pierda. Sin
embargo, no colapse el código con estos comentarios. Examínelos y elimine
todos los que pueda.
Amplificación
Se puede usar un comentario para amplificar la importancia de algo que, en
caso contrario, parecería irrelevante.
String listItemContent = match.group(3).trim();
// el recorte es importante. Elimina los espacios iniciales
// que harían que el elemento se reconociera como
// otra lista.
new ListItemWidget(this, listItemContent, this.level + 1);
return buildList(text.substring(match.end()));
Javadoc en API públicas
No hay nada más útil y satisfactorio que una API pública bien descrita. Los
javadoc de la biblioteca estándar de Java son un ejemplo. Sería muy
complicado crear programas de Java sin ellos.
Si usa una API pública, debe crear javadoc de calidad para la misma, pero
recuerde el siguiente consejo a lo largo del capítulo: los javadoc pueden ser
-- 94 of 644 --

---

## [Sección 29] Introducción y Fundamentos

tan ambiguos, amplios y descorteses como cualquier otro tipo de documento.
Comentarios incorrectos
Muchos comentarios pertenecen a esta categoría. Suelen ser excusas de
código pobre o justificaciones de decisiones insuficientes, algo así como si el
programador se hablara a sí mismo.
Balbucear
Añadir un comentario sin razón o porque el proceso lo requiere es un error. Si
decide escribir un comentario, tómese el tiempo necesario para asegurarse de
que sea el mejor que puede redactar.
El siguiente ejemplo es de FitNesse, donde un comentario sin duda sería
de utilidad, pero el autor tenía prisa o no prestó demasiada atención. Su
balbuceo generó un enigma:
public void loadProperties()
{
try
{
String propertiesPath = propertiesLocation + “/” + PROPERTIES_FILE;
FileInputStream propertiesStream = new FileInputStream(propertiesPath);
loadedProperties.load(propertiesStream);
}
catch(IOException e)
{
// Si no hay archivos de propiedades significan que cargan las predeterminadas
}
}
¿Qué significa el comentario del bloque catch? Seguro que algo para el
autor, pero el significado no está claro. Aparentemente, si se genera
IOException, significa que no hay archivo de propiedades y, en ese caso, se
cargan los valores predeterminados. ¿Pero quién carga los valores
predeterminados? ¿Se cargan antes de la invocación de
loadProperties.load o loadProperties.load captura la excepción, carga
los valores predeterminados y después nos pasa la excepción para que la
ignoremos? ¿O será que loadProperties.load carga todos los valores
-- 95 of 644 --

predeterminados antes de intentar abrir el archivo? ¿Intentaba el autor
consolarse por dejar el bloque catch vacío? Ésta es la posibilidad más temida,
¿se estaba diciendo que volviera más tarde para crear el código para cargar
los valores predeterminados?
Nuestro único recurso es examinar el código en otras partes del sistema
para determinar qué sucede. Cualquier comentario que le obligue a buscar su
significado en otro módulo ha fallado en su intento de comunicación y no
merece los bits que consume.
Comentarios redundantes
El Listado 4-1 muestra una sencilla función con un comentario de
encabezado totalmente redundante. Seguramente se tarde más en leer que el
propio código.
Listado 4-1
waitForClose.
// Método de utilidad devuelto cuando this.closed es true. Genera una excepción
// si se alcanza el tiempo de espera.
public synchronized void waitForClose(final long timeoutMillis)
throws Exception
{
if (!closed)
{
wait(timeoutMillis);
if(!closed)
throw new Exception (“MockResponseSender could not be closed”);
}
}
¿Para qué sirve este comentario? No es más informativo que el código.
No lo justifica ni transmite la intención ni la lógica. No es más fácil de leer
que el código. De hecho, es menos preciso y obliga al lector a aceptar la falta
de precisión en lugar de a entenderlo. Es como un vendedor de coches de
segunda menos que le asegura que no hace falta revisar el motor.
Fíjese ahora en la legión de javadoc inútiles y redundantes del Listado 42, obtenido de Tomcat. Estos comentarios únicamente ensucian y oscurecen
el código. No tienen ninguna función documental. Para empeorar las cosas,
-- 96 of 644 --

sólo le mostramos algunos. El módulo tiene muchos más.
Listado 4-2
ContainerBase.java (Tomcat).
public abstract class ContainerBase
implements Container, Lifecycle, Pipeline,
MBeanRegistration, Serializable {
/**
* Retardo del procesador para este componente.
*/
protected int backgroundProcessorDelay = -1;
/**
* Compatibilidad con eventos de ciclo vital de este componente.
*/
protected LifecycleSupport lifecycle =
new LifecycleSupport(this);
/**
* Escuchadores de eventos de contenedor de este contenedor.
*/
protected ArrayList listeners = new ArrayList();
/**
* Implementación Loader a la que se asocia este contenedor.
*/
protected Loader loader = null;
/**
* Implementación Logger a la que se asocia este contenedor.
*/
protected Log logger = null;
/**
* Nombre de registrador asociado.
*/
protected String logName = null;
/**
* Implementación Manager a la que se asocia este contenedor.
*/
protected Manager manager = null;
/**
* Clúster al que se asocia este contenedor.
*/
protected Cluster cluster = null;
/**
* Nombre legible de este contenedor.
-- 97 of 644 --

---

## [Sección 30] Introducción y Fundamentos

*/
protected String name = null;
/**
* Contenedor principal de este contenedor.
*/
protected Container parent = null;
/**
* Cargador de clase principal que configurar al instalar un elemento
* Loader.
*/
protected ClassLoader parentClassLoader = null;
/**
* Objeto Pipeline al que se asocia este contenedor.
*/
protected Pipeline pipeline = new StandardPipeline(this);
/**
* Objeto Realm al que se asocia este contenedor.
*/
protected Realm realm = null;
/**
* Objeto DirContext de recursos al que se asocia este contenedor.
*/
protected DirContext resources = null;
Comentarios confusos
En ocasiones, a pesar de las buenas intenciones, un programador realiza una
afirmación en sus comentarios que no es del todo precisa. Fíjese otra vez en
el comentario redundante y confuso del Listado 4-1.
¿Sabe por qué es confuso? El método no devuelve nada cuando
this.closed se convierte en true. Devuelve algo si this.closed es true; en
caso contrario, espera y genera una excepción si this.closed no es true.
Este sutil fragmento, oculto en un comentario más difícil de leer que el
cuerpo del código, puede hacer que otro programador invoque la función con
la esperanza de que devuelva algo cuando this.closed sea true. Ese pobre
programador se encontrará en una sesión de depuración intentando
determinar por qué el código se ejecuta tan lentamente.
-- 98 of 644 --

Comentarios obligatorios
Es una locura tener una regla que afirme que todas las funciones deben tener
un javadoc o que todas las variables deben tener un comentario. Este tipo de
comentarios ensucian el código y generan confusión y desorganización. Por
ejemplo, los javadoc obligatorios para todas las funciones crean
abominaciones como el Listado 4-3. No sirven de nada, complican el código
y constituyen posibles engaños y desorientaciones.
Listado 4-3
/**
*
* @param title El título del CD
* @param author El autor del CD
* @param tracks El número de pistas del CD
* @param durationInMinutes La duración del CD en minutos
*/
public void addCD(String title, String author,
int tracks, int durationInMinutes) {
CD cd = new CD();
cd.title = title;
cd.author = author;
cd.tracks = tracks;
cd.duration = duration;
cdList.add(cd);
}
Comentarios periódicos
En ocasiones, se añade un comentario al inicio de un módulo cada vez que se
edita. Estos comentarios acumulan una especie de registro de todos los
cambios realizados. He visto módulos con decenas de páginas con estas
entradas.
* Cambios (11-Oct-2001)
* -----------------------------
* 11-Oct-
: Reorganización de la clase y cambio a un nuevo paquete
* com.jrefinery.date (DG);
* 05-Nov-
: Se añade un método getDescription() y se elimina la clase
NotableDate (DG);
-- 99 of 644 --

* 12-Nov-
: IBD requiere el método setDescription(), una vez eliminada la
clase NotableDate
* (DG); se cambian getPreviousDayOfWeek(), getFollowingDayOfWeek()
* y getNearestDayOfWeek() para corregir errores (DG);
* 05-Dic-
: Error corregido en la clase SpreadsheetDate (DG);
* 29-May-
: Se transfieren todas las constantes de mes a una interfaz
* independiente (MonthConstants) (DG);
* 27-Ago-
: Error corregido en el método addMonths(), gracias a Nálevka Petr
(DG);
* 03-Oct-
: Errores indicados por Checkstyle (DG) corregidos;
* 13-Mar-
: Implementación de Serializable (DG);
* 29-May-
: Error corregido en el método addMonths (DG);
* 04-Sep-
: Implementación de Comparable. Actualización de los javadoc
isInRange (DG);
* 05-Ene-
: Error corregido en el método addYears() (1096202) (DG);
Hace tiempo hubo una buena razón para crear y mantener estas entradas
de registro al inicio de cada módulo. Carecíamos de sistemas de control de
código fuente que se encargaran de ello, pero en la actualidad, estas entradas
son elementos sobrantes que complican los módulos. Debe eliminarlas
totalmente.
Comentarios sobrantes
En ocasiones vemos comentarios que simplemente sobran. Restan
importancia a lo evidente y no ofrecen información nueva.
/**
* Constructor predeterminado.
*/
protected AnnualDateRule() {
}
¿En serio? ¿Y este otro?:
/** Día del mes. */
private int dayOfMonth;
Y aquí el parangón de la redundancia:
/**
* Devuelve el día del mes.
-- 100 of 644 --

---

## [Sección 31] Introducción y Fundamentos

*
* @return el día del mes.
*/
public int getDayOfMonth() {
return dayOfMonth;
}
Estos comentarios son tan inservibles que aprendemos a ignorarlos. Al
leer el código, la vista los salta. Con el tiempo, los comentarios empiezan a
mentir cuando cambia el código que les rodea.
El primer comentario del Listado 4-4 parece correcto[25]. Explica por qué
se ignora el bloque catch, pero el segundo comentario sobra. Parece que el
programador estaba tan frustrado con crear bloques try/catch en la función
que necesitaba explotar.
Listado 4-4
startSending.
private void startSending()
{
try
{
doSending();
}
catch(SocketException e)
{
// normal, alguien ha detenido la solicitud.
}
catch(Exception e)
{
try
{
response.add(ErrorResponder.makeExceptionString(e));
response.closeAll();
}
catch(Exception e1)
{
//¡Un respiro!
}
}
}
En lugar de explotar en un comentario sin sentido, el programador
debería haber sabido que su frustración se podría aliviar mejorando la
estructura del código. Tendría que haber centrado su energía en extraer el
último bloque try/catch en una función independiente, como muestra el
-- 101 of 644 --

Listado 4-5.
Listado 4-5
startSending (refactorizado).
private void startSending()
{
try
{
doSending();
}
catch(SocketException e)
{
// normal. Alguien ha detenido la solicitud.
}
catch(Exception e)
{
addExceptionAndCloseResponse(e);
}
}
private void addExceptionAndCloseResponse(Exception e)
{
try
{
response.add(ErrorResponder.makeExceptionString(e));
response.closeAll();
}
catch(Exception e1)
{
}
}
Cambie la tentación de crear elementos sobrantes por la determinación de
limpiar su código. Mejorará como programador y será más fácil.
Comentarios sobrantes espeluznantes
Los javadoc también pueden ser innecesarios. ¿Para qué sirven los siguientes
javadoc (de una conocida biblioteca) de código abierto? La respuesta: para
nada. Son comentarios redundantes creados en un intento equivocado de
redactar documentación.
/** El nombre. */
private String name;
/** La versión. */
-- 102 of 644 --

private String version;
/** El licenceName. */
private String licenceName;
/** La versión. */
private String info;
Vuelva a leer los comentarios. ¿Detecta el error de corta y pega? Si los
autores no prestan atención al escribir sus comentarios (o al pegarlos), ¿por
qué se espera que sean de utilidad para los lectores?
No usar comentarios si se puede usar una función o una
variable
Fíjese en el siguiente código:
// ¿el módulo de la lista global <mod> depende del
// subsistema del que formamos parte?
if (smodule.getDependSubsystems().contains(subSysMod.getSubsystem()))
Se podría cambiar sin el comentario de esta forma:
ArrayList moduleDependees = smodule.getDependSubsystems();
String ourSubSystem = subSysMod.getSubSystem();
if (moduleDependees.contains(ourSubSystem))
El autor del código original seguramente escribió primero el comentario
(improbable) y después el código para ajustarlo al comentario. Sin embargo,
el autor tendría que haber refactorizado el código, como hice yo, para poder
eliminar el comentario.
Marcadores de posición
En ocasiones los programadores marcan una determinada posición en un
archivo. Por ejemplo, recientemente encontré esto en un programa:
// Acciones //////////////////////////////////
Son escasas las ocasiones en las que tiene sentido agrupar funciones bajo
esta estructura. Por lo general, debe eliminarse, sobre todo la molesta hilera
de barras al final.
Piénselo de esta forma. Estas estructuras son atractivas si no las usa
demasiado. Por ello, úselas esporádicamente y sólo cuando el beneficio sea
-- 103 of 644 --

significativo. Si las usa en exceso, acabarán por ser ignoradas.
Comentarios de llave de cierre
En ocasiones, los programadores incluyen comentarios especiales en llaves
de cierre, como en el Listado 4-6. Aunque pueda tener sentido en funciones
extensas con estructuras anidadas, únicamente estorba a las funciones
encapsuladas y de pequeño tamaño que nos gustan. Por ello, si siente el deseo
de marcar sus llaves de cierre, pruebe a reducir el tamaño de sus funciones.
Listado 4-6
wc.java.
public class wc {
public static void main(String[] args) {
BufferedReader in = new BufferedReader(new InputstreamReader(System.in));
String line;
int lineCount = 0;
int charCount = 0;
int wordCount = 0;
try {
while ((line = in.readLine()) != null) {
lineCount++;
charCount += line.length();
String words[] = line.split(“\\W”);
wordCount += words.length;
} //while
System.out.println(“wordCount = ” + wordCount);
System.out.println(“lineCount = ” + lineCount);
System.out.println(“charCount = ” + charCount);
} // try
catch (IOException e) {
System.err.println(“Error: ” + e.getMessage());
} //catch
} //main
}
Asignaciones y menciones
/* Añadido por Rick */
Los sistemas de control de código fuente recuerdan a la perfección quién ha
añadido qué y cuándo. No es necesario plagar el código con pequeñas
-- 104 of 644 --

---

## [Sección 32] Introducción y Fundamentos

menciones. Puede pensar que estos comentarios son útiles y que ayudan a
otros a hablar sobre el código, pero en realidad sobreviven durante años y
cada vez son menos precisos y relevantes. El sistema de control de código
fuente es el punto idóneo para este tipo de información.
Código comentado
No hay nada más odioso que el código comentado. ¡No lo haga!
InputStreamResponse response = new inputStreamResponse();
response.setBody(formatter.getResultStream(), formatter.getByteCount());
// InputStream resultsStream = formatter.getResultStream();
// StreamReader reader = new StreamReader(resultsStream);
// response.setContent(reader.read(formatter.getByteCount()));
Los lectores que vean código comentado no tendrán el valor de borrarlo.
Pensarán que está ahí por algo y que es demasiado importante para borrarlo.
Por ello, el código comentado se acumula como los sedimentos en una botella
de vino malo.
Fíjese en este fragmento de apache commons:
this.bytePos = writeBytes(pngIdBytes, 0);
//hdrPos = bytePos;
writeHeader();
writeResolution();
//dataPos = bytePos;
if (writeImageData()) {
writeEnd();
this.pngBytes = resizeByteArray(this.pngBytes, this.maxPos);
}
else {
this.pngBytes = null;
}
return this.pngBytes;
¿Por qué hay dos líneas comentadas? ¿Son importantes? ¿Se han
conservado como recordatorio de un cambio inminente o es algo que alguien
comentó hace años y no se ha preocupado de limpiar? Hubo una época, en la
década de 1960, en la que el código comentado pudo ser útil, pero hace
tiempo que contamos con buenos sistemas de control de código fuente,
sistemas que recuerdan el código por nosotros. Ya no tenemos que
comentarlo. Elimínelo. No lo perderá. Se lo aseguro.
-- 105 of 644 --

Comentarios HTML
El HTML en comentarios de código fuente es una aberración, como puede
apreciar en el siguiente fragmento. Dificulta la lectura de los comentarios
donde debería ser más fácil; el editor o IDE. Si los comentarios se van a
extraer con una herramienta (como Javadoc) para mostrarlos en una página
Web, debe ser responsabilidad de dicha herramienta y no del programador el
adornar los comentarios con el correspondiente HTML.
/**
* Tarea para ejecutar pruebas de aceptación.
* Esta tarea ejecuta pruebas de aceptación y publica los resultados.
* <p/>
* <pre>
* Uso:
* &lt;taskdef name=&quot;execute-fitnesse-tests&quot;
* classname=&quot;fitnesse.ant.ExecuteFitnesseTestsTask&quot;
* classpathref=&quot;classpath&quot; /&gt;
* OR
* &lt;taskdef classpathref=&quot;classpath&quot;
* resource=&quot;tasks.properties&quot; /&gt;
* <p/>
* &lt;execute-fitnesse-tests
* suitepage=&quot;FitNesse.SuiteAcceptanceTests&quot;
* fitnesseport=&quot;8082&quot;
* resultsdir=&quot;$(results.dir)&quot;
* resultshtmlpage=&quot;fit-results.html&quot;
* classpathref=&quot;classpath&quot; /&gt;
* </pre>
*/
Información no local
Si tiene que escribir un comentario, asegúrese de que describa el código que
le rodea. No ofrezca información global del sistema en el contexto de un
comentario local. Fíjese en el siguiente comentario javadoc. Aparte de su
terrible redundancia, también ofrece información sobre el puerto
predeterminado y la función no tiene control alguno sobre el puerto
predeterminado. El comentario no describe la función sino otra parte distinta
-- 106 of 644 --

del sistema. Evidentemente, no hay garantías de que el comentario cambie
cuando lo haga el código que contiene el valor predeterminado.
/**
* Puerto para ejecutar fitnesse. El predeterminado es <b>8082</b>.
*
* @param fitnessePort
*/
public void setFitnessePort(int fitnessePort)
{
this.fitnessePort = fitnessePort;
}
Demasiada información
No incluya en sus comentarios interesantes reflexiones históricas ni
irrelevantes descripciones de detalles. El siguiente comentario se ha extraído
de un módulo diseñado para probar que una función puede codificar y
descodificar base64. Aparte del número RFC, el lector de este código no
necesita la información obsoleta que contiene el comentario.
/*
RFC 2045 - Extensiones Multipropósito de correo de Internet (MIME)
Primera parte: Formato del Cuerpo de los Mensajes de Internet

---

## [Sección 33] sección 6.8. Codificación de transferencia de contenidos Base64

El proceso de codificación representa grupos de 24 bits de la entrada
como cadenas de salida de 4 caracteres codificados. Procediendo de
izquierda a derecha, se forma un grupo de 24 bits de entrada
concatenando 3 grupos de 8 bits de entrada. Estos 24 bits se tratan
como 4 grupos concatenados de 6 bits, cada uno de los cuales se
traduce en un solo dígito del alfabeto base64. Cuando se codifica un
flujo de bits mediante la codificación base64, el flujo de bits se
debe considerar ordenado con el bit más significativo primero. Esto
es, el primer bit del flujo será el bit de orden más alto en el
primer byte de 8 bits, y el octavo bit será el de orden más bajo en
el primer byte de 8 bits, y así sucesivamente.
*/
Conexiones no evidentes
La conexión entre un comentario y el código que describe debe ser evidente.
Si se ha preocupado de escribir un comentario, lo mínimo es que el lector que
lo vea entienda a qué se refiere. Fíjese en este comentario obtenido de apache
commons:
-- 107 of 644 --

/*
* comienza con una matriz de tamaño suficiente para albergar todos los
pixeles
* (más bytes de filtro), y 200 bytes adicionales para la información de
encabezado
*/
this.pngBytes = new byte[((this.width + 1) * this.height * 3) + 200];
¿Qué es un byte de filtro? ¿Está relacionado con +1? ¿O con *3? ¿Con
ambos? ¿Es un pixel un byte? ¿Por qué 200? La función de un comentario es
explicar código que no se explica por sí mismo. Es una lástima que un
comentario requiera su propia explicación.
Encabezados de función
Las funciones breves apenas requieren explicación. Un nombre bien elegido
para una función que hace una cosa suele ser mejor que un encabezado de
comentario.
Javadocs en código no público
A pesar de la utilidad de los javadoc para las API públicas, no sirven para
código no dirigido a consumo público. La generación de páginas javadoc
para clases y funciones de un sistema no suele ser útil y la formalidad
adicional de los comentarios javadoc no es más que una distracción.
Ejemplo
Escribí el módulo del Listado 4-7 para la primera versión de XP Immersion.
Debía ser un ejemplo de estilo incorrecto de creación de código y
comentarios. Después, Kent Beck refactorizó este código en algo mucho más
atractivo delante de varios alumnos. Posteriormente, adapté el ejemplo para
mi libro Agile Software Development, Principles, Patterns, and Practices y
para el primero de mis artículos Craftsman publicados en la revista Software
Development.
Lo que me fascina de este módulo es que hubo un tiempo en que muchos
-- 108 of 644 --

lo hubiéramos considerado bien documentado. Ahora vemos que es un
auténtico desastre. A ver cuántos problemas detecta en los comentarios.
Listado 4-7
GeneratePrimes.java.
/**
* Esta clase genera números primos hasta la cantidad máxima especificada por
el
* usuario. El algoritmo usado es la Criba de Eratóstenes.
* <p>
* Eratóstenes de Cirene, 276 a. C., Cirene, Libia -
* 194 a. C., Alejandría. El primer hombre en calcular la
* circunferencia de la Tierra. También trabajó con calendarios
* con años bisiestos y fue responsable de la Biblioteca de Alejandría.
* <p>
* El algoritmo es muy simple. Dada una matriz de enteros
* empezando por el 2, se tachan todos los múltiplos de 2. Se busca el
siguiente
* entero sin tachar y se tachan todos sus múltiplos.
* Repetir hasta superar la raíz cuadrada del valor
* máximo.
*
* ©author Alphonse
* ©version 13 Feb 2002 atp
*/
import java.util.*;
public class GeneratePrimes
{
/**
* @param maxValue es el límite de generación.
*/
public static int[] generatePrimes(int maxValue)
{
if (maxValue >= 2) //el único caso válido
{
// declaraciones
int s = maxValue + 1; // tamaño de la matriz
boolean[] f = new boolean[s];
int i;
// inicializar la matriz en true.
for (i = 0; i < s; i++)
f[i] = true;
// eliminar los números no primos conocidos
f[0] = f[1] = false;
// cribar
int j;
-- 109 of 644 --

for (i = 2; i < Math.sqrt(s) + 1; i++)
{
if (f[i]) // si no está tachado, tachar sus múltiplos.
{
for (j = 2 * i; j < s; j += i)
f[j] = false; // el múltiplo no es primo
}
}
// ¿cuántos primos hay?
int count = 0;
for (i = 0; i < s; i++)
{
if (f[i])
count++; // contador.
}
int[] primes = new int[count];
// enviar primos al resultado
for (i = 0, j = 0; i < s; i++)
{
if (f[i]) // si es primo
primes[j++] = i;
}
return primes; // devolver los primos
}
else // maxValue < 2
return new int[0]; // devolver matriz null si la entrada no es
correcta.
}
}
En el Listado 4-8 puede ver una versión refactorizada del mismo módulo.
Se ha limitado considerablemente el uso de comentarios. Hay sólo dos en
todo el módulo y ambos claramente descriptivos.
Listado 4-8
PrimeGenerator.java (refactorizado).
/**
* Esta clase genera números primos hasta la cantidad máxima especificada por
el
* usuario. El algoritmo usado es la Criba de Eratóstenes. Dada una matriz de
enteros
* empezando por el 2: buscar el primer entero sin tachar y tachar todos sus
* múltiplos. Repetir hasta que no haya más múltiplos en la matriz.
*/
public class PrimeGenerator
{
-- 110 of 644 --

---

## [Sección 34] sección 6.8. Codificación de transferencia de contenidos Base64

private static boolean[] crossedOut;
private static int[] result;
public static int[] generatePrimes(int maxValue)
{
if (maxValue < 2)
return new int[0];
else
{
uncrossIntegersUpTo(maxValue);
crossOutMultiples();
putUncrossedIntegersIntoResult();
return result;
}
}
private static void uncrossIntegersUpTo(int maxValue)
{
crossedOut = new boolean[maxValue + 1];
for (int i = 2; i < crossedOut.length; i++)
crossedOut[i] = false;
}
private static void crossOutMultiples()
{
int limit = determineIterationLimit();
for (int i = 2; i <= limit; i++)
if (notCrossed(i))
crossOutMultiplesOf(i);
}
private static int determineIterationLimit()
{
// Cada múltiplo en la matriz tiene un factor primordial que
// es menor o igual que la raíz del tamaño de la matriz,
// entonces no tenemos que tachar múltiplos de números
// más grande que esa raíz.
double iterationLimit = Math.sqrt(crossedOut.length);
return (int) iterationLimit;
}
private static void crossOutMultiplesOf (int i)
{
for (int multiple = 2 * i;
multiple < crossedOut.length;
multiple += i)
crossedOut[multiple] = true;
}
private static boolean notCrossed(int i)
{
return crossedOut[i] == false;
}
private static void putUncrossedIntegersIntoResult()
-- 111 of 644 --

{
result = new int[numberOfUncrossedIntegers()];
for (int j = 0, i = 2; i < crossedOut.length; i++)
if (notCrossed(i))
result[j++] = i;
}
private static int numberOfUncrossedIntegers()
{
int count = 0;
for (int i = 2; i < crossedOut.length; i++)
if (notCrossed(i))
count++;
return count;
}
}
Se podría decir que el primer comentario es redundante ya que es muy
similar a la función generatePrimes, pero creo que muestra mejor el
algoritmo al lector, motivo por el que lo he mantenido. El segundo argumento
es sin duda necesario. Explica la lógica del uso de la raíz cuadrada como
límite del bucle. No encontré otro nombre de variable más sencillo ni otra
estructura de código que lo aclarara más. Por otra parte, el uso de la raíz
cuadrada podría resultar presuntuoso. ¿Realmente se ahorra tanto tiempo
limitando la iteración a la raíz cuadrada? ¿El cálculo de la raíz cuadrada
llevaría más tiempo del que se ahorra? Conviene analizarlo. El uso de la raíz
cuadrada como límite de iteración satisface al viejo hacker de C y de
lenguajes de ensamblado de mi interior, pero no estoy convencido de que
merezca el tiempo y el esfuerzo que los demás puedan dedicar a entenderlo.
Bibliografía
[KP78]: Kernighan and Plaugher, The Elements of Programming Style,
2d. ed., McGraw-Hill, 1978.
-- 112 of 644 --
Formato
Cuando los usuarios miran entre bastidores, queremos que queden
-- 113 of 644 --

impresionados por el atractivo, la coherencia y la atención al detalle que
perciben. Queremos que el orden les sorprenda, que abran los ojos con
asombro cuando se desplacen por los módulos. Queremos que aprecien que
se trata de un trabajo de profesionales. Si ven una masa amorfa de código que
parece escrito por un grupo de marineros borrachos, es probable que piensen
que sucederá lo mismo en otros aspectos del proyecto.
Debe preocuparse por el formato de su código. Debe elegir una serie de
reglas sencillas que controlen el formato del código y después aplicarlas de
forma coherente. Si trabaja en equipo, debe acordar una serie de reglas que
todos los miembros deben cumplir. También es muy útil usar una
herramienta automatizada que se encargue de aplicar las reglas.
La función del formato
En primer lugar, debe ser claro. El formato de código es importante,
demasiado importante como para ignorarlo y también demasiado importante
como para tratarlo de forma religiosa. El formato del código se basa en la
comunicación y la comunicación debe ser el principal pilar de un
desarrollador profesional.
Puede que piense que conseguir que algo funcione es la principal
preocupación de un programador profesional. Espero que este libro le haga
cambiar de idea. La funcionalidad que cree hoy es muy probable que cambie
en la siguiente versión, pero la legibilidad de su código afectará
profundamente a todos los cambios que realice. El estilo del código y su
legibilidad establecen los precedentes que afectan a la capacidad de
mantenimiento y ampliación mucho después de que el código cambie. Su
estilo y su disciplina sobrevivirán, aunque el código no lo haga.
Veamos qué aspectos del formato nos permiten comunicarnos mejor.
Formato vertical
Comencemos por el tamaño vertical. ¿Qué tamaño debe tener un archivo
-- 114 of 644 --

---

## [Sección 35] sección 6.8. Codificación de transferencia de contenidos Base64

fuente? En Java, el tamaño de los archivos está relacionado con el tamaño de
las clases, como veremos más adelante. Por el momento, nos detendremos en
el tamaño de los archivos.
¿Qué tamaño tienen la mayoría de archivos fuente de Java? Existe una
amplia gama de tamaños e importantes diferencias de estilo, como se aprecia
en la figura 5.1.
Figura 5.1. Escala LOG de distribuciones de longitud de archivos (altura del cuadro =
sigma).
Se describen siete proyectos: Junit, FitNesse, testNG, Time and Money,
JDepend, Ant y Tomcat. Las líneas que cruzan los cuadros muestran la
longitud máxima y mínima de cada proyecto. El cuadro muestra
aproximadamente un tercio (una desviación estándar[26]) de los archivos. La
parte central del cuadro es la media. Por tanto, el tamaño de archivo medio
del proyecto FitNesse es de 65 líneas y un tercio de los archivos ocupan entre
40 y 100+ líneas.
El mayor archivo de FitNesse tiene unas 400 líneas y el de menor tamaño,
6. Es una escala de registro, de modo que la pequeña diferencia de posición
vertical supone una gran diferencia en tamaño absoluto.
Junit, FitNesse y Time and Money tienen archivos relativamente
pequeños. Ninguno supera las 500 líneas y la mayoría tienen menos de 200.
Tomcat y Ant, por su parte, tienen archivos con varios miles de líneas de
-- 115 of 644 --

longitud y más de la mitad superan las 200.
¿Qué significa todo esto? Aparentemente se pueden crear sistemas
(FitNesse se aproxima a las 50 000 líneas) a partir de archivos de unas 200
líneas de longitud, con un límite máximo de 500. Aunque no debería ser una
regla, es un intervalo aconsejable. Los archivos de pequeño tamaño se
entienden mejor que los grandes.
La metáfora del periódico
Piense en un artículo de periódico bien escrito. En la parte superior espera un
titular que indique de qué se trata la historia y le permita determinar si quiere
leerlo o no. El primer párrafo ofrece una sinopsis de la historia, oculta los
detalles y muestra conceptos generales. Al avanzar la lectura, aumentan los
detalles junto con todas las fechas, nombres, citas y otros elementos.
Un archivo de código debe ser como un artículo de periódico. El nombre
debe ser sencillo pero claro. Por sí mismo, debe bastar para indicarnos si
estamos o no en el módulo correcto. Los elementos superiores del archivo
deben proporcionar conceptos y algoritmos de nivel superior. Los detalles
deben aumentar según avanzamos, hasta que en la parte final encontremos las
funciones de nivel inferior del archivo.
Un periódico se compone de varios artículos, algunos muy reducidos y
otros de gran tamaño. No hay muchos que ocupen toda la página con texto,
para que el periódico sea manejable. Si el periódico fuera un único y extenso
texto con una aglomeración desorganizada de hechos, fechas y nombres, no
lo leeríamos.
Apertura vertical entre conceptos
La práctica totalidad del código se lee de izquierda a derecha y de arriba a
abajo. Cada línea representa una expresión o una cláusula, y cada grupo de
líneas representa un pensamiento completo. Estos pensamientos deben
separarse mediante líneas en blanco.
Fíjese en el Listado 5-1. Hay líneas en blanco que separan la declaración
-- 116 of 644 --

del paquete, las importaciones y las funciones. Es una regla muy sencilla con
un profundo efecto en el diseño visual del código. Cada línea en blanco es
una pista visual que identifica un nuevo concepto independiente. Al avanzar
por el listado, la vista se fija en la primera línea que aparece tras una línea en
blanco.
Listado 5-1
BoldWidget.java
package fitnesse.wikitext.widgets;
import java.util.regex.*;
public class BoldWidget extends ParentWidget {
public static final String REGEXP = “‘‘‘.+?’’’”;
private static final Pattern pattern = Pattern.compile (“‘‘‘(.+?)’’’”,
Pattern.MULTILINE + Pattern.DOTALL
);
public BoldWidget(ParentWidget parent, String text) throws Exception {
super(parent);
Matcher match = pattern.matcher(text);
match.find();
addChildWidgets(match.group(1));
}
public String render() throws Exception {
StringBuffer html = new StringBuffer(“<b>”);
html.append(childHtml()).append (“</b>”);
return html.toString();
}
}
Si eliminamos las líneas en blanco, como en el Listado 5-2, se oscurece la
legibilidad del código.
Listado 5-2
BoldWidget.java
package fitnesse.wikitext.widgets;
import java.util.regex.*;
public class BoldWidget extends ParentWidget {
public static final String REGEXP = “‘‘‘.+?’’’”;
private static final Pattern pattern = Pattern.compile(“‘‘‘(.+?)’’’”,
Pattern.MULTILINE + Pattern.DOTALL);
public BoldWidget(ParentWidget parent, String text) throws Exception {
-- 117 of 644 --

---

## [Sección 36] sección 6.8. Codificación de transferencia de contenidos Base64

super(parent);
Matcher match = pattern.matcher(text);
match.find();
addChildWidgets(match.group(1));}
public String render() throws Exception {
StringBuffer html = new StringBuffer(“<b>”);
html.append(childHtml()).append(“</b>”);
return html.toString();
}
}
Este efecto aumenta todavía más si no centramos la vista. En el primer
ejemplo, los distintos grupos de líneas saltan a la vista, mientras que en el
segundo es una mezcla amorfa. La diferencia entre ambos listados es una
ligera apertura vertical.
Densidad vertical
Si la apertura separa los conceptos, la densidad vertical implica asociaciones.
Por tanto, las líneas de código con una relación directa deben aparecer
verticalmente densas. Fíjese en cómo los comentarios sin sentido del
Listado 5-3 anulan la asociación entre las dos variables de instancia.
Listado 5-3
public class ReporterConfig {
/**
* Nombre de clase del escuchador
*/
private String m_className;
/**
* Propiedades del escuchador
*/
private List<Property> m_properties = new ArrayList<Property>();
public void addProperty(Property property) {
m_properties.add(property);
}
El Listado 5-4 es mucho más fácil de leer. Lo apreciamos a simple vista o
al menos yo lo hago. Al mirarlo, veo que es una clase con dos variables y un
método, sin tener que mover la cabeza ni la vista. El listado anterior nos
-- 118 of 644 --

obliga a forzar la vista y a mover la cabeza para alcanzar el mismo nivel de
comprensión.
Listado 5-4
public class ReporterConfig {
private String m_className;
private List<Property> m_properties = new ArrayList<Property>();
public void addProperty(Property property) {
m_properties.add(property);
}
Distancia vertical
¿Alguna vez ha tenido que recorrer una clase, saltando de una función a otra,
desplazándose por el código para intentar adivinar la relación y el
funcionamiento de las funciones, y acabar totalmente confundido? ¿Alguna
vez ha escudriñado la cadena de herencia buscando la definición de una
variable o función? Resulta frustrante porque intenta comprender lo que hace
el sistema, pero pierde el tiempo y su energía mental en intentar localizar y
recordar sus elementos.
Los conceptos relacionados entre sí deben mantenerse juntos
verticalmente [G10]. Esta regla no funciona con conceptos de archivos
independientes. Por lo tanto, no debe separar conceptos relacionados en
archivos independientes a menos que tenga un motivo de peso. De hecho, es
uno de los motivos por los que se debe evitar el uso de variables protegidas.
Para los conceptos relacionados que pertenecen al mismo archivo, su
separación vertical debe medir su importancia con respecto a la legibilidad
del otro. Debe evitar que el lector deambule entre archivos y clases.
Declaraciones de variables
Las variables deben declararse de la forma más aproximada a su uso. Como
las funciones son muy breves, las variables locales deben aparecer en la parte
superior de cada función, como en este ejemplo de Junit4.3.1.
-- 119 of 644 --

private static void readPreferences() {
InputStream is = null;
try {
is = new FileInputStream(getPreferencesFile());
setPreferences(new Properties(getPreferences()));
getPreferences().load(is);
} catch (IOException e) {
try {
if (is != null)
is.close();
} catch (IOException e1) {
}
}
}
Las variables de control de bucles deben declararse en la instrucción del
bucle, como en esta pequeña función del mismo código fuente:
public int countTestCases() {
int count= 0;
for (Test each : tests)
count += each.countTestCases();
return count;
}
En casos excepcionales, una variable puede declararse en la parte superior
de un bloque o antes de un bucle en una función extensa. Puede ver este tipo
de variable en la siguiente función de TestNG.
…
for (XmlTest test: m_suite.getTests()) {
TestRunner tr = m_runnerFactory.newTestRunner(this, test);
tr.addListener(m_textReporter);
m_testRunners.add(tr);
invoker = tr.getInvoker();
for (ITestNGMethod m : tr.getBeforeSuiteMethods()) {
beforeSuiteMethods.put(m.getMethod(), m);
}
for (ITestNGMethod m : tr.getAfterSuiteMethods()) {
afterSuiteMethods.put(m.getMethod(), m);
}
}
…
Variables de instancia
Las variables de instancia, por su parte, deben declararse en la parte superior
de la clase. Esto no debe aumentar la distancia vertical de las variables, ya
-- 120 of 644 --

---

## [Sección 37] sección 6.8. Codificación de transferencia de contenidos Base64

que en una clase bien diseñada se usan en muchos sino en todos sus métodos.
Existen discrepancias sobre la ubicación de las variables de instancia.
En C++ suele aplicarse la denominada regla de las tijeras, que sitúa todas las
variables de instancia en la parte inferior. En Java, sin embargo, es habitual
ubicarlas en la parte superior de la clase. No veo motivos para no hacerlo. Lo
importante es declarar las variables de instancia en un punto conocido para
que todo el mundo sepa dónde buscarlas.
Fíjese en el extraño caso de la clase TestSuite de JUnit 4.3.1. He
atenuado considerablemente esta clase para ilustrar este concepto. Si se fija
en la mitad del listado, verá dos variables de instancia declaradas. Resultaría
complicado ocultarlas en un punto mejor. Cualquiera que lea este código
tendría que toparse con las declaraciones por casualidad (como me pasó a
mí).
public class TestSuite implements Test {
static public Test createTest(Class<? extends TestCase> theClass,
String name) {
…
}
public static Constructor<? extends TestCase>
getTestConstructor(Class<? extends TestCase> theClass)
throws NoSuchMethodException {
…
}
public static Test warning(final String message) {
…
}
private static String exceptionToString(Throwable t) {
…
}
private String fName;
private Vector<Test> fTests = new Vector<Test>(10);
public TestSuite() {
}
public TestSuite(final Class<? extends TestCase> theClass) {
…
}
public TestSuite(Class<? extends TestCase> theClass, String name) {
…
}
-- 121 of 644 --

… … … …
}
Funciones dependientes
Si una función invoca otra, deben estar verticalmente próximas, y la función
de invocación debe estar por encima de la invocada siempre que sea posible.
De este modo el programa fluye con normalidad. Si la convención se sigue de
forma fiable, los lectores sabrán que las definiciones de función aparecen
después de su uso. Fíjese en el fragmento de FitNesse del Listado 5-5.
La función superior invoca las situadas por debajo que, a su vez, invocan
a las siguientes. Esto facilita la detección de las funciones invocadas y mejora
considerablemente la legibilidad del módulo completo.
Listado 5-5
WikiPageResponder.java.
public class WikiPageResponder implements SecureResponder {
protected WikiPage page;
protected PageData pageData;
protected String pageTitle;
protected Request request;
protected PageCrawler crawler;
public Response makeResponse(FitNesseContext context, Request request)
throws Exception {
String pageName = getPageNameOrDefault(request, “Frontpage”);
LoadPage(pageName, context);
if (page == null)
return notFoundResponse(context, request);
else
return makePageResponse(context);
}
private String getPageNameOrDefault(Request request, String
defaultPageName)
{
String pageName = request.getResource();
if (StringUtil.isBlank(pageName))
pageName = defaultPageName;
return pageName;
}
protected void loadPage(String resource, FitNesseContext context)
throws Exception {
WikiPagePath path = PathParser.parse(resource);
-- 122 of 644 --

crawler = context.root.getPageCrawler();
crawler.setDeadEndStrategy(new VirtualEnabledPageCrawler());
page = crawler.getPage(context.root, path);
if (page != null)
pageData = page.getData();
}
private Response notFoundResponse(FitNesseContext context, Request
request)
throws Exception {
return new NotFoundResponder().makeResponse(context, request);
}
private SimpleResponse makePageResponse(FitNesseContext context)
throws Exception {
pageTitle = PathParser.render(crawler.getFullPath(page));
String html = makeHtml(context);
SimpleResponse response = new SimpleResponse();
response.setMaxAge(0);
response.setContent(html);
return response;
}
…
Además, este fragmento es un buen ejemplo de ubicación de constantes
en un nivel correcto [G35]. La constante FrontPage se podría haber ocultado
en la función getPageNameOrDefault, pero eso habría ocultado una constante
conocida y esperada en una función de nivel inferior de forma incorrecta. Es
mejor pasar la constante desde un punto en el que tiene sentido a la posición
en la que realmente se usa.
Afinidad conceptual
Determinados conceptos de código deben estar próximos a otros. Tienen una
afinidad conceptual concreta. Cuanto mayor sea esta afinidad, menor
distancia vertical debe existir entre ellos.
Como hemos visto, esta afinidad se puede basar en una dependencia
directa, como cuando una función invoca a otra, o cuando usa una variable.
Pero hay otras causas de afinidad. Puede generarse porque un grupo de
funciones realice una operación similar. Fíjese en este fragmento de código
de Junit 4.3.1:
public class Assert {
static public void assertTrue(String message, boolean condition) {
-- 123 of 644 --

---

## [Sección 38] sección 6.8. Codificación de transferencia de contenidos Base64

if (!condition)
fail(message);
}
static public void assertTrue(boolean
condition) {
assertTrue (null, condition);
}
static public void assertFalse(String
message, boolean condition) {
assertTrue(message, !condition);
}
static public void assertFalse(boolean
condition) {
assertFalse(null, condition);
}
…
Estas funciones tienen una elevada afinidad conceptual ya que comparten
un sistema de nombres común y realizan variantes de la misma tarea básica.
El hecho de que se invoquen unas a otras es secundario. Aunque no lo
hicieran, deberían seguir estando próximas entre ellas.
Orden vertical
Por lo general, las dependencias de invocaciones de funciones deben apuntar
hacia abajo. Es decir, la función invocada debe situarse por debajo de la que
realice la invocación[27]. Esto genera un agradable flujo en el código fuente,
de los niveles superiores a los inferiores.
Como sucede en los artículos del periódico, esperamos que los conceptos
más importantes aparezcan antes y que se expresen con la menor cantidad de
detalles sobrantes. Esperamos que los detalles de nivel inferior sean los
últimos. De este modo, podemos ojear los archivos de código y captar el
mensaje en las primeras funciones sin necesidad de sumergirnos en los
detalles. El Listado 5-5 se organiza de esta forma. Puede que otros ejemplos
mejores sean los listados 15-5 y 3-7.
Formato horizontal
-- 124 of 644 --

¿Qué ancho debe tener una línea? Para responderlo, fíjese en la anchura de
las líneas de un programa convencional. De nuevo, examinamos siete
proyectos diferentes. En la figura 5.2 puede ver la distribución de longitud de
todos ellos. La regularidad es impresionante, en especial en tomo a los 45
caracteres. De hecho, los tamaños entre 20 y 60 representan un uno por cien
del número total de líneas. ¡Eso es un 40 por 100! Puede que otro 30 por 100
sea menos de 10 caracteres de ancho. Recuerde que es una escala de registro,
de modo que la apariencia lineal es muy significativa. Es evidente que los
programadores prefieren líneas menos anchas.
Figura 5.2. Distribución de anchura de líneas en Java.
Esto sugiere que debemos intentar reducir las líneas de código. El antiguo
límite Hollerith de 80 es un tanto arbitrario y no me opongo a líneas que
tienen 100 o incluso 120, pero no más.
Como norma, no debe tener que desplazarse hacia la derecha. Los
monitores modernos son más anchos y los programadores noveles pueden
reducir la fuente para encajar hasta 200 caracteres en la pantalla. No lo haga.
Mi límite personal es de 120.
Apertura y densidad horizontal
-- 125 of 644 --

Usamos el espacio en blanco horizontal para asociar elementos directamente
relacionados y separar otros con una relación menos estrecha. Fíjese en la
siguiente función:
private void measureLine(String line) {
lineCount++;
int lineSize = line.length();
totalChars += lineSize;
lineWidthHistogram.addLine(lineSize, lineCount);
recordWidestLine(lineSize);
}
Hemos rodeado los operadores de asignación con espacios en blanco para
destacarlos. Las instrucciones de asignación tienen dos elementos principales:
el lado izquierdo y el derecho. Los espacios acentúan esta separación.
Por otra parte, no hemos incluido espacios entre los nombres de las
funciones y el paréntesis de apertura, ya que la función y sus argumentos
están estrechamente relacionados. Su separación los desconectaría. Separo los
argumentos en los paréntesis de invocación de la función para acentuar la
coma e indicar que los argumentos son independientes. El espacio en blanco
también se usa para acentuar la precedencia de los operadores:
public class Quadratic {
public static double root1(double a, double b, double c) {
double determinant = determinant(a, b, c);
return (-b + Math.sqrt(determinant)) / (2*a);
}
public static double root2(int a, int b, int c) {
double determinant = determinant(a, b, c);
return (-b - Math.sqrt(determinant)) / (2*a);
}
private static double determinant(double a, double b, double c) {
return b*b - 4*a*c;
}
}
Fíjese en lo bien que se leen las ecuaciones. Los factores carecen de
espacios en blanco ya que tienen una mayor precedencia. Los términos se
separan mediante espacios en blanco ya que la suma y la resta son de
precedencia inferior.
Desafortunadamente, muchas herramientas de formato de código ignoran
la precedencia de los operadores e imponen un espaciado uniforme. Por ello,
separaciones sutiles como las anteriores suelen perderse tras modificar el
-- 126 of 644 --

---

## [Sección 39] sección 6.8. Codificación de transferencia de contenidos Base64

formato del código.
Alineación horizontal
Cuando era programador de lenguajes de ensamblado[28], usaba la alineación
horizontal para acentuar determinadas estructuras. Cuando comencé a
programar en C, C++ y Java, seguía intentando alinear los nombres de
variables en un conjunto de declaraciones o todos los valores en un grupo de
instrucciones de asignación. El aspecto de mi código era el siguiente:
public class FitNesseExpediter implements ResponseSender
{
private Socket socket;
private InputStream input;
private OutputStream output;
private Request request;
private Response response;
private FitNesseContext context;
protected long requestParsingTimeLimit;
private long requestProgress;
private long requestParsingDeadline;
private boolean hasError;
public FitNesseExpediter( Socket s,
FitNesseContext context) throws Exception
{
this.context = context;
socket = s;
input = s.getInputStream();
output = s.getOutputStream();
requestParsingTimeLimit = 10000;
}
Sin embargo, este tipo de alineación no es útil. Parece enfatizar los
elementos incorrectos y aleja la vista de la verdadera intención. Por ejemplo,
en la lista anterior de declaraciones, nos vemos tentados a leer la lista de
nombres de variables sin fijarnos en sus tipos. Del mismo modo, en la lista de
instrucciones de asignación, nos fijamos en los valores sin ver el operador.
Para empeorarlo todo, las herramientas automáticas de formato suelen
eliminar este tipo de alineación. Por tanto, al final, ya no lo uso. Ahora
prefiero declaraciones y asignaciones sin alinear, como se muestra a
-- 127 of 644 --

continuación, ya que resaltan una deficiencia importante. Si tengo listas
extensas que deben alinearse, el problema es la longitud de las listas, no la
falta de alineación. La longitud de la siguiente lista de declaraciones de
FitNesseExpediter sugiere que esta clase debe dividirse.
public class FitNesseExpediter implements ResponseSender
{
private Socket socket;
private InputStream input;
private OutputStream output;
private Request request;
private Response response;
private FitNesseContext context;
protected long requestParsingTimeLimit;
private long request Progress;
private long requestParsingDeadline;
private boolean hasError;
public FitNesseExpediter(Socket s, FitNesseContext context) throws
Exception
{
this.context = context;
socket = s;
input = s.getInputStream();
output = s.getOutputStream();
requestParsingTimeLimit = 10000;
}
Sangrado
Un archivo de código es una jerarquía más que un contorno. Incluye
información que pertenece a la totalidad del archivo, a sus clases
individuales, a los métodos de las clases, a los bloques de los métodos y a los
bloques de los bloques. Cada nivel de esta jerarquía es un ámbito en el que se
pueden declarar nombres y en el que se interpretan declaraciones e
instrucciones ejecutables.
Para que esta jerarquía de ámbitos sea visible, sangramos las líneas de
código fuente de acuerdo a su posición en la jerarquía. Las instrucciones al
nivel del archivo, como las declaraciones de clases, no se sangran. Los
métodos de una clase se sangran un nivel a la derecha de la clase. Las
implementaciones de dichos métodos se implementan un nivel a la derecha
de la declaración de los métodos. Las implementaciones de bloques se
-- 128 of 644 --

implementan un nivel a la derecha de su bloque contenedor y así
sucesivamente.
Los programadores dependen de este sistema de sangrado. Alinean
visualmente las líneas a la izquierda para ver el ámbito al que pertenece. De
este modo pueden acceder rápidamente a los ámbitos, como por ejemplo a
implementaciones de instrucciones if o while, que no son relevantes para la
situación actual. Buscan en la izquierda nuevas declaraciones de métodos,
variables e incluso clases. Sin el sangrado, los programas serian
prácticamente ilegibles.
Fíjese en los siguientes programas, sintáctica y semánticamente idénticos:
public class FitNesseServer implements SocketServer { private FitNesseContext
context; public FitNesseServer(FitNesseContext context) { this.context =
context; } public void serve(Socket s) { serve(s, 10000); } public void
serve(Socket s, long requestTimeout) { try { FitNesseExpediter sender = new
FitNesseExpediter(s, context);
sender.setRequestParsingTimeLimit(requestTimeout); sender.start(); }
catch(Exception e) { e.printStackTrace(); } } }
public class FitNesseServer implements SocketServer {
private FitNesseContext context;
public FitNesseServer(FitNesseContext context) {
this.context = context;
}
public void serve(Socket s) {
serve (s, 10000);
}
public void serve(Socket s, long requestTimeout) {
try {
FitNesseExpediter sender = new FitNesseExpediter(s, context);
sender.setRequestParsingTimeLimit(requestTimeout);
sender.start();
}
catch (Exception e) {
e.printStackTrace();
}
}
}
A la vista puede incluso apreciar la estructura del archivo sangrado.
Detectamos inmediatamente las variables, constructores y métodos de acceso.
En cuestión de segundos vemos que es una especie de interfaz de conexión,
-- 129 of 644 --

---

## [Sección 40] sección 6.8. Codificación de transferencia de contenidos Base64

con un tiempo de espera. La versión sin sangrar, por su parte, es
prácticamente impenetrable.
Romper el sangrado
En ocasiones tenemos la tentación de romper la regla de sangrado con
instrucciones if breves, bucles while breves o funciones breves. Siempre que
he sucumbido a esta tentación, he acabado por volver a aplicar el sangrado.
Por ello, evito replegar ámbitos a una línea, como en este ejemplo:
public class CommentWidget extends TextWidget
{
public static final String REGEXP = “^#[^\r\n]*(?:(?:\r\n)|\n|\r)?”;
public CommentWidget(ParentWidget parent, String text){super (parent,
text);}
public String render() throws Exception { return “”; }
}
Prefiero desplegar y sangrar los ámbitos:
public class CommentWidget extends TextWidget {
public static final String REGEXP = “^#[^\r\n]*(?:(?:\r\n)|\n|\r)?”;
public CommentWidget(ParentWidget parent, String text) {
super(parent, text);
}
public String render() throws Exception {
return “”;
}
}
Ámbitos ficticios
En ocasiones, el cuerpo de una instrucción while o for es ficticio, como se
muestra a continuación. No me gustan estas estructuras y prefiero evitarlas.
En caso de no poder hacerlo, me aseguro de sangrar el cuerpo ficticio y de
incluirlo entre paréntesis. No sabría decir cuántas veces me ha engañado un
punto y coma situado al final de un bucle while en la misma línea. A menos
que lo haga visible y lo sangre en una línea propia, es difícil de ver.
while (dis.read(buf, 0, readBufferSize) != -1)
;
-- 130 of 644 --

Reglas de equipo
Todo programador tiene sus reglas de
formato preferidas, pero si forma parte de
un equipo, el equipo manda.
Un equipo de programadores debe
acordar un único estilo de formato y todos
los integrantes del equipo deben aplicarlo.
El objetivo es que el software tenga un estilo coherente. No queremos que
parezca escrito por individuos enfrentados.
Cuando comencé el proyecto FitNesse en 2002, me reuní con el equipo
para definir un estilo de código. Tardamos 10 minutos. Decidimos dónde
añadir las llaves, qué tamaño de sangrado utilizar, los nombres de clases,
variables y métodos, y demás. Tras ello, codificamos las reglas en el IDE y
las cumplimos desde entonces. No son las reglas que prefiero, son las que el
equipo decidió. Y como miembro de ese equipo, las apliqué cuando creamos
el código del proyecto FitNesse.
Recuerde que un buen sistema de software se compone de una serie de
documentos que se leen fácilmente. Deben tener un estilo coherente y
dinámico. El lector debe confiar en que los formatos que ve en nuestro
archivo de código significarán lo mismo para otros. Lo último que queremos
es aumentar la complejidad del código creando una mezcla de estilos
diferentes.
Reglas de formato de Uncle Bob
Las reglas que uso personalmente son sencillas y se ilustran en el código del
Listado 5-6. Considérelo un ejemplo de documento estándar de código
óptimo.
Listado 5-6
-- 131 of 644 --

CodeAnalyzer.java.
public class CodeAnalyzer implements JavaFileAnalysis {
private int lineCount;
private int maxLineWidth;
private int widestLineNumber;
private LineWidthHistogram lineWidthHistogram;
private int totalChars;
public CodeAnalyzer() {
lineWidthHistogram = new LineWidthHistogram();
}
public static List<File> findJavaFiles(File parentDirectory) {
List<File> files = new ArrayList<File>();
findJavaFiles(parentDirectory, files);
return files;
}
private static void findJavaFiles(File parentDirectory, List<File> files)
{
for (File file : parentDirectory.listFiles()) {
if (file.getName().endsWith(“.java”))
files.add(file);
else if (file.isDirectory())
findJavaFiles(file, files);
}
}
public void analyzeFile(File javaFile) throws Exception {
BufferedReader br = new BufferedReader(new FileReader(javaFile));
String line;
while ((line = br.readLine()) != null)
measureLine(line);
}
private void measureLine(String line) {
lineCount++;
int lineSize = line.length();
totalChars += lineSize;
lineWidthHistogram.addLine(lineSize, lineCount);
recordWidestLine(lineSize);
}
private void recordWidestLine(int lineSize) {
if (lineSize > maxLineWidth) {
maxLineWidth = lineSize;
widestLineNumber = lineCount;
}
}
public int getLineCount() {
return lineCount;
}
-- 132 of 644 --

---

## [Sección 41] sección 6.8. Codificación de transferencia de contenidos Base64

public int getMaxLineWidth() {
return maxLineWidth;
}
public int getWidestLineNumber() {
return widestLineNumber;
}
public LineWidthHistogram getLineWidthHistogram() {
return lineWidthHistogram;
}
public double getMeanLineWidth() {
return (double)totalChars/lineCount;
}
public int getMedianLineWidth() {
Integer[] sortedwidths = getSortedWidths();
int cumulativeLineCount = 0;
for (int width : sortedwidths) {
cumulativeLineCount += lineCountForWidth(width);
if (cumulativeLineCount > lineCount/2)
return width;
}
throw new Error (“Cannot get here”);
}
private int lineCountForWidth(int width) {
return lineWidthHistogram.getLinesforWidth(width).size();
}
private Integer[] getSortedWidths() {
Set<Integer> widths = lineWidthHistogram.getWidths();
Integer[] sortedwidths = (widths.toArray(new Integer[0]));
Arrays.sort(sortedwidths);
return sortedwidths;
}
}
-- 133 of 644 --
Objetos y estructuras de datos
-- 134 of 644 --

Hay una razón para que las variables sean privadas. No queremos que nadie
más dependa de ellas. Queremos poder cambiar su tipo o implementación
cuando deseemos. Entonces, ¿por qué tantos programadores añaden
automáticamente métodos de establecimiento y recuperación que muestran
sus variables privadas como si fueran públicas?
Abstracción de datos
Fíjese en la diferencia entre los listados 6-1 y 6-2. Ambos representan los
datos de un punto cartesiano, pero uno muestra su implementación y otro la
oculta totalmente.
Listado 6-1
Punto concreto.
public class Point {
public double x;
public double y;
}
Listado 6-2
Punto abstracto.
public interface Point {
double getX();
double getY();
void setCartesian(double x, double y);
double getR();
double getTheta();
void set Polar(double r, double theta);
}
Lo mejor del Listado 6-2 es que no hay forma de saber si la
implementación está en coordenadas rectangulares o polares. ¡Puede que en
ninguna! Y aun así la interfaz representa sin lugar a dudas una estructura de
datos.
Pero representa algo más que una estructura de datos. Los métodos
refuerzan una política de acceso. Puede leer las coordenadas de forma
-- 135 of 644 --

independiente, pero debe establecerlas de forma conjunta como operación
atómica.
El Listado 6-1, por su parte, se implementa claramente en coordenadas
rectangulares y nos obliga a manipularlas de forma independiente, lo que
muestra la implementación. De hecho, la mostraría igualmente, aunque las
variables fueran privadas y usáramos métodos variables de establecimiento y
recuperación. Para ocultar la implementación no basta con añadir una capa de
funciones entre las variables. Se basa en la abstracción. Una clase no fuerza
sus variables a través de métodos de establecimiento y recuperación. Por el
contrario, muestra interfaces abstractas que permiten a sus usuarios manipular
la esencia de los datos sin necesidad de conocer su implementación.
Fíjese en los listados 6-3 y 6-4. El primero usa términos concretos para
indicar el nivel de combustible de un vehículo mientras que el segundo lo
hace con la abstracción del porcentaje. En el caso concreto, podemos estar
seguros de que se trata de métodos de acceso de variables. En el caso
abstracto, desconocemos la forma de los datos.
Listado 6-3
Vehículo concreto.
public interface Vehicle {
double getFuelTankCapacityInGallons();
double getGallonsOfGasoline();
}
Listado 6-4
Vehículo abstracto.
public interface Vehicle {
double getPercentFuelRemaining();
}
En ambos casos, la segunda opción es preferible. No queremos mostrar
los detalles de los datos, sino expresarlos en términos abstractos. Esto no se
consigue simplemente mediante interfaces o métodos de establecimiento y
recuperación. Hay que meditar seriamente la forma óptima de representar los
datos que contiene un objeto. La peor opción es añadir métodos de
-- 136 of 644 --

establecimiento y recuperación a ciegas.
Antisimetría de datos y objetos
Estos dos ejemplos ilustran la diferencia entre objetos y estructuras de datos.
Los objetos ocultan sus datos tras abstracciones y muestran funciones que
operan en dichos datos. La estructura de datos muestra sus datos y carece de
funciones con significado. Vuelva a leerlos. Fíjese en la naturaleza
complementaria de las dos definiciones. Son virtualmente opuestas. Puede
parecer una diferencia menor, pero tiene importantes implicaciones.
Fíjese en el ejemplo del Listado 6-5. La clase Geometry opera en las tres
clases de formas, que son sencillas estructuras de datos sin comportamiento.
Todo el comportamiento se encuentra en la clase Geometry.
Listado 6-5
Forma mediante procedimientos.
public class Square {
public Point topLeft;
public double side;
}
public class Rectangle {
public Point topLeft;
public double height;
public double width;
}
public class Circle {
public Point center;
public double radius;
}
public class Geometry {
public final double PI = 3.141592653589793;
public double area(Object shape) throws NoSuchShapeException
{
if (shape instanceof Square) {
Square s = (Square)shape;
return s.side * s.side;
}
else if (shape instanceof Rectangle) {
-- 137 of 644 --

---

## [Sección 42] sección 6.8. Codificación de transferencia de contenidos Base64

Rectangle r = (Rectangle)shape;
return r.height * r.width;
}
else if (shape instanceof Circle) {
Circle c = (Circle)shape;
return PI * c.radius * c.radius;
}
throw new NoSuchShapeException();
}
}
Los programadores orientados a objetos se quejarán de que es un ejemplo
de procedimiento, y tienen razón. Imagine qué pasaría si añadimos la función
perimeter() a Geometry. ¡Las clases de formas no se verían afectadas! ¡Y
las demás clases que dependieran de las formas tampoco! Por otra parte, si
añado una nueva forma, tendría que cambiar todas las funciones de Geometry.
Vuélvalo a leer. Comprobará que las dos condiciones son diametralmente
opuestas.
Fíjese ahora en la solución orientada a objetos del Listado 6-6. Aquí, el
método area() es polimórfico. No se necesita una clase Geometry. Por tanto,
si añado una nueva forma, ninguna de las funciones existentes se ven
afectadas, pero si añado otra función, habrá que cambiar todas las formas[29].
Listado 6-6
Formas polimórficas.
public class Square implements Shape {
private Point topLeft;
private double side;
public double area() {
return side*side;
}
public class Rectangle implements Shape {
private Point topLeft;
private double height;
private double width;
public double area() {
return height * width;
}
}
public class Circle implements Shape {
private Point center;
-- 138 of 644 --

private double radius;
public final double PI = 3.141592653589793;
public double area() {
return PI * radius * radius;
}
}
De nuevo, vemos la naturaleza complementaria de estas dos definiciones;
totalmente contrarias. Esto ilustra la dicotomía fundamental entre objetos y
estructuras de datos:
El código por procedimientos (el que usa estructuras de datos)
facilita la inclusión de nuevas funciones sin modificar las estructuras
de datos existentes. El código orientado a objetos, por su parte,
facilita la inclusión de nuevas clases sin cambiar las funciones
existentes.
El complemento también es cierto:
El código por procedimientos dificulta la inclusión de nuevas
estructuras de datos ya que es necesario cambiar todas las funciones.
El código orientado a objetos dificulta la inclusión de nuevas
funciones ya que es necesario cambiar todas las clases.
Por tanto, lo que es difícil para la programación orientada a objetos es
fácil para los procedimientos, y viceversa.
En cualquier sistema complejo habrá ocasiones en las que queramos
añadir nuevos tipos de datos en lugar de nuevas funciones. En dichos casos,
los objetos y la programación orientada a objetos es lo más adecuado. Por
otra parte, en ocasiones tendremos que añadir nuevas funciones en lugar de
tipos de datos, para lo que resulta más adecuado usar código por
procedimientos y estructuras de datos.
Los programadores experimentados saben que la idea de que todo es un
objeto es un mito. En ocasiones solamente queremos sencillas estructuras de
datos con procedimientos que operen en las mismas.
-- 139 of 644 --

La ley de Demeter
Existe una conocida heurística denominada Ley de Demeter[30] que afirma
que un módulo no debe conocer los entresijos de los objetos que manipula.
Como vimos en el apartado anterior, los objetos ocultan sus datos y muestran
operaciones, lo que significa que un objeto no debe mostrar su estructura
interna a través de métodos de acceso ya que, si lo hace, mostraría, no
ocultaría, su estructura interna.
En concreto, la ley de Demeter afirma que un método de una clase C sólo
debe invocar los métodos de:
C.
Un objeto creado por f.
Un objeto pasado como argumento a f.
Un objeto en una variable de instancia de C.
El método no debe invocar métodos de objetos devueltos por ninguna de
las funciones permitidas. Es decir, no hable con desconocidos, sólo con
amigos.
El siguiente código[31] parece incumplir la Ley de Demeter (entre otras
cosas) ya que invoca la función getScratchDir() en el valor devuelto de
getOptions() y después invoca getAbsolutePath() en el valor devuelto de
getScratchDir().
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
Choque de trenes
Ese tipo de código suele denominarse choque de trenes ya que se asemeja a
un grupo de vagones de tren. Estas cadenas de invocaciones suelen
considerarse un estilo descuidado y deben evitarse [G36]. Conviene dividirlas
de esta forma:
Options opts = ctxt.getOptions();
File scratchDir = opts.getScratchDir();
-- 140 of 644 --

---

## [Sección 43] sección 6.8. Codificación de transferencia de contenidos Base64

final String outputDir = scratchDir.getAbsolutePath();
¿Incumplen estos dos fragmentos de
código la Ley de Demeter? Sin duda el
módulo contenedor sabe que el objeto ctxt
contiene opciones, que contienen un
directorio scratch, que tiene una ruta
absoluta. La función sabe demasiado. La función que realiza la invocación
sabe cómo desplazarse por numerosos objetos diferentes.
Si incumple o no la Ley de Demeter depende de si ctxt, Options y
ScratchDir son objetos o estructuras de datos. Si son objetos, debería
ocultarse su estructura interna, no mostrarse, y conocer sus detalles internos
sería un claro incumplimiento de la Ley de Demeter. Por otra parte, si ctxt,
Options y ScratchDir son simples estructuras de datos, mostrarán su
estructura interna con naturalidad y la Ley de Demeter no se aplica.
El uso de funciones de acceso complica el problema. Si el código se
hubiera escrito de esta otra forma, probablemente no nos preocuparíamos de
si se incumple la Ley de Demeter o no.
final String outputDir = ctxt.options.ScratchDir.absolutePath;
El problema sería menos confuso si las estructuras de datos tuvieran
variables públicas y no funciones, y los objetos tuvieran variables privadas y
funciones públicas. Sin embargo, existen estructuras y estándares (como los
bean) que exigen que incluso una sencilla estructura de datos tenga elementos
de acceso y mutación.
Híbridos
Esta confusión genera ocasionalmente desafortunadas estructuras híbridas
mitad objeto y mitad estructura de datos. Tienen funciones que realizan tareas
significativas y también variables públicas o método públicos de acceso y
mutación que hacen que las variables privadas sean públicas, y tientan a otras
funciones externas a usar dichas variables de la misma forma que un
programa por procedimientos usaría una estructura de datos[32]. Estos
-- 141 of 644 --

híbridos dificultan la inclusión de nuevas funciones y también de nuevas
estructuras de datos. Son lo peor de ambos mundos. Evítelos. Indican un
diseño descuidado cuyos autores dudan, o peor todavía, desconocen, si
necesitan protegerse de funciones o tipos.
Ocultar la estructura
¿Qué pasaría si ctxt, options y scratchDir fueran objetos con un
comportamiento real? Como los objetos deben ocultar su estructura interna,
no podríamos desplazarnos por los mismos. Entonces, ¿cómo obtendríamos
la ruta absoluta del directorio scratch?
ctxt.getAbsolutePathOfScratchDirectoryOption();
o
ctxt.getScratchDirectoryOption().getAbsolutePath()
La primera opción provocaría una explosión de métodos en el objeto
ctxt. La segunda asume que getScratchDirectoryOption() devuelve una
estructura de datos, no un objeto. Ninguna de las opciones parece correcta. Si
ctxt es un objeto, deberíamos indicarle que hiciera algo, no preguntar sobre
sus detalles internos. Entonces, ¿para qué queremos la ruta absoluta del
directorio scratch? ¿Cómo vamos a usarla? Fíjese en este código del mismo
módulo (muchas líneas después):
String outFile = outputDir + “/” + className.replace(‘.’, ‘/’) + “.class”;
FileOutputStream fout = new FileOutputStream(outFile);
BufferedOutputStream bos = new BufferedOutputStream(fout);
La mezcla de distintos niveles de detalle [G34][G6] es preocupante.
Puntos, guiones, extensiones de archivo y objetos File no deben mezclarse
de esta forma, junto al código contenedor. Si lo ignoramos, vemos que la
intención de obtener la ruta absoluta del directorio scratch es crear un
archivo de borrador de un nombre concreto.
¿Y si le dijéramos al objeto ctxt que hiciera esto?
BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName);
Parece algo razonable para un objeto. Permite a ctxt ocultar sus detalles
internos e impide que la función actual incumpla la Ley de Demeter y se
-- 142 of 644 --

desplace por objetos que no debería conocer.
Objetos de transferencia de datos
La quintaesencia de una estructura de datos es una clase con variables
públicas y sin funciones. En ocasiones se denomina Objeto de transferencia
de datos (Data Transfer Object u OTD). Los OTD son estructuras muy útiles,
en especial para comunicarse con bases de datos o analizar mensajes de
conexiones, etc. Suelen ser los primeros de una serie de fases de traducción
que convierten datos sin procesar en objetos en el código de la aplicación.
Más común es la forma de bean mostrada en el Listado 6-7. Los bean tienen
variables privadas manipuladas por métodos de establecimiento y
recuperación. La cuasi-Encapsulación de bean hace que algunos puristas de la
programación orientada a objetos se sientan mejor pero no ofrece ningún otro
beneficio.
Listado 6-7
address.java
public class Address {
private String street;
private String streetExtra;
private String city;
private String state;
private String zip;
public Address(String Street, String streetExtra,
String city, String state, String zip) {
this.street = street;
this.streetExtra = streetExtra;
this.city = city;
this.state = state;
this.zip = zip;
}
public String getStreet() {
return street;
}
public String getStreetExtra() {
return streetExtra;
}
-- 143 of 644 --

---

## [Sección 44] sección 6.8. Codificación de transferencia de contenidos Base64

public String getCity() {
return city;
}
public String getState() {
return getState;
}
public String getZip() {
return zip;
}
}
Registro activo
Los registros activos son una forma especial de OTD. Son estructuras de
datos con variables públicas (o de acceso por bean) pero suelen tener
métodos de navegación como save y find. Por lo general, estos registros
activos son traducciones directas de tablas de base de datos u otros orígenes
de datos. Desafortunadamente, muchos programadores intentan procesar
estas estructuras de datos como si fueran objetos y les añaden métodos de
reglas empresariales. Es algo extraño ya que crea un híbrido entre una
estructura de datos y un objeto.
La solución, evidentemente, consiste en considerar al registro activo una
estructura de datos y crear objetos independientes que contengan las reglas
empresariales y que oculten sus datos internos (que probablemente sean
instancias del propio registro activo).
Conclusión
Los objetos muestran comportamiento y ocultan datos. Esto facilita la
inclusión de nuevos tipos de objetos sin necesidad de cambiar los
comportamientos existentes. También dificulta la inclusión de nuevos
comportamientos en objetos existentes. Las estructuras de datos muestran
datos y carecen de comportamiento significativo. Esto facilita la inclusión de
nuevos comportamientos en las estructuras de datos existentes, pero dificulta
la inclusión de nuevas estructuras de datos en funciones existentes.
-- 144 of 644 --

En un sistema, en ocasiones necesitaremos la flexibilidad de añadir
nuevos tipos de datos, por lo que preferimos objetos para esa parte del
sistema. En otros casos, querremos añadir nuevos comportamientos, para lo
que preferimos tipos de datos y procedimientos en esa parte del sistema. Los
buenos programadores de software entienden estos problemas sin prejuicios y
eligen el enfoque más adecuado para cada tarea concreta.
Bibliografía
[Refactoring]: Refactoring: Improving the Design of Existing Code,
Martin Fowler et al., Addison-Wesley, 1999.
-- 145 of 644 --
Procesar errores
por Michael Feathers
Le parecerá extraño encontrar una sección de control de errores en un libro
sobre código limpio. El control de errores es algo que todos tenemos que
hacer al programar. Las entradas pueden ser incorrectas y los dispositivos
pueden fallar, y cuando lo hacen, los programadores somos responsables de
comprobar que el código hace lo que debe hacer.
No obstante, la conexión con el código limpio debe ser evidente. Muchas
bases de código están totalmente dominadas por el control de errores. Cuando
digo que están dominadas, no quiero decir que únicamente realicen control de
-- 146 of 644 --

código, sino que es prácticamente imposible ver lo que el código hace debido
a todo ese control de errores. El control de errores es importante, pero si
oscurece la lógica, es incorrecto.
En este capítulo detallaremos diversas técnicas y consideraciones que
puede usar para crear código limpio y robusto, código que procese los errores
con elegancia y estilo.
Usar excepciones en lugar de códigos devueltos
En el pasado, muchos lenguajes carecían de excepciones. Las técnicas para
procesar e informar de errores eran limitadas. Se definía un indicador de error
o se devolvía un código de error que el invocador podía comprobar. El
código del Listado 7-1 ilustra estos enfoques.
Listado 7-1
DeviceController.java.
public class DeviceController {
…
public void sendShutDown() {
DeviceHandle handle = getHandle(DEV1);
// Comprobar el estado del dispositivo
if (handle != DeviceHandle.INVALID) {
// Guardar el estado del dispositivo en el campo de registro
retrieveDeviceRecord(handle);
// Si no está suspendido, cerrarlo
if { record.getStatus() != DEVICE_SUSPENDED) {
pauseDevice(handle);
clearDeviceWorkQueue(handle);
closeDevice(handle);
} else {
logger.log(“Device suspended. Unable to shut down”);
}
} else {
logger.log(“Invalid handle for: ” + DEV1.toString());
}
}
…
}
El problema de estos enfoques es que confunden al invocador. El
invocador debe comprobar inmediatamente los errores después de la
-- 147 of 644 --

---

## [Sección 45] sección 6.8. Codificación de transferencia de contenidos Base64

invocación. Desafortunadamente, es algo que se suele olvidar. Por ello, es
más recomendable generar una excepción al detectar un error. El código de
invocación es más limpio. Su lógica no se oscurece por el control de errores.
El Listado 7-2 muestra el código tras generar una excepción en los
métodos que pueden detectar errores.
Listado 7-2
DeviceController.java (con excepciones).
public class DeviceController {
…
public void sendShutDown() {
try {
tryToShutDown();
} catch (DeviceShutDownError e) {
logger.log(e);
}
}
private void tryToShutDown() throws DeviceShutDownError {
DeviceHandle handle = getHandle(DEV1);
DeviceRecord record = retrieveDeviceRecord(handle);
pauseDevice(handle);
clearDeviceWorkQueue(handle);
closeDevice(handle);
}
private DeviceHandle getHandle(DeviceID id) {
…
throw new DeviceShutDownError(“Invalid handle for: ” - id.toString());
…
}
…
}
Comprobará que es mucho más limpio. No es cuestión de estética. El
código es mejor porque se solventan dos preocupaciones: el algoritmo para
apagar el dispositivo y el control de errores ahora se encuentran separados.
Puede ver cada uno de ellos y entenderlos de forma independiente.
Crear primero la instrucción try-catch-finally
-- 148 of 644 --

Uno de los aspectos más interesantes de las excepciones es que definen un
ámbito en el programa. Al ejecutar código en la parte try de una instrucción
try-catch-finally, indicamos que la ejecución se puede cancelar en
cualquier momento y después retomar en catch.
Los bloques try son como las transacciones, catch debe salir del
programa en un estado coherente, independientemente de lo que suceda en
try. Por este motivo, es aconsejable iniciar con una instrucción try-catchfinally el código que genere excepciones. De este modo define lo que debe
esperar el usuario del código, independientemente de que se produzca un
error en el código ejecutado en la cláusula try.
Veamos un ejemplo. Imagine que tiene que crear un código que acceda a
un archivo y lea objetos serializados.
Comenzamos con una prueba de unidad que muestra que obtendremos
una excepción cuando el archivo no exista:
@Test(expected = StorageException.class)
public void retrieveSectionShouldThrowOnInvalidFileName() {
sectionStore.retrieveSection(“invalid - file”);
}
La prueba nos lleva a crear lo siguiente:
public List<RecordedGrip> retrieveSection(String sectionName) {
// se devuelve un resultado ficticio hasta tener una implementación real
return new ArrayList<RecordedGrip>();
}
Nuestra prueba falla ya que no genera una excepción. Tras ello,
cambiamos la implementación para que intente acceder a un archivo no
válido. Esta operación genera una excepción:
public List<RecordedGrip> retrieveSection (String sectionName) {
try {
FileInputstream stream = new FileInputStream(sectionName)
} catch (Exception e) {
throw new StorageException(“retrieval error”, e);
}
return new ArrayList<RecordedGrip>();
}
Ahora la prueba es correcta ya que capturamos la excepción y ya
podemos refactorizar. Podemos reducir el tipo de la excepción capturada para
que coincida con el tipo generado desde el constructor FileInputStream:
-- 149 of 644 --

FileNotFoundException:
public List<RecordedGrip> retrieveSection(String sectionName) {
try {
FileInputStream stream = new FileInputStream(sectionName);
stream.close();
} catch (FileNotFoundException e) {
throw new StorageException(“retrieval error”, e);
}
return new ArrayList<RecordedGrip>();
}
Ahora que hemos definido el ámbito con una estructura try-catch,
podemos usar TDD para diseñar el resto de la lógica necesaria. Dicha lógica
se añade entre la creación de FileInputStream y el cierre, y podemos
pretender que no pasa nada incorrecto.
Intente crear pruebas que fuercen las excepciones, para después añadir al
controlador un comportamiento que satisfaga dichas pruebas. De este modo
primero creará el ámbito de transacción del bloque try y podrá mantener la
naturaleza de transacción del ámbito.
Usar excepciones sin comprobar
El debate ha terminado. Durante años, los programadores de Java han
debatido las ventajas y los problemas de las excepciones comprobadas.
Cuando aparecieron en la primera versión de Java, parecían una gran idea. La
firma de todos los métodos enumeraría todas las excepciones que se podían
pasar a su invocador. Es más, estas excepciones formaban parte del tipo del
método. El código no se compilaría si la firma no coincidía con lo que el
código iba a hacer.
En aquel momento, pensábamos que las excepciones comprobadas eran
una gran idea y sí, ofrecían ciertas ventajas. Sin embargo, ahora es evidente
que no se necesitan para crear software robusto. C# carece de excepciones
comprobadas y, a pesar de los intentos, C++ tampoco, como sucede en
Python o Ruby. Y en todos estos lenguajes se puede crear software robusto.
Por ello, debemos decidir si las excepciones comprobadas valen su precio.
¿Qué precio? El precio de las excepciones comprobadas es un
-- 150 of 644 --

---

## [Sección 46] sección 6.8. Codificación de transferencia de contenidos Base64

incumplimiento del principio abierto/cerrado[33]. Si genera una excepción
comprobada desde un método de su código y la cláusula catch se encuentra
tres niveles por debajo, debe declarar dicha excepción en la firma de todos los
métodos comprendidos entre su posición y catch. Esto significa que un
cambio en un nivel inferior del software puede forzar cambios de firma en
muchos niveles superiores. Será necesario volver a generar e implementar los
módulos cambiados, aunque no cambien los elementos a los que hacen
referencia.
Piense en la jerarquía de invocación de un sistema. Las funciones de la
parte superior invocan a las funciones situadas debajo, que invocan a otras
funciones inferiores y así sucesivamente. Imagine que una de las funciones
de nivel inferior se modifica de forma que debe generar una excepción. Si la
excepción se comprueba, la firma de la función tendrá que añadir una
cláusula throws. Pero esto significa que todas las funciones que invoquen
nuestra función modificada también tendrán que cambiarse para capturar la
nueva excepción o para añadir la correspondiente cláusula throws en su
firma. Y así indefinidamente. El resultado final es una cascada de cambios
que pasan desde los niveles inferiores del software hasta los superiores. La
encapsulación se rompe ya que todas las funciones en la ruta de throw deben
conocer detalles de la excepción de nivel inferior. Como el cometido de las
excepciones es permitimos procesar errores a distancia, es una lástima que las
excepciones comprobadas rompan la encapsulación de esta forma.
Las excepciones comprobadas pueden ser útiles si tiene que crear una
biblioteca crítica: tendrá que capturarlas. Pero en el desarrollo de aplicaciones
generales, los costes de dependencia superan las ventajas.
Ofrecer contexto junto a las excepciones
Las excepciones que genere deben proporcionar el contexto adecuado para
determinar el origen y la ubicación de un error. En Java, puede obtener un
rastreo de pila de cualquier excepción; sin embargo, no le indicará el
cometido de la función fallida.
Redacte mensajes de error informativos y páselos junto a sus
-- 151 of 644 --

excepciones. Mencione la operación fallida y el tipo de fallo. Si guarda
registros en su aplicación, incluya información suficiente para poder registrar
el error en la cláusula catch.
Definir clases de excepción de acuerdo a las necesidades
del invocador
Existen varias formas de clasificar los errores. Podemos hacerlo por origen
(¿provienen de uno u otro componente?) o por tipo (¿son fallos del
dispositivo, de la red o errores de programación?). Sin embargo, al definir
clases de excepción en una aplicación, debemos preocuparnos principalmente
en cómo se capturan.
Veamos un pobre ejemplo de clasificación de excepciones. Es una
instrucción try-catch-finally de la invocación de una biblioteca de
terceros. Abarca todas las excepciones que las invocaciones pueden generar:
ACMEPort port = new ACMEPort(12);
try {
port.open();
} catch (DeviceResponseException e) {
reportPortError(e);
logger.log{“Device response exception”, e);
} catch (ATM1212UnlockedException e) {
reportPortError(e);
logger.log(“Unlock exception”, e);
} catch (GMXError e) {
reportPortError(e);
logger.log(“Device response exception”);
} finally {
…
}
Esta instrucción contiene elementos duplicados, algo que no debería
sorprendernos. En muchos casos de control de excepciones, el trabajo que
realizamos es relativamente estándar independientemente de la causa real.
Debemos registrar un error y asegurarnos de poder continuar.
En este caso, como sabemos que el trabajo es el mismo
independientemente de la excepción, podemos simplificar el código si
incluimos la API invocada y nos aseguramos de que devuelve un tipo de
-- 152 of 644 --

excepción común:
LocalPort port = new LocalPort(12);
try {
port.open();
} catch (PortDeviceFailure e) {
reportError(e);
logger.log(e.getMessage(), e);
} finally {
…
}
Nuestra clase LocalPort es un simple envoltorio que captura y traduce
excepciones generadas por la clase ACMEPort:
public class LocalPort {
private ACMEPort innerPort;
public LocalPort(int portNumber) {
innerPort = new ACMEPort(portNumber);
}
public void open() {
try {
innerPort.open();
} catch (DeviceResponseException e) {
throw new PortDeviceFailure(e);
} catch (ATM1212UnlockedException e) {
throw new PortDeviceFailure(e);
} catch (GMXError e) {
throw new PortDeviceFailure(e);
}
}
…
}
Los envoltorios como el definido para ACMEPort pueden ser muy útiles.
De hecho, es recomendable envolver API de terceros. Al hacerlo, se
minimizan las dependencias: puede cambiar a otra biblioteca diferente sin
apenas problemas y el envoltorio también facilita imitar invocaciones de
terceros cuando se prueba el código. Una última ventaja es que no estamos
limitados a las decisiones de diseño de API de un determinado fabricante.
Puede definir una API que le resulte cómoda. En el ejemplo anterior,
definimos un único tipo de excepción para el fallo de puertos y podemos
escribir un código mucho más limpio. A menudo, una única clase de
excepción es suficiente para una zona concreta del código. La información
enviada con la excepción puede distinguir los errores. Use clases diferentes
-- 153 of 644 --

---

## [Sección 47] sección 6.8. Codificación de transferencia de contenidos Base64

sólo para capturar una excepción y permitir el paso de otra distinta.
Definir el flujo normal
Si sigue los consejos de apartados
anteriores, realizará una importante
separación entre la lógica empresarial y el
control de errores. La mayoría de su código
parecerá un algoritmo limpio y sin adornos.
Sin embargo, el proceso desplaza la
detección de errores hacia los bordes del programa. Debe envolver API
externas para poder generar sus propias excepciones y definir un controlador
por encima del código para poder procesar cálculos cancelados. En muchos
casos es el enfoque más acertado, pero en ocasiones conviene no cancelar.
Veamos un ejemplo, un código extraño que suma gastos en una
aplicación de facturación:
try {
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();
} catch(MealExpensesNotFound e) {
m_total += getMealPerDiem();
}
En esta empresa, si las comidas son gastos, pasan a formar parte del total.
Si no lo son, los trabajadores reciben una cantidad diaria para la comida. La
excepción entorpece la lógica. Sería más adecuado no tener que procesar el
caso especial y el código sería mucho más sencillo:
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
m_total += expenses.getTotal();
¿De verdad que el código puede ser tan simple? Pues sí. Podemos
cambiar ExpenseReportDAO para que siempre devuelva un objeto
MealExpense. Si no hay gastos de comida, devuelve un objeto MealExpense
que devuelve la dieta diaria como total:
public class PerDiemMealExpenses implements MealExpenses {
public int getTotal() {
// devolver la dieta diaria predeterminada
-- 154 of 644 --

}
}
Es lo que se denomina Patrón de Caso Especial [Fowler]. Se crea una
clase o se configura un objeto que procese un caso especial. Al hacerlo, el
código cliente no tiene que procesar comportamientos excepcionales. Dichos
comportamientos se encapsulan en un objeto de caso especial.
No devolver Null
Creo que toda descripción del control de errores debe mencionar los
elementos proclives a errores. El primero es devolver null. He perdido la
cuenta de la cantidad de aplicaciones en que las que línea sí y línea también
se comprueba null:
public void registerItem(Item item) {
if (item != null) {
ItemRegistry registry = peristentStore.getItemRegistry();
if (registry != null) {
Item existing = registry.getItem(item.getID());
if (existing.getBillingPeriod().hasRetailOwner()) {
existing.register(item);
}
}
}
}
Si trabaja en una base de código como ésta, puede que no le parezca tan
mala, pero lo es. Al devolver null, básicamente nos creamos trabajo y
generamos problemas para los invocadores. Basta con que falte una
comprobación de null para que la aplicación pierda el control.
¿Se ha fijado en que no hay una comprobación de null en la segunda
línea de la instrucción if anidada? ¿Qué sucedería en tiempo de ejecución si
persistentStore fuera null? Se generaría NullPointerException en
tiempo de ejecución y se capturaría NullPointerException en el nivel
superior o no. En ambos casos es incorrecto. ¿Qué debería hace como
respuesta a la generación de NullPointerException desde el interior de su
aplicación? Se puede afirmar que el problema de este código es la ausencia
de una comprobación de null pero en realidad el problema es su exceso. Si
-- 155 of 644 --

siente la tentación de devolver null desde un método, pruebe a generar una
excepción o a devolver un objeto de caso especial. Si invoca un método que
devuelva null desde una API de terceros, envuélvalo en un método que
genere una excepción o devuelva un objeto de caso especial. En muchos
casos, los objetos de caso especial son un remedio sencillo. Imagine que tiene
el siguiente código:
List<Employee> employees = getEmployees();
if (employees != null) {
for(Employee e : employees) {
totalPay += e.getPay();
}
}
Ahora, getEmployees puede devolver null, ¿pero es necesario? Si
cambiamos getEmployee para que devuelva una lista vacía, podremos limpiar
el código:
List<Employee> employees = getEmployees();
for(Employee e : employees) {
totalPay += e.getPay();
}
Afortunadamente, Java dispone de Collections.emptyList() y
devuelve una lista inmutable predefinida que podemos usar para este
cometido:
public List<Employee> getEmployees() {
if (… there are no employees …)
return Collections.emptyList();
}
Si usa este tipo de código, minimizará la presencia de
NullPointerException y su código será más limpio.
No pasar Null
Devolver null desde métodos es incorrecto, pero es peor pasar null a
métodos. A menos que trabaje con una API que espere que pase null, debe
evitarlo siempre que sea posible. Veamos otro ejemplo, un sencillo método
que calcula una métrica para dos puntos:
public class MetricsCalculator
-- 156 of 644 --

---

## [Sección 48] sección 6.8. Codificación de transferencia de contenidos Base64

{
public double xProjection(Point p1, Point p2) {
return (p2.x – p1.x) * 1.5;
}
…
}
¿Qué sucede cuando alguien pasa null como argumento?
calculator.xProjection(null, new Point (12, 13));
Se genera NullPointerException, evidentemente.
¿Cómo solucionarlo? Podríamos crear un nuevo tipo de excepción y
generarla:
public class MetricsCalculator
{
public double xProjection(Point p1, Point p2) {
if (p1==null || p2==null) {
throw InvalidArgumentException(
“Invalid argument for MetricsCalculator.xProjection”);
}
return (p2.x – p1.x) * 1.5; }
}
}
¿Mejor? Puede que sea mejor que una excepción de puntero nulo, pero
recuerde que debe definir un controlador para InvalidArgumentException.
¿Qué debe hacer el controlador? ¿Hay alguna forma correcta de hacerlo?
Existe otra alternativa, usar un grupo de afirmaciones:
public class MetricsCalculator (
public double xProjection{Point p1, Point p2) {
assert p1 != null : “p1 should not be null”;
assert p2 != null : “p2 should not be null”;
return (p2.x - pl.x) * 1.5;
}
}
Es documentación correcta pero no soluciona el problema. Si alguien
pasa null, seguirá produciéndose un error de tiempo de ejecución.
En la mayoría de lenguajes de programación no hay una forma correcta
de procesar un null pasado por accidente. Como éste es el caso, el enfoque
racional es impedir que se pase null de forma predeterminada. Si lo hace,
puede diseñar código sabiendo que null en una lista de argumentos indica un
problema y los errores serán menores.
-- 157 of 644 --

Conclusión
El código limpio es legible pero también debe ser robusto. No son objetivos
opuestos. Podemos crear código limpio y robusto si consideramos el control
de errores una preocupación diferente, algo que vemos de forma
independiente desde nuestra lógica principal. Si somos capaces de lograrlo,
razonaremos de forma independiente y podemos aumentar la capacidad de
mantenimiento de nuestro código.
Bibliografía
[Martin]: Agile Software Development: Principles, Patterns, and
Practices, Robert C. Martin, Prentice Hall, 2002.
-- 158 of 644 --
Límites
por James Grenning
No es habitual que controlemos todo el software de nuestros sistemas. En
ocasiones, adquirimos paquetes de terceros o usamos código abierto. En otros
casos, dependemos de equipos de nuestra propia empresa para producir
-- 159 of 644 --

componentes o subsistemas que utilizamos. De algún modo debemos integrar
este código externo con el nuestro. En este capítulo veremos prácticas y
técnicas para definir con claridad los límites de nuestro software.
Utilizar código de terceros
Existe una tensión natural entre el proveedor de una interfaz y el usuario de la
misma. Los proveedores de paquetes y estructuras de terceros abogan por una
capacidad de aplicación global para poder trabajar en diversos entornos y
atraer a un público más amplio. Los usuarios, por su parte, desean una
interfaz centrada en sus necesidades concretas. Esta tensión puede provocar
problemas en los límites de nuestros sistemas.
Analicemos java.util.Map como ejemplo. Como puede apreciar en la
siguiente lista. Map tiene una amplia interfaz con numerosas prestaciones.
Esta potencia y flexibilidad es muy útil, pero también puede ser un problema.
Por ejemplo, nuestra aplicación puede generar un Map y compartirlo. Nuestra
intención puede que sea que ninguno de los receptores del mapa borre sus
elementos. Pero en la parte superior de la lista encontramos el método
clear(). Cualquier usuario del mapa puede borrarlo. O puede que nuestra
convención de diseño determine que sólo se puedan almacenar objetos
concretos en el mapa, pero Map no limita de forma fiable los tipos de objetos
que admite. Cualquier usuario puede añadir elementos de cualquier tipo a
cualquier mapa.
clear() void - Map
containsKey (Object key) boolean - Map
containsValue (Object value) boolean - Map
entrySet() Set - Map
equals(Object o) boolean - Map
get(Object key) Object - Map
getClass() Class<? extends Object> - Object
hashCode() int - Map
isEmpty() boolean - Map
keySet() Set - Map
notify() void - Object
-- 160 of 644 --

---

## [Sección 49] sección 6.8. Codificación de transferencia de contenidos Base64

notifyAll() void - Object
put(Object key, Object value) Object - Map
putAll(Map t) void - Map
remove(Object key) Object - Map
size() int - Map
toString() String - Object
values() Collection - Map
wait() void - Object
wait(long timeout) void - Object
wait(long timeout, int nanos) void - Object
Figura 8.1. Los métodos de Map
Si nuestra aplicación necesita un mapa de Sensor, comprobará que los
sensores se definen de esta forma:
Map sensors = new HashMap();
Tras ello, cuando otra parte del código necesite acceder a sensor, vemos
este código:
Sensor s = (Sensor)sensors.get(sensorId);
No lo vemos una sola vez, sino repetidamente a lo largo del código. El
cliente de este código es responsable de obtener un objeto de Map y
convertirlo al tipo correcto. Funciona, pero no es código limpio. Además, este
código no cuenta su historia como debería. La legibilidad del código se
podría mejorar mediante el uso de genéricos, como se indica a continuación:
Map<Sensor> sensors = new HashMap<Sensor>();
…
Sensor s = sensors.get(sensorId);
Sin embargo, esto no soluciona el problema de que Map<Sensor> ofrezca
más prestaciones de las que necesitamos o deseamos.
Al pasar una instancia de Map<Sensor> en el sistema, significa que habrá
muchos puntos que corregir si la interfaz de Map cambia. Seguramente piense
que son cambios improbables, pero recuerde que se han producido al añadir
compatibilidad con genéricos en Java 5. Sin duda hemos visto sistemas que
impiden el uso de genéricos debido a la gran cantidad de cambios necesarios
para compensar el uso liberal de Map.
Una forma más limpia de usar Map sería la siguiente. A ningún usuario
-- 161 of 644 --

Sensor le importa si se usan genéricos o no. Esa opción se ha convertido (y
siempre debería serlo) en un detalle de implementación.
public class Sensors {
private Map sensors = new HashMap();
public Sensor getById(String id) {
return (Sensor) sensors.get(id);
}
//corte
}
La interfaz en el límite (Map) está oculta. Ha conseguido evolucionar sin
apenas impacto en el resto de la aplicación. El uso de genéricos ya no es un
problema ya que la conversión y la administración de tipos se procesa dentro
de la clase Sensors.
Esta interfaz también se ha ajustado y limitado a las necesidades de la
aplicación. Genera código más fácil de entender y con menor probabilidad de
errores. La clase Sensors puede aplicar las reglas empresariales y de diseño.
No sugerimos que se encapsulen de esta forma todos los usos de Map,
sino que no se pase Map (ni otras interfaces en el límite) por el sistema. Si usa
una interfaz de límite como Map, manténgala dentro de la clase o la familia de
clases en la que se use. Evite devolverla o aceptarla como argumento de API
públicas.
Explorar y aprender límites
El código de terceros nos permite obtener mayor funcionalidad en menos
tiempo. ¿Por dónde empezamos cuando queremos utilizar un paquete de
terceros? Nuestra labor no es probar el código, pero sí crear pruebas para el
código de terceros que utilicemos.
Imagine que no es evidente cómo usar una biblioteca de terceros.
Podríamos perder uno o varios días en leer la documentación y decidir cómo
usarla. Tras ello, podríamos escribir el código para usar el código de terceros
y comprobar si se comporta de la forma esperada. No deberíamos
sorprendernos por tener que realizar extensas sesiones de depuración
intentando localizar errores en nuestro código o en el suyo.
-- 162 of 644 --

Aprender el código de terceros es complicado, y también integrarlo.
Hacer ambas cosas al mismo tiempo es el doble de complicado. Necesitamos
un enfoque diferente. En lugar de experimentar y probar el nuevo material en
nuestro código de producción, podríamos crear pruebas que analicen nuestro
entendimiento del código de terceros. Jim Newkirk las denomina pruebas de
aprendizaje[34].
En las pruebas de aprendizaje, invocamos la API de terceros como
supuestamente la usaríamos en nuestra aplicación. Básicamente realizamos
experimentos controlados para comprobar si la entendemos. Las pruebas se
centran en lo que queremos obtener de la API.
Aprender log4j
Imagine que desea usar el paquete de Apache log4j en lugar de su propio
dispositivo de registro personalizado. Lo descarga y abre la página inicial de
la documentación. Sin una lectura exhaustiva, crea el primer caso de prueba
con la esperanza de que escriba hello en la consola.
@Test
public void testLogCreate() {
Logger logger = Logger.getLogger(“MyLogger”);
logger.info(“hello”);
}
Al ejecutarlo, el registrador genera un error que nos indica que
necesitamos algo denominado Appender. Tras investigar, descubrimos que
existe un elemento ConsoleAppender. Creamos ConsoleAppender y
comprobamos si hemos conseguido revelar los secretos del registro en la
consola.
@Test
public void testLogAddAppender() {
Logger logger = Logger.getLogger (“MyLogger”);
ConsoleAppender appender = new ConsoleAppender();
logger.addAppender(appender);
logger.info(“hello”);
}
En esta ocasión descubrimos que Appender carece de flujo de salida, algo
extraño, ya que parece lógico que lo tuviera. Tras recurrir a Google,
-- 163 of 644 --

---

## [Sección 50] sección 6.8. Codificación de transferencia de contenidos Base64

probamos lo siguiente:
@Test
public void testLogAddAppender() {
Logger logger = Logger.getLogger(“MyLogger”);
logger.removeAllAppenders();
logger.addAppender(new ConsoleAppender(
new PatternLayout(“%p %t %m%n”),
ConsoleAppender.SYSTEM_OUT));
logger.info(“hello”);
}
Funciona; en la consola aparece un mensaje con la palabra hello. Resulta
extraño tener que indicarle a ConsoleAppender que escriba en la consola.
Al eliminar el argumento ConsoleAppender.SystemOut, vemos que
hello sigue impreso. Pero al eliminar PatternLayout, de nuevo vemos la
queja de la falta de un flujo de salida. Es un comportamiento muy extraño.
Si nos fijamos en la documentación, vemos que el constructor
ConsoleAppender predeterminado no está configurado, lo que no parece
demasiado obvio ni útil. Parece más bien un error o una incoherencia de
log4j.
Tras nuevas búsquedas en Google, investigaciones y pruebas,
conseguimos el Listado 8-1. Hemos descubierto cómo funciona log4j y
hemos codificado esos conocimientos en un grupo de sencillas pruebas de
unidad.
Listado 8-1
LogTest.java.
public class LogTest (
private Logger logger;
@Before
public void initialize() {
logger = Logger.getLogger(“logger”);
logger.removeAllAppenders();
Logger.getRootLogger().removeAllAppenders();
}
@Test
public void basicLogger() {
BasicConfigurator.configure();
logger.info(“basicLogger”);
}
-- 164 of 644 --

@Test
public void addAppenderWithStream() {
logger.addAppender(new ConsoleAppender(
new PatternLayout (“%p %t %m%n”),
ConsoleAppender.SYSTEM_OUT));
logger.info(“addAppenderWithStream”);
}
@Test
public void addAppenderWithoutStream() {
logger.addAppender(new ConsoleAppender(
new PatternLayout(“%p %t %m%n”)));
logger.info(“addAppenderWithoutStream”);
}
}
Ahora sabemos cómo inicializar un sencillo registrador de consola y
encapsular ese conocimiento en nuestra propia clase de registro para que el
resto de la aplicación se aísle de la interfaz de límite log4j.
Las pruebas de aprendizaje son algo más que gratuitas
Las pruebas de aprendizaje no cuestan nada. De todas formas, hemos tenido
que aprender la API y crear las pruebas fue una forma sencilla y aislada de
adquirir esos conocimientos. Las pruebas de aprendizaje fueron experimentos
precisos que permitieron aumentar nuestros conocimientos.
Las pruebas no sólo son gratuitas, sino también rentables. Cuando
aparezcan nuevas versiones del paquete de terceros, ejecutamos las pruebas
de aprendizaje para comprobar si hay diferencias de comportamiento.
Las pruebas de aprendizaje demuestran que los paquetes de terceros que
usamos funcionan de la forma esperada. Una vez integrados, no hay garantía
de que el código de terceros sea compatible con nuestras necesidades. Los
autores originales se verán presionados para cambiar el código y ajustarlo a
sus propias necesidades. Corregirán errores y añadirán nuevas funciones. En
cada versión surgirán nuevos riesgos. Si el paquete de terceros cambia de una
forma incompatible con nuestras pruebas, lo sabremos al instante.
Independientemente de que necesite los conocimientos proporcionados
por las pruebas de aprendizaje, un límite claro debe estar respaldado por un
conjunto de pruebas que ejerciten la interfaz de la misma forma que hace el
-- 165 of 644 --

código de producción. Sin estas pruebas de límites para facilitar la transición,
podríamos conservar la versión antigua más tiempo del necesario.
Usar código que todavía no existe
Existe otro tipo de límite, que separa lo conocido de lo desconocido. En
ocasiones, nuestro conocimiento del código parece desvanecerse. Lo que hay
al otro lado del límite es desconocido (al menos por el momento). En
ocasiones, decidimos no mirar más allá del límite.
Hace años formé parte de un equipo de desarrollo de software para un
sistema de comunicación por radio. Había un subsistema, el Transmisor, que
apenas conocíamos y cuya interfaz todavía no se había diseñado. Como no
queríamos quedarnos parados, comenzamos a trabajar alejándonos de la parte
desconocida del código.
Sabíamos perfectamente dónde acababa nuestro mundo y comenzaba el
nuevo. Mientras avanzábamos, en ocasiones nos topábamos con este límite.
Aunque la ignorancia ocultaba nuestra visión más allá del límite, sabíamos
cómo queríamos que fuera la interfaz. Queríamos decirle al transmisor algo
como lo siguiente:
Ajustar el transmisor en la frecuencia proporcionada y emitir una
representación analógica de los datos que provienen de este flujo.
No sabíamos cómo hacerlo ya que todavía no se había diseñado la API.
Por ello decidimos determinar después los detalles.
Para no quedarnos bloqueados, definimos nuestra propia interfaz. Le
dimos un nombre sencillo, Transmitter. Le asignamos el método transmit
que aceptaba una frecuencia y un flujo de datos. Es la interfaz que
deseábamos haber tenido.
Lo mejor de escribir la interfaz que deseábamos haber tenido era que la
controlábamos. Esto hace que el código cliente sea más legible y se ciña a los
objetivos previstos.
En la figura 8.1 se aprecia que aislamos las clases
-- 166 of 644 --

---

## [Sección 51] sección 6.8. Codificación de transferencia de contenidos Base64

CommunicationsController de la API del transmisor (que no controlábamos
y estaba por definir). Al usar nuestra propia interfaz específica de la
aplicación, el código de CommunicationsController era limpio y expresivo.
Una vez definida la API del transmisor, creamos TransmitterAdapter para
reducir las distancias. El adaptador[35] encapsulaba la interacción con la API
y ofrecía un único punto en el que evolucionaba.
Figura 8.1. Predicción del transmisor
Este diseño también nos ofrece un sello[36] en el código para realizar
pruebas. Con un elemento FakeTransmitter, podemos probar las clases
CommunicationsController. También podemos crear pruebas de límite una
vez diseñada la API Transmitter para asegurarnos de que la utilizamos
correctamente.
Límites limpios
En los límites suceden cosas interesantes. Los cambios es una de ellas. Los
diseños de código correctos acomodan los cambios sin necesidad de grandes
modificaciones. Cuando usamos código que no controlamos, hay que prestar
especial atención a proteger nuestra inversión y asegurarnos de que los
cambios futuros no son demasiado costosos. El código en los límites requiere
una separación evidente y pruebas que definan expectativas. Debemos evitar
que el código conozca los detalles de terceros. Es más aconsejable depender
de algo que controlemos que de algo que no controlemos, y menos todavía si
nos controla. Los límites de terceros se gestionan gracias a la presencia de
-- 167 of 644 --

puntos mínimos en el código que hagan referencia a los mismos. Podemos
envolverlos como hicimos con Map o usar un adaptador para convertir nuestra
interfaz perfecta en la interfaz proporcionada. En cualquier caso, el código se
lee mejor, promueve el uso coherente e interno en el límite y hay menos
puntos de mantenimiento cuando cambie el código de terceros.
Bibliografía
[BeckTDD]: Test Driven Development, Kent Beck, Addison-Wesley,
2003.
[GOF]: Design Patterns: Elements of Reusable Object Oriented
Software, Gamma et al., Addison Wesley, 19%.
[WELC]: Working Effectively with Legacy Code, Addison-Wesley,
2004.
-- 168 of 644 --
Pruebas de unidad
Nuestra profesión ha evolucionado mucho en los últimos 10 años. En 1997
nadie había oído hablar del Desarrollo guiado por pruebas (DGP). Para la
mayoría, las pruebas de unidad eran pequeños fragmentos de código
-- 169 of 644 --

desechable que creábamos para asegurarnos de que nuestros programas
funcionaban. Escribíamos clases y métodos, y después código ad hoc para
probarlos, lo que implicaba algún tipo de programa controlador que nos
permitiera interactuar manualmente con el programa que habíamos escrito.
Recuerdo crear un programa de C++ para un sistema incrustado de
tiempo real a mediados de la década de 1990. El programa era un sencillo
temporizador con la siguiente firma:
void Timer::ScheduleCommand(Command* theCommand, int milliseconds)
La idea era sencilla; el método execute de Command se ejecutaba en un
nuevo subproceso tras el número especificado de milisegundos. El problema
era cómo probarlo. Confeccioné un sencillo programa controlador que
escuchaba al teclado. Cada vez que se introducía un carácter, se programaba
un comando que escribía el mismo carácter cinco segundos después.
Introduje una rítmica melodía en el teclado y esperé a que se reprodujera en
pantalla cinco segundos después:
«I… want-a-girl… just… like-the-girl-who-marr… ied… dear… old…
dad.»
Incluso tarareé la melodía mientras pulsaba la tecla, y la volví a cantar
cuando aparecieron los puntos en la pantalla.
Ésa fue mi prueba. Cuando vi que funcionaba y se lo mostré a mis
compañeros, me deshice del código de prueba.
Como he afirmado, nuestra profesión ha evolucionado mucho. Ahora
crearía una prueba que garantizara el funcionamiento de hasta el más mínimo
detalle del código. Aislaría el código del sistema operativo en lugar de
invocar las funciones estándar de temporización. Las imitaría para tener
control total sobre el tiempo. Programaría comandos que definieran
indicadores Booleanos y avanzaría el tiempo, para observar los indicadores y
asegurarme de que pasaran de false a true al cambiar el tiempo al valor
correcto. Cuando superara una serie de pruebas, comprobaría que fueran
adecuadas para todo el que tuviera que trabajar con el código. Me aseguraría
de comprobar las pruebas y el código en el mismo paquete. Sí, hemos
-- 170 of 644 --

---

## [Sección 52] sección 6.8. Codificación de transferencia de contenidos Base64

avanzado mucho, pero nos queda mucho por avanzar. Los movimientos Agile
y TDD han animado a muchos programadores a crear pruebas de unidad
automatizadas y cada vez son más. Pero en esta alocada carrera por añadir
pruebas a nuestra disciplina, muchos programadores han pasado por alto dos
de los aspectos más sutiles e importantes de diseñar pruebas de calidad.
Las tres leyes del DGP
Todos sabemos que el DGP nos pide que primero creemos las pruebas de
unidad, antes que el código de producción. Pero esa norma es sólo la punta
del iceberg. Tenga en cuenta las tres siguientes leyes[37]:
Primera ley: No debe crear código de producción hasta que haya creado
una prueba de unidad que falle.
Segunda ley: No debe crear más de una prueba de unidad que baste
como fallida, y no compilar se considera un fallo.
Tercera ley: No debe crear más código de producción que el necesario
para superar la prueba de fallo actual.
Estas tres leyes generan un ciclo de unos 30 segundos de duración. Las
pruebas y el código de producción se crean de forma conjunta, las pruebas
unos segundos antes que el código. Si trabajamos de esta forma, crearemos
decenas de pruebas al día, cientos al mes y miles al año. Si trabajamos de esta
forma, las pruebas abarcarán todos los aspectos de nuestro código de
producción. El tamaño de dichas pruebas, que puede ser similar al del código
de producción, puede suponer un problema de administración.
Realizar pruebas limpias
Hace unos años me pidieron que dirigiera un equipo que había decidido
explícitamente que su código de prueba no debía mantenerse con los mismos
estándares de calidad que su código de producción. Podían incumplir las
-- 171 of 644 --

reglas en sus pruebas de unidad. La premisa era «Rápido y directo». No era
necesario que las variables tuvieran nombres adecuados, ni que las funciones
de prueba fueran breves y descriptivas. No era necesario que el código de
prueba estuviera bien diseñado. Bastaba con que funcionara y abarcara el
código de producción.
Puede que algunos lectores empaticen con esta decisión. Puede que en el
pasado creara el tipo de pruebas que cree para la clase Timer. Supone un gran
paso crear ese tipo de pruebas desechables a diseñar una suite de pruebas de
unidad automatizadas. Por ello, como el equipo que dirigía, puede decidir que
pruebas incorrectas sea mejor que no tener pruebas.
Pero el equipo no se daba cuenta que tener pruebas incorrectas era igual o
peor que no tener prueba alguna. El problema es que las pruebas deben
cambiar de acuerdo a la evolución del código. Cuanto menos limpias sean,
más difícil es cambiarlas. Cuando más enrevesado sea el código de prueba,
más probabilidades de que dedique más tiempo a añadir nuevas pruebas a la
suite que el empleado en crear el nuevo código de producción. Al modificar
el código de producción, las pruebas antiguas comienzan a fallar y el desastre
impide que las pruebas se superen, por lo que acaban por convertirse en un
obstáculo interminable.
Entre versiones, aumentó el coste de mantener la suite de pruebas de mi
equipo. Acabó por convertirse en la principal queja entre los desarrolladores.
Cuando los directores preguntaron sobre este aumento, los desarrolladores
culparon a las pruebas. Al final, se vieron obligados a descartar la suite de
pruebas completa.
Pero sin una suite de pruebas perdieron la posibilidad de garantizar el
funcionamiento esperado de los cambios en el código. Sin una suite de
pruebas no podían asegurar que los cambios en una parte del sistema no
afectaran a otras diferentes. Los defectos aumentaron, lo que propició que
temieran realizar cambios. Dejaron de limpiar su código de producción por
miedo a que los cambios fueran dañinos. El código de producción comenzó a
corromperse. Al final, se quedaron sin pruebas, con un código de producción
enmarañado y defectuoso, clientes frustrados y la sensación de que su
esfuerzo les había fallado.
En cierto modo tenían razón. Su esfuerzo les había fallado. Pero fue su
-- 172 of 644 --

decisión de permitir que las pruebas fueran incorrectas lo que provocó el
fallo. Si hubieran empleado pruebas limpias, su esfuerzo no habría fallado.
Puedo afirmarlo con cierta seguridad porque he participado y dirigido
muchos equipos que han tenido éxito gracias a pruebas de unidad limpias.
La moraleja de la historia es sencilla: el código de prueba es tan
importante como el de producción. No es un ciudadano de segunda. Requiere
concentración, diseño y cuidado. Debe ser tan limpio como el código de
producción.
Las pruebas propician posibilidades
Si sus pruebas no son limpias, las perderá. Y sin ellas pierde lo mismo que
hace que su código de producción sea flexible. Sí, ha leído bien. Las pruebas
de unidad son las que hacen que el código sea flexible y se pueda mantener y
reutilizar. La razón es sencilla. Si tiene pruebas, no tendrá miedo a realizar
cambios en el código. Sin pruebas, cada cambio es un posible error.
Independientemente de la flexibilidad de su arquitectura, de la división del
diseño, sin pruebas tendrá miedo a realizar cambios por la posibilidad de
añadir errores no detectados.
Pero con las pruebas ese miedo desaparece. Cuanto mayor sea el alcance
de sus pruebas, menos miedo tendrá. Podrá modificar el código con total
impunidad, aunque su arquitectura no sea la mejor y el diseño sea mediocre.
Podrá mejorar la arquitectura y el diseño sin miedo alguno.
Por tanto, disponer de una suite automatizada de pruebas de unidad que
cubran el código de producción es la clave para mantener limpio el diseño y
la arquitectura. Las pruebas proporcionan las posibilidades, ya que permiten
el cambio.
Si sus pruebas no son limpias, la capacidad de modificar el código se verá
limitada y perderá la posibilidad de mejorar la estructura de dicho código.
Cuanto menos limpias sean las pruebas, menos lo será el código. En última
instancia perderá las pruebas y el código se corromperá.
Pruebas limpias
-- 173 of 644 --

---

## [Sección 53] sección 6.8. Codificación de transferencia de contenidos Base64

¿Qué hace que una prueba sea limpia? Tres elementos: legibilidad,
legibilidad y legibilidad. La legibilidad es sin duda más importante en las
pruebas de unidad que en el código de producción. ¿Qué hace que una prueba
sea legible? Lo mismo que en el código: claridad, simplicidad y densidad de
expresión. En una prueba debe decir mucho con el menor número de
expresiones posible.
Fíjese en el código de FitNesse del Listado 9-1. Estas tres pruebas son
difíciles de entender y sin duda se pueden mejorar. Por un lado, hay mucho
código duplicado [G5] en las invocaciones repetidas a addPage y
assertSubString. Sobre todo, este código se carga con detalles que
interfieren con la expresividad de la prueba.
Listado 9-1
SerializedPageResponderTest.java.
public void testGetPageHieratchyAsXml() throws Exception
{
crawler.addPage(root, PathParser.parse(“PageOne”));
crawler.addPage(root, PathParser.parse(“PageOne.ChildOne”));
crawler.addPage(root, PathParser.parse(“PageTwo”));
request.setResource(“root”);
request.addInput(“type”, “pages”);
Responder responder = new SerializedPageResponder();
SimpleResponse response =
(SimpleResponse) responder.makeResponse(
new FitNesseContext(root), request);
String xml = response.getContent();
assertEquals(“text/xml”, response.getContentType());
assertSubString(“<name>PageOne</name>”, xml);
assertSubString(“<name>PageTwo</name>”, xml);
assertSubString(“<name>ChildOne</name>”, xml);
}
public void testGetPageHieratchyAsXmlDoesntContainSymbolicLinks()
throws Exception
{
WikiPage pageOne = crawler.addPage(root, PathParser.parse(“PageOne”));
crawler.addPage(root, PathParser.parse(“PageOne.ChildOne”));
crawler.addPage(root, PathParser.parse(“PageTwo”));
PageData data = pageOne.getData();
WikiPageProperties properties = data.getProperties();
-- 174 of 644 --

WikiPageProperty symLinks = properties.set(SymbolicPage.PROPERTY_NAME);
symLinks.set(“SymPage”, “PageTwo”);
pageOne.commit(data);
request.setResource(“root”);
request.addInput(“type”, “pages”);
Responder responder = new SerializedPageResponder();
SimpleResponse response =
(SimpleResponse) responder.makeResponse(
new FitNesseContext(root), request);
String xml = response.getContent();
assertEquals(“text/xml”, response.getContentType());
assertSubString(“<name>PageOne</name>”, xml);
assertSubString(“<name>PageTwo</name>”, xml);
assertSubString(“<name>ChildOne</name>”, xml);
assertNotSubString(“SymPage”, xml);
}
public void testGetDataAsHtml() throws Exception
{
crawler.addPage(root, PathParser.parse(“TestPageOne”), “test page”);
request.setResource(“TestPageOne”);
request.addInput(“type”, “data”);
Responder responder = new SerializedPageResponder();
SimpleResponse response =
(SimpleResponse) responder.makeResponse(
new FitNesseContext(root), request);
String xml = response.getContent();
assertEquals(“text/xml”, response.getContentType());
assertSubString(“test page”, xml);
assertSubString(“<Test”, xml);
}
Fíjese en las invocaciones de PathParser. Transforman cadenas en
instancias de PagePath usadas por las arañas. Esta transformación es
totalmente irrelevante para la prueba y únicamente complica su cometido.
Los detalles circundantes a la creación del respondedor y la obtención y
conversión de la respuesta también sobran. También la forma de crear la
URL de solicitud a partir de un recurso y un argumento (contribuí a crear este
código, por lo que tengo todo el derecho a criticarlo).
Al final, el código no se ha diseñado de forma legible. El lector se ve
rodeado de miles de detalles que debe comprender antes de que las pruebas
tengan sentido.
Fíjese ahora en las pruebas mejoradas del Listado 9-2. Hacen
exactamente lo mismo, pero se han refactorizado de forma más clara y
-- 175 of 644 --

descriptiva.
Listado 9-2
SerializedPageResponderTest.java (refactorizado)
public void testGetPageHierarchyAsXml() throws Exception {
makePages(“PageOne”, “PageOne.ChildOne”, “PageTwo”);
submitRequest(“root”, “type:pages”);
assertResponseIsXML();
assertResponseContains(
“<name>PageOne</name>”, “<name>PageTwo</name>”, “<name>ChildOne</name>”
);
}
public void testSymbolicLinksAreNotInXmlPageHierarchy() throws Exception {
WikiPage page = makePage(“PageOne”);
makePages(“PageOne.ChildOne”, “PageTwo”);
addLinkTo(page, “PageTwo”, “SymPage”);
submitRequest(“root”, “type:pages”);
assertResponseIsXML();
assertResponseContains(
“<name>PageOne</name>”, “<name>PageTwo</name>”, “<name>ChildOne</name>”
);
assertResponseDoesNotContain(“SymPage”);
}
public void testGetDataAsXml() throws Exception {
makePageWithContent(“TestPageOne”, “test page”);
submitRequest(“TestPageOne”, “type:data”);
assertResponseIsXML();
assertResponseContains(“test page”, “<Test”);
}
El patrón Generar-Operar-Comprobar[38] es evidente en la estructura de
las pruebas. Cada una se divide claramente en tres partes. La primera crea los
datos de prueba, la segunda opera en dichos datos y la tercera comprueba que
la operación devuelva los resultados esperados.
Comprobará que se ha eliminado gran parte de los detalles molestos. Las
pruebas son concisas y sólo usan los tipos de datos y funciones que realmente
necesitan. Todo el que lea estas pruebas sabrá rápidamente para qué sirven y
no se perderá entre detalles irrelevantes.
-- 176 of 644 --

---

## [Sección 54] sección 6.8. Codificación de transferencia de contenidos Base64

Lenguaje de pruebas específico del dominio
Las pruebas del Listado 9-2 ilustran la creación de un lenguaje específico del
dominio para sus pruebas. En lugar de usar las API que los programadores
emplean para manipular el sistema, creamos una serie de funciones y
utilidades que usan dichas API y que facilitan la escritura y la lectura de las
pruebas. Estas funciones y utilidades se convierten en una API especializada
usada por las pruebas. Son un lenguaje de pruebas que los programadores
usan personalmente para crear sus pruebas y para ayudar a los que después
las lean.
Esta API de pruebas no se diseña con antelación, sino que evoluciona con
la refactorización continuada del código de prueba. Al igual que
refactorizamos el Listado 9-1 en el Listado 9-2, los programadores
disciplinados refactorizan su código de prueba en versiones más sucintas y
expresivas.
Un estándar dual
En un sentido, el equipo que mencionamos antes tenía razón. El código de la
API de pruebas tiene un conjunto de estándares de ingeniería diferentes al
código de producción. También tiene que ser sencillo, sucinto y expresivo,
pero no tan eficaz como el código de producción. Después de todo, se ejecuta
en un entorno de prueba, no de producción, y cada entorno tiene sus propias
necesidades.
Fíjese en la prueba del Listado 9-3. La creé como parte de un prototipo de
sistema de control medioambiental. Sin entrar en detalles, se aprecia que esta
prueba comprueba que la alarma de baja temperatura, el calentador y el fuelle
estén activados cuando la temperatura sea demasiado fría.
Listado 9-3
EnvironmentControllerTest.java
@Test
public void turnOnLoTempAlarmAtThreashold() throws Exception {
hw.setTemp(WAY_TOO_COLD);
-- 177 of 644 --

controller.tic();
assertTrue(hw.heaterState());
assertTrue(hw.blowerState());
assertFalse(hw.coolerState());
assertFalse(hw.hiTempAlarm());
assertTrue(hw.loTempAlarm());
}
Aquí hay muchos detalles. Por ejemplo, ¿para qué sirve la función tic?
De hecho, la ignoraría mientras leemos esta prueba. Intente centrarse en saber
si está de acuerdo en que el estado final del sistema tiene que ver con que la
temperatura sea demasiado baja.
Al leer la prueba, la vista tiene que cambiar entre el nombre del estado
comprobado y el sentido del estado comprobado. Vemos heaterState y
después la vista salta a assertTrue. Vemos coolerState y nos fijamos en
assertFalse. Resulta tedioso y dificulta la lectura de la prueba.
He conseguido mejorar la legibilidad de la prueba transformándola en el
Listado 9-4.
Listado 9-4
EnvironmentControllerTest.java (refactorizado)
@Test
public void turnOnLoTempAlarmAtThreshold() throws Exception {
wayTooCold();
assertEquals(“HBchL”, hw.getState());
}
Evidentemente, he ocultado el detalle de la función tic creando una
función wayTooCold. Pero lo importante es la extraña cadena de
assertEquals. Las mayúsculas significan activado y las minúsculas
desactivado, y las letras siempre aparece en este orden: {heater, blower,
cooler, hi-temp-alarm, lo-temp-alarm}.
Aunque prácticamente sea un incumplimiento de las reglas de asignación
mental[39], en este caso parece apropiado. Una vez que conocemos el
significado, la vista pasa por la cadena y podemos interpretar los resultados.
La lectura de la prueba es casi un placer. Fíjese en el Listado 9-5 y
compruebe con qué facilidad entiende las pruebas.
-- 178 of 644 --

Listado 9-5
EnvironmentControllerTest.java (una selección mayor).
@Test
public void turnOnCoolerAndBlowerIfTooHot() throws Exception {
tooHot();
assertEquals(“hBChl”, hw.getState());
}
@Test
public void turnOnHeaterAndBlowerIfTooCold() throws Exception {
tooCold();
assertEquals(“HBchl”, hw.getState());
}
@Test
public void turnOnHiTempAlarmAtThreshold() throws Exception {
wayTooHot();
assertEquals(“hBCHL”, hw.getState());
}
@Test
public void turnOnLoTempAlarmAtThreshold() throws Exception {
wayTooCold();
assertEquals(“HBchL”, hw.getState());
}
La función getState se reproduce en el Listado 9-6. No es un código
muy eficaz. Para que lo sea, deberíamos haber usado StringBuffer.
Listado 9-6
MockControlHardware.java.
public String getState() {
String state = “”;
state += heater ? “H” : “h”;
state += blower ? “B” : “b”;
state += cooler ? “C” : “c”;
state += hiTempAlarm ? “H” : “h”;
state += loTempAlarm ? “L” : “l”;
return state;
}
StringBuffer es poco atractivo. Incluso en código de producción, intento
evitarlo si el coste es mínimo, como podría suceder en el Listado 9-6. Pero
esta aplicación es claramente un sistema incrustado en tiempo real y es
probable que los recursos del equipo y la memoria estén limitados. Sin
-- 179 of 644 --

---

## [Sección 55] sección 6.8. Codificación de transferencia de contenidos Base64

embargo, el entorno de pruebas es improbable que lo esté. Es la naturaleza
del estándar dual. Hay cosas que nunca haría en un entorno de producción
totalmente válidas para un entorno de prueba. Suelen ser problemas de
memoria o eficacia de la CPU, pero nunca problemas de limpieza.
Una afirmación por prueba
Existe una escuela de pensamiento[40] que afirma que todas las funciones de
prueba de una prueba JUnit sólo deben tener una instrucción de afirmación.
Puede parecer una regla draconiana pero la ventaja se aprecia en el Listado 95. Las pruebas llegan a una misma conclusión, que se entiende de forma
rápida y sencilla.
¿Pero qué sucede con el Listado 9-2? No parece razonable afirmar que el
resultado es XML y que contiene determinadas subcadenas. Sin embargo,
podemos dividir la prueba en dos, cada una con una afirmación concreta,
como se muestra en el Listado 9-7.
Listado 9-7
SerializedPageResponderTest.java (una sola afirmación).
public void testGetPageHierarchyAsXml() throws Exception {
givenPages(“PageOne”, “PageOne.ChildOne”, “PageTwo”);
whenRequestIsIssued(“root”, “type:pages”);
thenResponseShouldBeXML();
}
public void testGetPageHierarchyHasRightTags() throws Exception {
givenPages(“PageOne”, “PageOne.ChildOne”, “PageTwo”);
whenRequestIsIssued(“root”, “type:pages”);
thenResponseShouldContain(
“<name>PageOne</name>”, “<name>PageTwo</name>”, “<name>ChildOne</name>”
);
}
He cambiado los nombres de las funciones para usar la convención dadocuando-entonces[41]. De este modo las pruebas son más fáciles de leer.
Desafortunadamente, al dividir las pruebas se genera código duplicado.
-- 180 of 644 --

Podemos eliminar los duplicados por medio del patrón Método de
plantilla[42] e incluir las partes dado/cuando en la clase base, y las partes
entonces en derivaciones diferentes. O podríamos crear una clase de prueba
independiente e incluir las partes dado y cuando en la función @Before y las
partes entonces en cada función @Test. Pero parece un mecanismo excesivo
para un problema tan menor. Al final, opto por las afirmaciones múltiples del
Listado 9-2. Considero que la regla de una sola afirmación es una directriz
adecuada[43]. Siempre intento crear un lenguaje de pruebas específico del
dominio que la complemente, como en el Listado 9-5, pero no rechazo incluir
más de una afirmación en una prueba. Creo que lo mejor que podemos decir
es que el número de afirmaciones de una prueba debe ser mínimo.
Un solo concepto por prueba
Puede que una regla más indicada sea probar un único concepto en cada
función de prueba. No queremos extensas funciones que prueben una cosa
diferente tras otra, como sucede en el Listado 9-8. Esta prueba debería
dividirse en tres diferentes que probaran tres cosas distintas. Al combinarlas
en la misma función se obliga al lector a determinar por qué cada sección se
ubica en ese punto y qué prueba dicha sección.
Listado 9-8
/**
* Varias pruebas para el método addMonths().
*/
public void testAddMonths() {
SerialDate d1 = SerialDate.createInstance(31, 5, 2004);
SerialDate d2 = SerialDate.addMonths(1, d1);
assertEquals(30, d2.getDayOfMonth());
assertEquals(6, d2.getMonth());
assertEquals(2004, d2.getYYYY());
SerialDate d3 = SerialDate.addMonths(2, d1);
assertEquals(31, d3.getDayOfMonth());
assertEquals(7, d3.getMonth());
assertEquals(2004, d3.getYYYY());
-- 181 of 644 --

SerialDate d4 = SerialDate.addMonths(1, SerialDate.addMonths(1, d1));
assertEquals(30, d4.getDayOfMonth());
assertEquals(7, d4.getMonth());
assertEquals(2004, d4.getYYYY());
}
Las tres funciones deberían ser las siguientes:
Dado el último día de un mes con 31 días (como mayo):
1. Cuando se añade un mes, si el último día de ese mes es el 30 (como
en junio), entonces la fecha debe ser el día 30 de ese mes, no el 31.
2. Cuando se añaden dos meses a esa fecha, si el último mes tiene 31
días, entonces la fecha debe ser el día 31.
Dado el último día de un mes con 30 días (como junio):
1. Cuando se añade, si el último día de ese mes tiene 31 días, entonces
la fecha debe ser el 30, no el 31.
Expresado de esta forma, se aprecia que existe una regla general entre las
distintas pruebas. Al incrementar el mes, la fecha no puede ser mayor que su
último día. Esto implica que al incrementar el mes en el 28 de febrero debe
generarse el 28 de marzo. Falta esa prueba y convendría que la escribiéramos.
Así pues, no son las múltiples afirmaciones del Listado 9-8 las causantes
del problema, sino el hecho de que se prueba más de un concepto.
Probablemente la regla óptima sea minimizar el número de activos por
concepto y probar un solo concepto por función de prueba.
F.I.R.S.T.[44]
Las pruebas limpias siguen otras cinco reglas, cuyas iniciales forman las
siglas FIRST en inglés:
Rapidez (Fast): Las reglas deben ser rápidas y ejecutarse de forma
rápida. Si lo hacen lentamente, no las ejecutará con frecuencia. Al no hacerlo,
no detectará los problemas con la suficiente antelación como para
solucionarlos. No se sentirá con libertad para limpiar el código, que acabará
corrompiéndose.
-- 182 of 644 --

---

## [Sección 56] sección 6.8. Codificación de transferencia de contenidos Base64

Independencia (Independent): Las pruebas no deben depender entre
ellas. Una prueba no debe establecer condiciones para la siguiente. Debe
poder ejecutar cada prueba de forma independiente y en el orden que desee.
Si las pruebas dependen unas de otras, la primera que falle provocará una
sucesión de fallos, dificultará el diagnóstico y ocultará efectos posteriores.
Repetición (Repeatable): Las pruebas deben poder repetirse en cualquier
entorno. Debe poder ejecutarlas en el entorno de producción, en el de calidad
y en su portátil de camino a casa en un tren sin red. Si no puede repetir las
pruebas en cualquier entorno, siempre tendrá una excusa de su fallo. También
verá que no puede ejecutar las pruebas si el entorno no está disponible.
Validación automática (Self-Validating): Las pruebas deben tener un
resultado booleano: o aciertan o fallan. No debe tener que leer un extenso
archivo de registro para saber si una prueba ha acertado, ni comparar
manualmente dos archivos de texto distintos para ello. Si las pruebas no se
validan automáticamente, el fallo puede ser subjetivo y la ejecución de las
pruebas puede requerir una extensa evaluación manual.
Puntualidad (Timely): Las pruebas deben crearse en el momento preciso:
antes del código de producción que hace que acierten. Si crea las pruebas
después del código de producción, puede que resulte difícil probarlo. Puede
decidir qué parte del código de producción sea demasiado difícil de probar.
No diseñe código de producción que no se pueda probar.
Conclusión
Apenas hemos abordado la superficie de este tema. De hecho, se podría crear
un libro entero sobre pruebas limpias. Las pruebas son tan importantes para la
salud de un proyecto como el código de producción. Puede que incluso más,
ya que conservan y mejoran la flexibilidad, capacidad de mantenimiento y
reutilización del código de producción. Por ello, intente que sean limpias.
Trabaje para que resulten expresivas y concisas. Invente API de prueba que
actúen como lenguaje específico del dominio que le ayude a crear las
pruebas.
Si deja que las pruebas se corrompan, sucederá lo mismo con el código de
-- 183 of 644 --

producción. Mantenga limpias las pruebas.
Bibliografía
[RSpec]: RSpec: Behavior Driven Development for Ruby Programmers,
Aslak Hellesay, David Chelimsky, Pragmatic Bookshelf, 2008.
[GOF]: Design Patterns: Elements of Reusable Object Oriented
Software, Gamma et al., Addison-Wesley, 1996.
-- 184 of 644 --
Clases
con Jeff Langr
Hasta ahora nos hemos centrado en escribir bien líneas y bloques de código.
Nos hemos adentrado en la correcta composición de las funciones y en su
interrelación. Pero a pesar de la atención dedicada a la expresividad de las
instrucciones y las funciones, no tendremos código limpio hasta que nos
fijemos en los niveles superiores de su organización. Hablemos sobre clases.
-- 185 of 644 --

Organización de clases
De acuerdo a la convención estándar de Java, una clase debe comenzar con
una lista de variables. Las constantes estáticas públicas, si existen, deben
aparecer primero. Tras ello, las variables estáticas privadas y después las
variables de instancia privadas. No suele ser necesario usar variables
públicas.
Las funciones públicas deben seguir a la lista de variables. Incluimos las
utilidades públicas invocadas por una función pública tras la propia función
pública. Este sistema cumple la regla descendente y permite que el programa
se lea como un artículo de periódico.
Encapsulación
Queremos que nuestras variables y funciones de utilidad sean privadas, pero
no es imprescindible. En ocasiones podemos proteger una variable o función
de utilidad para que sea accesible para una prueba. Las reglas mandan. Si una
regla del mismo paquete tiene que invocar una función o acceder a una
variable, hacemos que tenga ámbito protected o de paquete. Sin embargo,
primero veremos una forma de mantener la privacidad. La relajación de la
encapsulación siempre es un último resorte.
Las clases deben ser de tamaño reducido
La primera regla de las clases es que deben ser de tamaño reducido. La
segunda regla es que deben ser todavía más reducidas. No, no vamos a repetir
el mismo texto en el capítulo sobre las funciones, pero como sucede con las
funciones, el tamaño reducido es lo principal a la hora de diseñar una clase. Y
la pregunta inmediata es qué nivel de reducción. Con las funciones medimos
el tamaño contando líneas físicas. Con las clases usamos otra medida distinta:
las responsabilidades[45].
El Listado 10-1 muestra una clase, SuperDashboard, que muestra 70
-- 186 of 644 --

---

## [Sección 57] sección 6.8. Codificación de transferencia de contenidos Base64

métodos públicos. Muchos programadores estarán de acuerdo en que es un
tamaño excesivo. Algunos denominarían a SuperDashboard una clase Dios.
Listado 10-1
Demasiadas responsabilidades.
public class SuperDashboard extends JFrame implements MetaDataUser
public String getCustomizerLanguagePath()
public void setSystemConfigPath(String systemConfigPath)
public String getSystemConfigDocument()
public void setSystemConfigDocument(String systemConfigDocument)
public boolean getGuruState()
public boolean getNoviceState()
public boolean getOpenSourceState()
public void showObject(MetaObject object)
public void showProgress(String s)
public boolean isMetadataDirty()
public void setIsMetadataDirty(boolean isMetadataDirty)
public Component getLastFocusedComponent()
public void setLastFocused(Component lastFocused)
public void setMouseSelectState(boolean isMouseSelected)
public boolean isMouseSelected()
public LanguageManager getLanguageManager()
public Project getProject()
public Project getFirstProject()
public Project getLastProject()
public String getNewProjectName()
public void setComponentSizes(Dimension dim)
public String getCurrentDir()
public void setCurrentDir(String newDir)
public void updateStatus(int dotPos, int markPos)
public Class[] getDataBaseClasses()
public MetadataFeeder getMetadataFeeder()
public void addProject(Project project)
public boolean setCurrentProject(Project project)
public boolean removeProject(Project project)
public MetaProjectHeader getProgramMetadata()
public void resetDashboard()
public Project loadProject(String fileName, String projectName)
public void setCanSaveMetadata(boolean canSave)
public MetaObject getSelectedObject()
public void deselectObjects()
public void setProject(Project project)
public void editorAction(String actionName, ActionEvent event)
public void setMode(int mode)
public FileManager getFileManager()
public void setFileManager(FileManager fileManager)
public ConfigManager getConfigManager()
public void setConfigManager(ConfigManager configManager)
public ClassLoader getClassLoader()
-- 187 of 644 --

public void setClassLoader(ClassLoader classLoader)
public Properties getProps()
public String getUserHome()
public String getBaseDir()
public int getMajorVersionNumber()
public int getMinorVersionNumber()
public int getBuildNumber()
public MetaObject pasting(
MetaObject target, MetaObject pasted, MetaProject project)
public void processMenuItems(MetaObject metaObject)
public void processMenuSeparators(MetaObject metaObject)
public void processTabPages(MetaObject metaObject)
public void processPlacement(MetaObject object)
public void processCreateLayout(MetaObject object)
public void updateDisplayLayer(MetaObject object, int layerIndex)
public void propertyEditedRepaint(MetaObject object)
public void processDeleteObject(MetaObject object)
public boolean getAttachedToDesigner()
public void processProjectChangedState(boolean hasProjectChanged)
public void processObjectNameChanged(MetaObject object)
public void runProject()
public void setAllowDragging(boolean allowDragging)
public boolean allowDragging()
public boolean isCustomizing()
public void setTitle(String title)
public IdeMenuBar getIdeMenuBar()
public void showHelper(MetaObject metaObject, String propertyName)
//… y otros muchos métodos no públicos…
}
¿Y si SuperDashboard sólo incluyera los métodos mostrados en el
Listado 10-2?
Listado 10-2
¿Suficientemente reducido?
public class SuperDashboard extends JFrame implements MetaDataUser
public Component getLastFocusedComponent()
public void setLastFocused(Component lastFocused)
public int getMajorVersionNumber()
public int getMinorVersionNumber()
public int getBuildNumber()
}
Cinco métodos no es demasiado, ¿verdad? En este caso sí ya que a pesar
del reducido número de métodos, SuperDashboard también tiene demasiadas
responsabilidades.
El nombre de una clase debe describir las responsabilidades que
-- 188 of 644 --

desempeña. De hecho, el nombre es la primera forma para determinar el
tamaño de una clase. Si no podemos derivar un nombre conciso para una
clase, seguramente sea demasiado extenso. Cuanto más ambiguo sea el
nombre de la clase, más probabilidades hay de que tenga demasiadas
responsabilidades. Por ejemplo, los nombres de clase con palabras como
Processor, Manager o Super suelen indicar una desafortunada acumulación
de responsabilidades.
También debemos ser capaces de escribir una breve descripción de la
clase en unas 25 palabras, sin usar las palabras «si», «o», «y» o «pero».
¿Cómo describiríamos SuperDashboard?: SuperDashboard permite acceder
al componente con el enfoque y nos permite controlar los números de versión
y producto. El primer y indica que SuperDashboard tiene demasiadas
responsabilidades.
El Principio de responsabilidad única
El Principio de responsabilidad única (Single Responsibility Principle, SRP)
[46] indica que una clase o módulo debe tener uno y sólo un motivo para
cambiar. Este principio nos indica la definición de responsabilidad y una
directriz para el tamaño de la clase. Las clases sólo deben tener una
responsabilidad, un motivo para cambiar. La clase SuperDashboard
aparentemente reducida del Listado 10-2 tiene dos motivos para cambiar.
Primero, controla información de versión que supuestamente debe
actualizarse cada vez que se comercialice el software. Por otra parte, gestiona
componentes de Java Swing (un derivado de JFrame, la representación Swing
de una ventana de IGU de nivel superior). Sin duda, querremos cambiar el
número de versión si cambiamos el código Swing, pero lo contrario no es
necesario: podríamos cambiar la información de versión en función de los
cambios de otro código del sistema. La identificación de responsabilidades
(los motivos del cambio) nos permite reconocer y mejorar las abstracciones
en nuestro código. Podemos extraer los tres métodos de SuperDashboard
relacionados con la información de versiones en una clase independiente
como Version (véase el Listado 10-3.) La clase Version es una construcción
-- 189 of 644 --

---

## [Sección 58] sección 6.8. Codificación de transferencia de contenidos Base64

que se puede reutilizar en otras aplicaciones.
Listado 10-3
Una clase con una única responsabilidad.
public class Version {
public int getMajorVersionNumber()
public int getMinorVersionNumber()
public int getBuildNumber()
}
SRP es uno de los conceptos más importantes del diseño orientado a
objetos y también uno de los más sencillos de entender y cumplir, pero
también es uno de los que más se abusa al diseñar clases. Habitualmente nos
encontramos clases que hacen demasiadas cosas. ¿Por qué?
Crear software que funcione y crear software limpio son dos actividades
diferentes. Muchos tenemos un cerebro limitado, de modo que nos centramos
en que el código funcione más que en su organización y limpieza. Es algo
totalmente válido. Mantener objetivos separados es tan importante en
nuestras actividades de programación como en nuestros programas.
El problema es que muchos creemos que hemos terminado cuando el
programa funciona. No cambiamos al otro objetivo de organización y
limpieza. Pasamos al siguiente problema en lugar de retroceder y dividir las
clases en unidades independientes con una única responsabilidad.
Al mismo tiempo, muchos programadores temen que un elevado número
de pequeñas clases con un único propósito dificulten la comprensión del
conjunto. Les preocupa que tengan que desplazarse entre las clases para
determinar cómo funciona un aspecto concreto.
Sin embargo, un sistema con muchas clases reducidas no tiene más
elementos móviles que un sistema con algunas clases enormes. En ambos hay
que entender lo mismo. La pregunta es si quiere organizar sus herramientas
en cajas con muchos pequeños cajones que contengan componentes bien
definidos y etiquetados, o usar varios cajones grandes en los que mezcle todo.
Todos los sistemas tienen una gran lógica y complejidad. El objetivo
principal para gestionar dicha complejidad es organizarla para que un
programador sepa dónde buscar y comprenda la complejidad directamente
afectada en cada momento concreto. Por el contrario, un sistema con clases
-- 190 of 644 --

multipropósito de mayor tamaño nos obliga a buscar entre numerosos
elementos que no siempre necesitamos conocer.
Para reformular los puntos anteriores, diremos que los sistemas deben
estar formados por muchas claves reducidas, no por algunas de gran tamaño.
Cada clase reducida encapsula una única responsabilidad, tiene un solo
motivo para cambiar y colabora con algunas otras para obtener los
comportamientos deseados del sistema.
Cohesión
Las clases deben tener un número reducido de variables de instancia. Los
métodos de una clase deben manipular una o varias de dichas variables. Por
lo general, cuantas más variables manipule un método, más cohesión tendrá
con su clase. Una clase en la que cada variable se usa en cada método tiene
una cohesión máxima.
Por lo general, no es recomendable ni posible crear este tipo de clases
pero queremos que la cohesión de nuestras clases sea elevada. Si lo logramos,
significa que los métodos y variables de la clase dependen unos de otros y
actúan como un todo lógico.
Fíjese en la implementación de Stack en el Listado 10-4. Es una clase
muy consistente. De los tres métodos, sólo size() no usa ambas variables.
Listado 10-4
Stack.java, una clase consistente.
public class Stack {
private int topOfStack = 0;
List<Integer> elements = new LinkedList<Integer>();
public int size() {
return topOfStack;
}
public void push(int element) {
topOfStack++;
elements.add(element);
}
public int pop() throws PoppedWhenEmpty {
-- 191 of 644 --

if (topOfStack == 0)
throw new PoppedWhenEmpty();
int element = elements.get(--topOfStack);
elements.remove(topOfStack);
return element;
}
}
La estrategia de reducir el tamaño de las funciones y de las listas de
parámetros suele provocar la proliferación de variables de instancia usadas
por un subconjunto de los métodos. Si esto sucede, siempre existe al menos
una clase que intenta huir de la clase de mayor tamaño. Debe intentar separar
las variables y métodos en dos o más clases para que las nuevas sean más
consistentes.
Mantener resultados consistentes en muchas clases de
tamaño reducido
La división de grandes funciones en otras más pequeñas aumenta la
proliferación de clases. Imagine una gran función con numerosas variables
declaradas. Imagine que desea extraer una pequeña parte de esa función en
otra independiente. Sin embargo, el código que extrae usa cuatro de las
variables declaradas en la función. ¿Debe pasar las cuatro variables como
argumentos a la nueva función?
En absoluto. Si ascendemos estas cuatro variables a variables de instancia
de la clase, podremos extraer el código sin pasar las variables. Resultaría más
sencillo dividir la función en pequeños fragmentos.
Desafortunadamente, eso significaría que nuestras clases perderían
cohesión ya que acumularían más y más variables de instancia que sólo
existen para que otras funciones las compartan. Pero un momento. Si apenas
existen funciones que compartan determinadas variables, ¿no son entonces
una clase con derecho propio? Por supuesto. Cuando las clases pierdan
cohesión, divídalas.
Por tanto, dividir una gran función en otras más reducidas también nos
permite dividir varias clases más reducidas. De este modo mejora la
organización del programa y su estructura resulta más transparente. Como
ejemplo, usaremos un ejemplo obtenido del libro de Knuth Literate
-- 192 of 644 --

---

## [Sección 59] sección 6.8. Codificación de transferencia de contenidos Base64

Programming[47]. El Listado 10-5 muestra una traducción a Java del
programa PrintPrimes de Knuth. Para hacerle justicia, no es el programa que
creó sino el resultado generado por su herramienta WEB. Lo usamos aquí por
ser un magnífico punto de partida para dividir una función de gran tamaño en
varias funciones y clases más reducidas.
Listado 10-5
PrintPrimes.java
package literatePrimes;
public class PrintPrimes {
public static void main(String[] args) {
final int M = 1000;
final int RR = 50;
final int CC = 4;
final int WW = 10;
final int ORDMAX = 30;
int P[] = new int[M + 1];
int PAGENUMBER;
int PAGEOFFSET;
int ROWOFFSET;
int C;
int J;
int K;
boolean JPRIME;
int ORD;
int SQUARE;
int N;
int MULT[] = new int[ORDMAX + 1];
J = 1;
K = 1;
P[1] = 2;
ORD = 2;
SQUARE = 9;
while (K < M) {
do {
J = J + 2;
if (J == SQUARE) {
ORD = ORD + 1;
SQUARE = P[ORD] * P[ORD];
MULT[ORD - 1] = J;
}
N = 2;
JPRIME = true;
while (N < ORD && JPRIME) {
while (MULT[N] < J)
-- 193 of 644 --

MULT[N] = MULT[N] + P[N] + P[N];
if (MULT[N] == J)
JPRIME = false;
N = N + 1;
}
} while (!JPRIME);
K = K + 1;
P[K] = J;
}
{
PAGENUMBER = 1;
PAGEOFFSET = 1;
while (PAGEOFFSET <= M) {
System.out.println(“The First ” + M +
“ Prime Numbers --- Page ” + PAGENUMBER);
System.out.println(“”);
for (ROWOFFSET = PAGEOFFSET; ROWOFFSET < PAGEOFFSET + RR;
ROWOFFSET++) {
for (C = 0; C < CC;C++)
if (ROWOFFSET + C * RR <= M)
System.out.format(“%10d”, P[ROWOFFSET + C * RR]);
System.out.println(“”);
}
System.out.println(“\f”);
PAGENUMBER = PAGENUMBER + 1;
PAGEOFFSET = PAGEOFFSET + RR * CC;
}
}
}
}
Este programa, escrito como una sola función, es un desastre. El sangrado
de su estructura es excesivo y hay demasiadas variables extrañas. Como
mínimo, la función debería dividirse en otras más pequeñas. Los listados del
10-6 al 10-8 muestran la división del código del Listado 10-5 en clases y
funciones de menor tamaño, además de los nombres elegidos para dichas
clases, funciones y variables.
Listado 10-6
PrimePrinter.java (refactorizado)
package literatePrimes;
public class PrimePrinter (
public static void main(String[] args) {
final int NUMBER_OF_PRIME5 = 1000;
int[] primes = PrimeGenerator.generate(NUMBER_OF_PRIMES);
final int ROWS_PER_PAGE = 50;
-- 194 of 644 --

final int COLUMNS_PER_PAGE = 4;
RowColumnPagePrinter tablePrinter =
new RowColumnPagePrinter(ROWS_PER_PAGE,
COLUMNS_PER_PAGE,
“The First ” + NUMBER_OF_PRIMES +
“ Prime Numbers”);
tablePrinter.print(primes);
}
}
Listado 10-7
RowColumnPagePrinter.java.
package literatePrimes;
import java.io.PrintStream;
public class RowColumnPagePrinter {
private int rowsPerPage;
private int columnsPerPage;
private int numbersPerPage;
private String pageHeader;
private PrintStream printStream;
public RowColumnPagePrinter(int rowsPerPage,
int columnsPerPage,
String pageHeader) {
this.rowsPerPage = rowsPerPage;
this.columnsPerPage = columnsPerPage;
this.pageHeader = pageHeader;
numbersPerPage = rowsPerPage * columnsPerPage;
printStream = System.out;
}
public void print(int data[]) {
int pageNumber = 1;
for (int firstIndexOnPage = 0;
firstIndexOnPage < data.length;
firstIndexOnPage += numbersPerPage) {
int lastIndexOnPage =
Math.min(firstIndexOnPage + numbersPerPage - 1,
data.length - 1);
printPageHeader(pageHeader, pageNumber);
printPage(firstIndexOnPage, lastIndexOnPage, data);
printStream.println(“\f”);
pageNumber++;
}
}
private void printPage (int firstIndexOnPage,
int lastIndexOnPage,
int[] data) {
-- 195 of 644 --

int firstIndexOfLastRowOnPage =
firstIndexOnPage + rowsPerPage - 1;
for (int firstIndexInRow = firstIndexOnPage;
firstIndexInRow <= firstIndexOfLastRowOnPage;
firstIndexInRow++) {
printRow(firstIndexInRow, lastIndexOnPage, data);
printStream.println(“”);
}
}
private void printRow(int firstIndexInRow,
int lastIndexOnPage,
int[] data) {
for (int column = 0; column < columnsPerPage; column++) {
int index = firstIndexInRow + column * rowsPerPage;
if (index <= lastIndexOnPage)
printStream.format(“%10d”, data[index]);
}
}
private void printPageHeader(String pageHeader,
int pageNumber) {
printStream.println(pageHeader + “ --- Page ” + pageNumber);
printStream.println(“”);
}
public void setOutput(PrintStream printStream) {
this.printStream = printStream;
}
}
Listado 10-8
PrimeGenerator.java
package literatePrimes;
import java.util.ArrayList;
public class PrimeGenerator {
private static int[] primes;
private static ArrayList<Integer> multiplesOfPrimeFactors;
protected static int[] generate(int n) {
primes = new int[n];
multiplesOfPrimeFactors = new ArrayList<Integer>();
set2AsFirstPrime();
checkOddNumbersForSubsequentPrimes();
return primes;
}
private static void set2AsFirtsPrime() {
primes[0] = 2;
multiplesOfPrimeFactors.add(2);
-- 196 of 644 --

---

## [Sección 60] sección 6.8. Codificación de transferencia de contenidos Base64

}
private static void checkOddNumbersForSubsequentPrimes() {
int primeIndex = 1;
for (int candidate = 3;
primeIndex < primes.length;
candidate += 2) {
if (isPrime(candidate))
primes[primeIndex++] = candidate;
}
}
private static boolean isPrime(int candidate) {
if (isLeastRelevantMultipleOfNextLargerPrimeFactor(candidate)) {
multiplesOfPrimeFactors.add(candidate);
return false;
}
return isNotMultipleOfAnyPreviousPrimeFactor(candidate);
}
private static boolean
isLeastRelevantMultipleOfNextLargerPrimeFactor(int candidate) {
int nextLargerPrimeFactor = primes[multiplesOfPrimeFactors.size()];
int leastRelevantMultiple = nextLargerPrimeFactor *
nextLargerPrimeFactor;
return candidate == leastRelevantMultiple;
}
private static boolean
isNotMultipleOfAnyPreviousPrimeFactor(int candidate) {
for (int n = 1; n < multiplesOfPrimeFactors.size(); n++) {
if (isMultipleOfNthPrimeFactor(candidate, n))
return false;
}
return true;
}
private static boolean
isMultipleOfNthPrimeFactor(int candidate, int n) {
return
candidate == smallestOddNthMultipleNotLessThanCandidate(candidate, n);
}
private static int
smallestOddNthMultipleNotLessThanCandidate(int candidate, int n) {
int multiple = multiplesOfPrimeFactors.get(n);
while (multiple < candidate)
multiple += 2 * primes[n];
multiplesOfPrimeFactors.set(n, multiple);
return multiple;
}
}
Lo primero que apreciará es que ha aumentado la longitud del programa,
-- 197 of 644 --

de una a casi tres páginas. Este aumento se debe a varios motivos. En primer
lugar, el programa refactorizado usa nombres de variable más extensos y
descriptivos. Por otra parte, usa declaraciones de funciones y clases como
comentarios del código. Por último, usamos espacios en blanco y técnicas de
formato para mantener la legibilidad.
El programa se ha dividido en tres responsabilidades principales. La parte
principal se incluye en la clase PrimePrinter, responsable de controlar el
entorno de ejecución. Cambia si se modifica el método de invocación. Por
ejemplo, si este programa se convierte en un servicio SOA, es la clase que se
verá afectada.
RowColumnPagePrinter sabe cómo aplicar formato a una lista de números
con una determinada cantidad de filas y columnas. Si es necesario cambiar el
formato del resultado, es la clase que se verá afectada.
La clase PrimeGenerator sabe cómo generar una lista de números
primos. No se creará una instancia como objeto. La clase es sólo un ámbito
útil en el que declarar y ocultar sus variables. Esta clase cambia si se
modifica el algoritmo para calcular números primos. No hemos reescrito el
programa. No hemos empezado de cero y los hemos vuelto a diseñar. En
realidad, si se fija atentamente en los dos programas, verá que usan los
mismos algoritmos y mecanismos.
El cambio se ha realizado creando una suite de pruebas que verifican el
comportamiento preciso del primer programa. Tras ello, se aplican
numerosos cambios mínimos, de uno en uno. Tras cada cambio, se ejecuta el
programa para garantizar que el comportamiento no varía. Paso a paso, el
primer programa se limpia y se transforma en el segundo.
Organizar los cambios
En muchos sistemas, el cambio es continuo. Cada cambio supone un riesgo
de que el resto del sistema no funcione de la forma esperada. En un sistema
limpio organizamos las clases para reducir los riesgos de los cambios.
La clase Sql del Listado 10-9 se usa para generar cadenas SQL de forma
correcta con los metadatos adecuados. Es un trabajo continuo y, como tal, no
-- 198 of 644 --

admite funciones SQL como instrucciones update. Cuando la clase Sql tenga
que admitir una instrucción update, tendremos que abrirla para realizar
modificaciones. El problema de abrir una clase es el riesgo que conlleva.
Cualquier modificación puede afectar a otro código de la clase. Debe
probarse concienzudamente.
Listado 10-9
Clase que debemos abrir para realizar cambios.
public class Sql {
public Sql(String table, Column[] columns)
public String create()
public String insert(Object[] fields)
public String selectAll()
public String findByKey(String keyColumn, String keyValue)
public String select(Column column, String pattern)
public String select(Criteria criteria)
public String preparedInsert()
private String columnList(Column[] columns)
private String valuesList(Object[] fields, final Column[] columns)
private String selectWithCriteria(String criteria)
private String placeholderList(Column[] columns)
}
La clase Sql debe cambiar al añadir un nuevo tipo de instrucción.
También debe cambiar cuando variemos los detalles de un tipo de instrucción
concreto; por ejemplo, si tenemos que modificar la funcionalidad select para
admitir selecciones secundarias. Estos dos motivos de cambio significan que
la clase Sql incumple SRP.
Podemos detectar este incumplimiento desde un punto de vista
organizativo. El método outline de Sql muestra que hay métodos privados,
como selectWithCriteria, que parecen relacionarse únicamente con
instrucciones select.
El comportamiento de métodos privados aplicados a un pequeño
subconjunto de una clase puede ser una heurística útil para detectar zonas que
mejorar. Sin embargo, la verdadera razón debe ser el cambio del sistema. Si
la clase Sql se considera totalmente lógica, no debemos preocuparnos por
separar las responsabilidades. Si no necesitamos funcionalidad de
actualización en el futuro, podemos olvidarnos de Sql. Pero si tenemos que
-- 199 of 644 --

---

## [Sección 61] sección 6.8. Codificación de transferencia de contenidos Base64

abrir una clase, debemos corregir el diseño.
¿Y si optamos por una solución como la del Listado 10-10? Los métodos
públicos de interfaz definidos en Sql en el Listado 10-9 se refactorizan en sus
propias variantes de la clase Sql. Los métodos privados, como valuesList,
se mueven directamente a las posiciones necesarias. El comportamiento
privado se reduce a un par de clases de utilidad: Where y ColumnList.
Listado 10-10
Un grupo de clases cerradas.
Abstract public class Sql {
public Sql(String table, Column[] columns)
abstract public String generate();
}
public class CreateSql extends Sql {
public CreateSql(String table, Column[] columns)
@Override public String generate()
}
public class SelectSql extends Sql {
public SelectSql(String table, Column[] columns)
@Override public String generate()
}
public class InsertSql extends Sql {
public SelectSql(String table, Column[] columns, Object[] fields)
@Override public String generate()
private String valuesList(Object[] fields, final Column[] columns)
}
public class SelectWithCriteriaSql extends Sql {
public SelectWithCriteriaSql(
String table, Column[] columns, Criteria criteria)
@Override public String generate()
}
public class SelectWithMatchSql extends Sql {
public SelectWithMatchSql(
String table, Column[] columns, Column column, String pattern)
@Override public String generate()
}
public class FindByKeySql extends Sql {
public FindByKeySql(
String table, Column[] columns, String keyColumn, String keyValue)
@Override public String generate()
}
-- 200 of 644 --

public class PreparedInsertSql extends Sql {
public PreparedInsertSql(String table, Column[] columns)
@Override public String generate()
private String placeholderList(Column[] columns)
}
public class Where {
public Where(String criteria)
public String generate()
}
public class ColumnList {
public ColumnList(Column[] columns)
public String generate()
}
El código de cada clase se simplifica enormemente. El tiempo necesario
para entender las clases se reduce al mínimo. El riesgo de que una función
afecte a otra desaparece casi por completo. Desde el punto de vista de las
pruebas, resulta más sencillo probar la lógica de esta solución, ya que las
clases se aíslan unas de otras.
Además, cuando llegue el momento de añadir las instrucciones update,
no cambia ninguna de las clases existentes. Añadimos la lógica para generar
instrucciones update a una nueva subclase de Sql, UpdateSql. Este cambio
no afecta a otro código del sistema.
Nuestra lógica Sql reestructurada representa lo mejor de ambos mundos.
Cumple con SRP y también con otro principio clave del diseño de clases
orientadas a objetos, denominado Principio abierto/cerrado[48]: las clases
deben abrirse para su ampliación para cerrarse para su modificación. La
nueva clase Sql se abre a nuevas funcionalidades mediante la creación de
subclases pero podemos realizar estos cambios y mantener cerradas las
demás clases. Basta con añadir nuestra clase UpdateSql.
Debemos estructurar nuestros sistemas para ensuciarlos lo menos posible
cuando los actualicemos con nuevas funciones o cambios. En un sistema
ideal, incorporamos nuevas funciones ampliándolo, no modificando el código
existente.
Aislarnos de los cambios
-- 201 of 644 --

Las necesidades cambiarán y también lo hará el código. En la programación
orientada a objetos aprendemos que hay clases concretas que contienen
detalles de implementación (el código) y clases abstractas que sólo
representan conceptos. Una clase cliente que dependa de detalles concretos
está en peligro si dichos detalles cambian. Podemos recurrir a interfaces y
clases abstractas para aislar el impacto de dichos detalles.
Las dependencias de detalles de concretos crean retos para nuestro
sistema. Si tenemos que crear la clase Portfolio y ésta depende de una API
TokyoStockExchange externa para obtener su valor, nuestros casos de prueba
se verán afectados por la volatilidad de esta búsqueda. Resulta complicado
crear una prueba cuando se obtiene una respuesta diferente cada cinco
minutos. En lugar de diseñar Portfolio para que dependa directamente de
TokyoStockExchange, creamos una interfaz, StockExchange, que declara un
único método:
public Interface StockExchange {
Money currentPrice(String symbol);
}
Diseñamos TokyoStockExchange para implementar esta interfaz.
También nos aseguramos de que el constructor de Portfolio adopte como
argumento una referencia a StockExchange:
public Portfolio {
private StockExchange exchange;
public Portfolio(StockExchange exchange) {
this.exchange = exchange;
}
//…
}
Ahora la prueba puede crear una implementación de la interfaz
StockExchange que emule TokyoStockExchange. Esta implementación de
prueba fijará el valor actual del símbolo que usemos en la prueba.
Si nuestra prueba demuestra la adquisición de cinco acciones de
Microsoft para nuestra cartera de valores, diseñe el código de la
implementación de prueba para que siempre devuelva 100 dólares por acción
de Microsoft. Nuestra implementación de prueba de la interfaz
StockExchange se reduce a una sencilla búsqueda de tabla. De este modo
-- 202 of 644 --

---

## [Sección 62] sección 6.8. Codificación de transferencia de contenidos Base64

podemos crear una prueba que espere un valor de cartera total de 500 dólares:
public class PortfolioTest {
private FixedStockExchangeStub exchange;
private Portfolio portfolio;
@Before
protected void setUp() throws Exception {
exchange = new FixedStockExchangeStub();
exchange.fix(“MSFT”, 100);
portfolio = new Portfolio(exchange);
}
@Test
public void GivenFiveMSFTTotalShouldBe500() throws Exception {
portfolio.add(5, “MSFT”);
Assert.assertEquals(500, portfolio.value());
}
}
Si diseccionamos un sistema para poder probarlo de esta forma, resultará
más flexible y se podrá reutilizar. La ausencia de conexiones significa que los
elementos del sistema se aíslan entre ellos y de otros cambios. Este
aislamiento hace que comprendamos mejor los elementos del sistema.
Al minimizar las conexiones de esta forma, nuestras clases cumplen otro
principio de diseño: Dependency Inversion Principle (DIP) o Principio de
inversión de dependencias[49]. Básicamente afirma que nuestras clases deben
depender de abstracciones, no de detalles concretos.
En lugar de depender de los detalles de implementación de la clase
TokyoStockExchange, nuestra clase Portfolio depende de la interfaz
StockExchange, que representa el concepto abstracto de solicitar el precio
actual de una acción. Esta abstracción aísla todos los datos concretos de la
obtención de dicho precio, incluyendo de dónde se obtiene.
Bibliografía
[RDD]: Object Design: Roles, Responsibilities, and Collaborations,
Rebecca Wirfs-Brock et al., Addison-Wesley, 2002.
[PPP]: Agile Software Development: Principles, Patterns, and
Practices, Robert C. Martin, Prentice Hall, 2002.
-- 203 of 644 --

[Knuth92]: Literate Programming, Donald E. Knuth, Center for the
Study of language and Information, Leland Stanford Junior University,
1992.
-- 204 of 644 --
Sistemas
por el Dr. Kevin Dean Wampler
-- 205 of 644 --

«La complejidad es letal. Acaba con los desarrolladores y dificulta
la planificación, generación y pruebas de los productos».
—Ray Ozzie, CTO, Microsoft Corporation
Cómo construir una ciudad
¿Podría encargarse de todos los detalles por su cuenta? Seguramente no.
Incluso la gestión de una ciudad existente sería demasiado para una sola
persona. Y aun así, las ciudades funcionan (en la mayoría de los casos).
Funcionan porque tienen equipos que controlan partes concretas de la ciudad,
el alcantarillado, la red eléctrica, el tráfico, la seguridad, las normativas
-- 206 of 644 --

urbanísticas, etc. Algunos se encargan de aspectos generales y otros se
centran en los detalles.
Las ciudades también funcionan porque disponen de evolucionados
niveles de abstracción y modularidad que permiten a individuos y
componentes trabajar de forma eficaz, sin necesidad de entender el trasfondo
general.
Aunque los equipos de software se suelen organizar de esta forma, los
sistemas en los que trabajan no suelen contar con la misma separación de
aspectos y niveles de abstracción. En este capítulo veremos cómo mantener la
limpieza en niveles superiores de abstracción, en el sistema.
Separar la construcción de un sistema de su uso
En primer lugar, recuerde que la construcción es un proceso muy diferente al
uso. Mientras escribo estas líneas, a través de la ventana veo un nuevo hotel
en construcción en Chicago. Hoy instalarán una gran grúa. Todos los obreros
llevan casco. Dentro de un año habrán acabado el hotel. La grúa
desaparecerá. El edificio estará terminado, con su reluciente fachada de
cristal y su atractiva decoración. La gente que trabajará en él también será
diferente.
Los sistemas de software deben separar el proceso de inicio, en el que
se crean los objetos de la aplicación y se conectan las dependencias,
de la lógica de ejecución que toma el testigo tras el inicio.
El proceso de inicio es un aspecto que toda aplicación debe abordar. Es el
primero que veremos en este capítulo. La separación de aspectos es una de
las técnicas de diseño más antiguas e importantes de nuestra profesión.
Desafortunadamente, muchas aplicaciones no lo hacen. El código del
proceso de inicio se mezcla con la lógica de tiempo de ejecución. Veamos un
ejemplo típico:
public Service getService() {
if (service == null)
service = new MyServiceImpl (…); //¿Lo bastante predeterminado para la
-- 207 of 644 --

---

## [Sección 63] sección 6.8. Codificación de transferencia de contenidos Base64

mayoría de los casos?
return service;
}
Es la técnica de inicialización/evaluación tardía y tiene sus méritos. No
incurrimos en la sobrecarga de la construcción a menos que usemos el objeto
realmente, y como resultado el tiempo de inicio se puede acelerar. También
evitamos que se devuelva null.
Sin embargo, ahora tenemos una dependencia en MyServiceImpl y todo
lo que su constructor requiere (que he omitido). No podemos compilar sin
resolver estas dependencias, aunque nunca usemos un objeto de este tipo en
tiempo de ejecución.
Las pruebas también pueden ser un problema. Si MyServiceImpl es un
objeto pesado, tendremos que asegurarnos de asignar el correspondiente test
double[50] u objeto simulado al campo de servicio antes de invocar este
método en las pruebas de unidad. Como la lógica de la construcción se
mezcla con el procesamiento normal de tiempo de ejecución, debemos probar
todas las rutas de ejecución (como la prueba null y su bloque). Al contar con
ambas responsabilidades, el método hace más de una cosa, por lo que se
incumple el principio de responsabilidad única.
Lo peor de todo es que no sabemos si MyServiceImpl es el objeto
correcto en todos los casos. ¿Por qué la clase con este método tiene que
conocer el contexto global? ¿Podemos saber realmente cuál es el objeto
correcto que usar aquí? ¿Es posible que un mismo tipo sea el correcto para
todos los contextos posibles?
Un caso de inicialización tardía no es un problema serio. Sin embargo,
suele haber muchos casos de este tipo de configuración en las aplicaciones.
Por tanto, la estrategia de configuración global (si existe) se disemina por la
aplicación, sin apenas modularidad y con una significativa duplicación.
Si somos diligentes sobre el diseño de sistemas robustos y bien formados,
no debemos permitir fallos de modularidad. El proceso de inicio de la
construcción y conexión de objetos no es una excepción. Debemos
modularizar este proceso y asegurarnos de contar con una estrategia global y
coherente para resolver las dependencias principales.
-- 208 of 644 --

Separar Main
Una forma de separar la construcción del uso consiste en trasladar todos los
aspectos de la construcción a main o a módulos invocados por main, y diseñar
el resto del sistema suponiendo que todos los objetos se han creado y
conectado correctamente (véase la figura 11.1).
El flujo de control es fácil de seguir. La función main crea los objetos
necesarios para el sistema, los pasa a la aplicación y ésta los utiliza. Verá que
las flechas de dependencia atraviesan la barrera entre main y la aplicación.
Todas van en la misma dirección, alejándose de main, lo que significa que la
aplicación no tiene conocimiento de main ni del proceso de construcción.
Simplemente espera que todo se haya construido correctamente.
Figura 11.1. Separación de la construcción en main().
Factorías
En ocasiones, la aplicación tendrá que ser responsable de la creación de un
objeto. Por ejemplo, en un sistema de procesamiento de pedidos, la
aplicación debe crear las instancias LineItem que añadir a Order. En este
caso, podemos usar el patrón de factoría abstracta[51] para que la aplicación
controle cuándo crear LineItem, pero mantener los detalles de dicha
construcción separados del código de la aplicación (véase la figura 11.2).
-- 209 of 644 --

De nuevo vemos que todas las dependencias se desplazan desde main a la
aplicación OrderProcessing, lo que significa que la aplicación se desconecta
de los detalles de creación de LineItem. Esta capacidad se incluye en
LineItemFactoryImplementation, en el extremo main de la línea. Y sin
embargo, la aplicación tiene control total sobre cuándo se crean las instancias
LineItem e incluso puede proporcionar argumentos de constructor
específicos de la aplicación.
Figura 11.2. Separación de la construcción con una factoría.
Inyectar dependencias
Un potente mecanismo para separar la construcción del uso es la Inyección
de dependencias, la aplicación de Inversión de control (Inversion of Control o
IoC) a la administración de dependencias[52]. La Inversión de control pasa
responsabilidades secundarias de un objeto a otros dedicados a ese cometido,
por lo que admite el principio de responsabilidad única. En el contexto de la
administración de dependencias, un objeto no debe ser responsable de
instanciar dependencias, sino que debe delegar esta responsabilidad en otro
mecanismo autorizado, de modo que se invierte el control. Como la
configuración es un aspecto global, este mecanismo autorizado suele ser la
-- 210 of 644 --

---

## [Sección 64] sección 6.8. Codificación de transferencia de contenidos Base64

rutina main o un contenedor de propósito especial.
Las búsquedas JNDI son una implementación parcial de la inyección de
dependencias, en las que un objeto solicita a un servidor de directorios un
servicio que coincida con un nombre concreto.
MyService myService = (MyService)(jndiContext.lookup(“NameOfMyService”));
El objeto invocador no controla el tipo de objeto devuelto (siempre que
implemente la interfaz correcta, evidentemente), pero es el que resuelve la
dependencia de forma activa.
La verdadera inyección de dependencias va un paso más allá. La clase no
hace nada directamente para resolver sus dependencias, es totalmente pasiva.
Por el contrario, ofrece métodos de establecimiento o argumentos de
constructor (o ambos) que se usan para inyectar las dependencias. En el
proceso de construcción, el contenedor de inyección de dependencias crea
instancias de los objetos necesarios (normalmente bajo demanda) y usa los
argumentos de constructor o métodos de establecimiento proporcionados para
conectar las dependencias. Los objetos dependientes empleados suelen
especificarse a través de un archivo de configuración o mediante
programación en un módulo de construcción de propósito especial.
La estructura Spring proporciona el contenedor de inyección de
dependencias más conocido para Java[53]. Los objetos que se van a conectar
se definen en un archivo de configuración XML y después se solicitan
objetos concretos por nombre en código de Java. Veremos un ejemplo en
breve.
¿Y qué sucede con las virtudes de la inicialización tardía? En ocasiones es
útil con la inyección de dependencias. Por un lado, muchos contenedores de
inyección de dependencias no crean un objeto hasta que es necesario. Por otra
parte, muchos de estos contenedores cuentan con mecanismos para invocar
factorías o crear proxies que se pueden usar para evaluación tardía y
optimizaciones similares[54].
Evolucionar
Las ciudades nacen de pueblos, que nacen de asentamientos. Inicialmente, los
-- 211 of 644 --

caminos son estrechos y prácticamente inexistentes, después se asfaltan y
aumentan de tamaño.
Los pequeños edificios y solares vacíos se llenan de otros mayores que
acaban convirtiéndose en rascacielos. Al principio no hay servicios,
electricidad, agua, alcantarillado o Internet (¡vaya!). Estos servicios se añaden
cuando aumenta la densidad de población.
Este crecimiento no es fácil. Cuántas veces mientras conduce por una
carretera llena de baches y ve una señal de obras no se ha preguntado por qué
no la hicieron más ancha desde un principio.
No se podía haber hecho de otra forma. ¿Quién puede justificar el gasto
en una autopista de seis carriles que atraviese un pequeño pueblo como
anticipación a un supuesto crecimiento? ¿Quién querría una autopista así en
su ciudad?
Conseguir sistemas perfectos a la primera es un mito. Por el contrario,
debemos implementar hoy, y refactorizar y ampliar mañana. Es la esencia de
la agilidad iterativa e incremental. El desarrollo controlado por pruebas, la
refactorización y el código limpio que generan hace que funcione a nivel del
código.
¿Pero qué sucede en el nivel del sistema? ¿La arquitectura del sistema no
requiere una planificación previa? Sin duda no puede aumentar
incrementalmente algo sencillo a algo complejo, ¿o sí?
Los sistemas de software son únicos si los comparamos con los
sistemas físicos. Sus arquitecturas pueden crecer incrementalmente,
si mantenemos la correcta separación de los aspectos.
La naturaleza efímera de los sistemas de software hace que sea posible,
como veremos. Primero nos centraremos en una arquitectura que no separa
correctamente los aspectos. Las arquitecturas EJB1 y EJB2 originales no
separaban correctamente los aspectos y por tanto imponían barreras
innecesarias al crecimiento orgánico. Imagine un bean de entidad para una
clase Bank persistente. Un bean de entidad es una representación en memoria
de datos relacionales, es decir, una fila de una tabla.
Primero, debe definir una interfaz local (en proceso) o remota (MVJ
-- 212 of 644 --

---

## [Sección 65] sección 6.8. Codificación de transferencia de contenidos Base64

independiente), que los clientes usen. El Listado 1-1 muestra una posible
interfaz local:
Listado 11-1
Una interfaz local EJB2 para el EJB Bank.
package com.example.banking;
import java.util.Collections;
import javax.ejb.*;
public interface BankLocal extends java.ejb.EJBLocalObject {
String getStreetAddrl{} throws EJBException;
String getStreetAddr2{} throws EJBException;
String getCity() throws EJBException;
String getState() throws EJBException;
String getZipCode() throws EJBException;
void setStreetAddr1(String street1) throws EJBException;
void setStreetAddr2(String street2) throws EJBException;
void setCity(String city) throws EJBException;
void setState(String state) throws EJBException;
void setZipCode(String zip) throws EJBException;
Collection getAccounts() throws EJBException;
void setAccounts(Collection accounts) throws EJBException;
void addAccount(AccountDTO accountDTO) throws EJBException;
}
Mostramos diversos atributos de la dirección de Bank y una colección de
cuentas del banco, cuyos datos se procesarán por un EJB Account diferente.
El Listado 11-2 muestra la correspondiente clase de implementación del bean
Bank.
Listado 11-2
Implementación del bean de entidad EJB2.
package com.example.banking;
import java.util.Collections;
import javax.ejb.*;
public abstract class Bank implements javax.ejb.EntityBean {
// Lógica empresarial…
public abstract String getStreerAddr1();
public abstract String getStreetAddr2();
public abstract String getCity();
public abstract String getState();
public abstract String getZipCode();
public abstract void setStreetAddr1(String street1);
-- 213 of 644 --

public abstract void setStreetAddr2(String street2);
public abstract void setcity(String city);
public abstract void setState(String state);
public abstract void setZipCode(String zip);
public abstract Collection getAccounts();
public abstract void setAccounts(Collection accounts);
public void addAccount(AccountPTO accountDTO) {
InitialContext context = new InitialContext();
AccountHomeLocal accountHome = context.lookup(“AccountHomeLocal”);
AccountLocal account = accountHome.create(accountDTO);
Collection accounts = getAccounts();
accounts.add(account);
}
// Lógica del contenedor EJB
public abstract void setId(Integer id);
public abstract Integer getId();
public Integer ejbCreate(Integer id) {…}
public void ejbPostCreate(Integer id) {…}
// El resto tendría que implementarse pero se deja vacío:
public void setEntityContext(EntityContext ctxt) {}
public void unsetEntityContext() {}
public void ejbActivate() {}
public void ejbPassivate() {}
public void ejbLoad() {}
public void ejbStore() {}
public void ejbRemove() {}
}
No mostramos la correspondiente interfaz LocalHome, básicamente una
factoría usada para crear objetos, no los métodos de consulta Bank que pueda
añadir.
Por último, debemos crear uno o varios descriptores de implementación
XML que especifiquen los detalles de asignación relacional de objetos en un
almacén persistente, el comportamiento deseado de la transacción,
limitaciones de seguridad y demás.
La lógica empresarial está directamente conectada al contenedor de la
aplicación EJB2. Debe crear subclases de tipos de contenedor y proporcionar
los métodos de ciclo vital necesarios para el contenedor. Debido a esta
conexión al contenedor pesado, las pruebas de unidad aisladas son
complicadas. Es necesario imitar el contenedor, algo difícil, o perder
demasiado tiempo en la implementación de EJB y pruebas en un servidor
real. La reutilización fuera de la arquitectura EJB2 es imposible, debido a esta
estrecha conexión. Por último, incluso la programación orientada a objetos se
ve afectada. Un bean no se puede heredar de otro. Fíjese en la lógica para
-- 214 of 644 --

añadir una nueva cuenta. En bean EJB2 es habitual definir Objetos de
transferencia de datos (Data Transfer Objects o DTO), estructuras sin
comportamiento. Esto suele generar tipos redundantes con los mismos datos
y requiere código predefinido para copiar datos entre objetos.
Aspectos transversales
La arquitectura EJB2 se acerca a la verdadera separación de aspectos en
determinados aspectos. Por ejemplo, los comportamientos transaccionales, de
seguridad y comportamiento deseados se declaran en los descriptores de
implementación, independientemente del código fuente. Aspectos como la
persistencia suelen cruzar los límites de objeto naturales de un dominio. Por
lo general intentará mantener todos sus objetos mediante la misma estrategia,
por ejemplo con un determinado DBMS[55] y no archivos planos, usando
determinadas convenciones de nomenclatura para tablas y columnas, una
semántica transaccional coherente, etc.
En principio, puede razonar su estrategia de persistencia de una forma
modular y encapsulada, pero en la práctica tendrá que distribuir el mismo
código que implemente la estrategia de persistencia entre varios objetos.
Usamos el término transversales para este tipo de aspectos. De nuevo, la
estructura de persistencia podría ser modular y la lógica de dominios, aislada,
también. El problema es la intersección entre ambos dominios.
De hecho, la forma en que la arquitectura EJB procesa persistencia,
seguridad y transacciones es una Programación orientada a aspectos (Aspect
Oriented Programming o AOP)[56]
anticipada, un enfoque de carácter general
para restaurar la modularidad en aspectos transversales. En AOP,
construcciones modulares denominadas aspectos especifican qué puntos del
sistema deben modificar su comportamiento de forma coherente para admitir
un determinado aspecto. Esta especificación se realiza mediante un sucinto
mecanismo de declaración o programación.
Si usamos la persistencia como ejemplo, podría declarar qué objetos y
atributos (o patrones) deben conservarse y después delegar las tareas de
persistencia a su estructura de persistencia. Las modificaciones de
-- 215 of 644 --

---

## [Sección 66] sección 6.8. Codificación de transferencia de contenidos Base64

comportamiento no son invasivas[57]
para el código de destino. Veamos tres
aspectos o mecanismos similares en Java.
Proxies de Java
Los proxies de Java son útiles en casos sencillos, como envolver
invocaciones de métodos en objetos o clases concretas. Sin embargo, los
proxies dinámicos proporcionados en el JDK sólo funcionan con interfaces.
Para aplicarlos a clases, debe usar una biblioteca de manipulación de código
de bytes, como CGLIB, ASM o Javassist[58].
El Listado 11-3 muestra la estructura de un proxy JDK para ofrecer
asistencia de persistencia a nuestra aplicación Bank; únicamente abarca los
métodos para obtener y establecer la lista de cuentas.
Listado 11-3
Ejemplo de proxy del JDK.
// Bank.java (eliminando nombres de paquetes…)
import java.utils.*;
// La abstracción de un banco.
public interface Bank {
Collection<Account> getAccounts();
void setAccounts(Collection<Accounts> accounts);
}
// BankImpl.java
import java.utils.*;
// “Plain Old Java Object” POJO que implementa la abstracción.
public class BankImpl implements Bank {
private List<Account> accounts;
public Collection<Account> getAccounts() {
return accounts;
}
public void setAccounts(Collections<Accounts> accounts) {
this.accounts = new ArrayList<Accounts>();
for (Account account: accounts) {
this.accounts.add(account);
}
}
}
-- 216 of 644 --

// BankProxyHandler.java
import java.lang.reflect.*;
import java.util.*;
// «InvocationHandler» necesario para la API de proxy.
public class BankProxyHandler implements InvocationHandler {
private Bank bank;
public BankHandler (Bank bank) {
this.bank = bank;
}
// Método definido en InvocationHandler
public Object invoke(Object proxy, Method method, Object[] args)
throws Throwable {
String methodName = method.getName();
if (methodName.equals(“getAccounts”)) {
bank.setAccounts(getAccountsFromDatabase());
return bank.getAccounts();
} else if (methodName.equals(“setAccounts”)) {
bank.setAccounts((Collection<Account>) args[0]);
setAccountsToDatabase(bank.getAccounts());
return null;
} else {
…
}
}
// Muchos detalles:
protected Collection<Account> getAccountsFromDatabase() {…}
protected void setAccountsToDatabase(Collection<Account> accounts) {…}
}
//En otra parte…
Bank bank = (Bank) Proxy.newproxyInstance(
Bank.class.getClassLoader(),
new Class[] { Bank.class },
new BankProxyHandler(new BankImpl()));
Definimos la interfaz Bank, que envolvemos en el proxy y un POJO
(Plain-Old Object u Objeto sencillo de Java), BankImpl, que implementa la
lógica empresarial (encontrará más información sobre POJO en un apartado
posterior).
La API Proxy requiere un objeto InvocationHandler que invocar para
implementar las invocaciones de métodos Bank realizadas en el proxy.
BankProxyHandler usa la API de reflexión de Java para asignar las
invocaciones de métodos genéricos a los métodos correspondientes de
-- 217 of 644 --

BankImpl, y así sucesivamente.
El código es abundante y complejo, incluso para este sencillo caso[59]. El
uso de una de las bibliotecas de manipulación de bytes es igualmente
complicado. El volumen y la complejidad de este código son dos de los
inconvenientes de los proxies. Dificultan la creación de código limpio.
Además, los proxies no ofrecen un mecanismo para especificar puntos de
ejecución globales del sistema, imprescindibles para una verdadera solución
AOP[60].
Estructuras AOP Java puras
Afortunadamente, gran parte del código predefinido de proxy se puede
procesar de forma automática mediante herramientas. Los proxies se usan
internamente en varias estructuras de Java como Spring AOP y JBoss AOP,
para implementar aspectos en Java[61]. En Spring, se crea la lógica
empresarial en forma de POJO, específicos de su dominio. No dependen de
estructuras empresariales (ni de otros dominios). Por tanto, son
conceptualmente más sencillos y más fáciles de probar. Su relativa
simplicidad garantiza que se implementen correctamente las correspondientes
historias y el mantenimiento y evolución del código en historias futuras.
La infraestructura necesaria de la aplicación, incluidos aspectos
transversales como persistencia, transacciones, seguridad, almacenamiento en
caché y recuperación ante fallos, se incorpora por medio de archivos de
configuración declarativos o API. En muchos casos, se especifican aspectos
de bibliotecas Spring o JBoss, en los que la estructura controla el uso de
proxies de Java o bibliotecas de código de bytes de forma transparente al
usuario. Estas declaraciones controlan el contenedor de inyección de
dependencias, que crea instancias de los principales objetos y las conecta
bajo demanda.
El Listado 11-4 muestra un fragmento tipo de un archivo de
configuración de Spring V2.5, app.xml[62].
-- 218 of 644 --

---

## [Sección 67] sección 6.8. Codificación de transferencia de contenidos Base64

Listado 11-4
Archivo de configuración de Spring 2.X
<beans>
…
<bean id=“appDataSource”
class=“org.apache.commons.dbcp.BasicDataSource”
destroy-method=“close”
p:driverClassName=“com.mysql.jdbc.Driver”
p:url=“jdbc:mysql://localhost:3306/mydb”
p:username=“me”/>
<bean id=“bankDataAccessObject”
class=“com.example.banking.persistence.BankDataAccessObject”
p:dataSource-ref=“appDataSource”/>
<bean id=“bank”
class=“com.example.banking.model.Bank”
p:dataAccessObject-ref=“bankDataAccessObject”/>
…
</beans>
Cada bean es como una parte de una muñeca rusa anidada, con un objeto
de domino de un proxy Bank (envuelto) por un Objeto de acceso a datos
(Data Accessor Object, DAO), que también se procesa a través de un proxy
por medio de un origen de datos de controlador JDBC (véase la figura 11.3).
Figura 11.3. La “muñeca rusa” de elementos de decoración.
El cliente cree que invoca getAccounts() en un objeto Bank, pero en
realidad se comunica con el objeto DECORATOR[63] más externo de un grupo,
un objeto que amplía el comportamiento básico del POJO Bank. Podríamos
añadir otros objetos de decoración para transacciones, almacenamiento en
caché y demás.
En la aplicación, bastan unas líneas para solicitar al contenedor de ID los
objetos de nivel superior del sistema, como se especifica en el archivo XML.
-- 219 of 644 --

XmlBeanFactory bf =
new XmlBeanFactory(new ClassPathResource(“app.xml”, getclass()));
Bank bank = (Bank) bf.getBean(“bank”);
Como apenas se necesitan líneas de código Java específico de Spring, la
aplicación se desconecta casi por completo de Spring y desaparecen los
problemas de conexión de sistemas como EJB2.
Aunque XML puede ser difícil de leer[64], la directiva especificada en
estos archivos de configuración es más sencilla que la complicada lógica de
proxy y aspectos oculta a la vista y creada de forma automática. Es una
arquitectura tan atractiva que sistemas como Spring modificaron totalmente
el estándar EJB para la versión 3. EJB3 sigue el modelo de Spring de
aspectos transversales admitidos mediante declaraciones con archivos de
configuración XML y/o anotaciones de Java 5.
El Listado 11-5 muestra nuestro objeto Bank reescrito en EJB3[65].
Listado 11-5
Un EJB Bank EJB3.
package com.example.banking.model;
import javax.persistence;
import java.util.ArrayList;
import java.util.Collection;
@Entity
@Table(name = “BANKS”)
public class Bank implements java.io.Serializable {
@Id @GeneratedValue(strategy=GenerationType.AUTO)
private int id;
@Embeddable // Un objeto en línea en la fila DB de Bank
public class Address {
protected String streetAddr1;
protected String streetAddr2;
protected String city;
protected String state;
protected String zipCode;
}
@Embedded
private Address address;
@OneToMany (cascade = CascadeType.ALL, fetch = FetchType.EAGER,
mappedBy=“bank”)
private Collection<Account> accounts = new ArrayList<Account>();
-- 220 of 644 --

public int getId() {
return id;
}
public void setID(int id) {
this.id = id;
}
public void addAccount(Account account) {
account.setBank(this);
accounts.add(account);
}
public Collection<Account> getAccounts() {
return accounts;
}
public void setAccounts(Collection<Account> accounts) {
this.accounts = accounts;
}
}
Este código es mucho más limpio que el código EJB2 original. Se
conservan algunos detalles de entidades, en las anotaciones. Sin embargo,
como no hay información fuera de las anotaciones, el código es limpio y fácil
de probar, mantener y demás.
Parte de la información de persistencia de las anotaciones se puede
cambiar a descriptores de implementación XML si es necesario, dejando un
POJO puro. Si los detalles de asignación de persistencia no cambian con
frecuencia, muchos equipos pueden optar por mantener las anotaciones pero
con menos obstáculos que si usaran EJB2.
Aspectos de AspectJ
Por último, la herramienta más completa de separación a través de aspectos
es el lenguaje AspectJ[66], una extensión de Java que ofrece compatibilidad
de primer nivel para aspectos como construcciones de modularidad. Los
enfoques puros de Java proporcionados por Spring AOP y JBoss AOP son
suficientes en el 80-90 por 100 de los casos en los que los aspectos son útiles.
Sin embargo, AspectJ ofrece un conjunto de herramientas avanzadas y
completas para la separación de aspectos. El inconveniente de AspectJ es la
necesidad de adoptar nuevas herramientas y aprender nuevas construcciones
-- 221 of 644 --

---

## [Sección 68] sección 6.8. Codificación de transferencia de contenidos Base64

del lenguaje. Los problemas de adopción se han mitigado parcialmente
gracias a la introducción de un formato de anotación de AspectJ, en el que se
usan anotaciones de Java 5 para definir aspectos con código puro de Java.
Además, la estructura Spring dispone de funciones que facilitan la
incorporación de aspectos basados en anotaciones en un equipo con
experiencia limitada con AspectJ.
El análisis completo de AspectJ supera los objetivos de este libro. Si
necesita más información al respecto, consulte [AspectJ], [Colyer] y [Spring].
Pruebas de unidad de la arquitectura del sistema
La separación a través de enfoques similares a aspectos no se puede
menospreciar. Si puede crear la lógica de dominios de su aplicación mediante
POJO, sin conexión con los aspectos arquitectónicos a nivel del código,
entonces se podrá probar realmente la arquitectura. Puede evolucionar de
simple a sofisticado, de acuerdo a las necesidades, adoptando nuevas
tecnologías bajo demanda. No es necesario realizar un Buen diseño por
adelantado (Big Design Up Front[67], BDUF). De hecho, BDUF puede ser
negativo ya que impide la adaptación al cambio, debido a la resistencia
fisiológica a descartar esfuerzos previos y a la forma en que las decisiones
arquitectónicas influyen en la concepción posterior del diseño.
Los arquitectos deben realizar BDUF ya que no resulta factible aplicar
cambios arquitectónicos radicales a una estructura física una vez avanzada la
construcción[68]. Aunque el software se rige por una física propia[69], es
económicamente factible realizar cambios radicales si la estructura del
software separa sus aspectos de forma eficaz.
Esto significa que podemos iniciar un proyecto de software con una
arquitectura simple pero bien desconectada, y ofrecer historias funcionales de
forma rápida, para después aumentar la infraestructura. Algunos de los
principales sitios Web del mundo han alcanzado una gran disponibilidad y
rendimiento por medio de sofisticadas técnicas de almacenamiento en caché,
seguridad, virtualización y demás, todo ello de forma eficaz y flexible ya que
los diseños mínimamente conectados son adecuadamente simples en cada
-- 222 of 644 --

nivel de abstracción y ámbito. Evidentemente, no quiere decir que
acometamos los proyectos sin timón. Debemos tener expectativas del ámbito
general, objetivos y un programa, así como la estructura general del sistema
resultante. Sin embargo, debemos mantener la capacidad de cambiar de
rumbo en respuesta a las circunstancias.
La arquitectura EJB inicial es una de las API conocidas con un exceso de
ingeniería y que compromete la separación de aspectos. Incluso las API bien
diseñadas pueden ser excesivas cuando no resultan necesarias. Una API
correcta debe desaparecer de la vista en la mayoría de los casos, para que el
equipo dedique sus esfuerzos creativos a las historias implementadas. En caso
contrario, las limitaciones arquitectónicas impedirán la entrega eficaz de un
valor óptimo para el cliente. Para recapitular:
Una arquitectura de sistema óptima se compone de dominios de
aspectos modularizados, cada uno implementado con POJO. Los
distintos dominios se integran mediante aspectos o herramientas
similares mínimamente invasivas. Al igual que en el código, en esta
arquitectura se pueden realizar pruebas.
Optimizar la toma de decisiones
La modularidad y separación de aspectos permite la descentralización de la
administración y la toma de decisiones. En un sistema suficientemente
amplio, ya sea una ciudad o un proyecto de software, no debe haber una sola
persona que adopte todas las decisiones.
Sabemos que conviene delegar las responsabilidades en las personas más
cualificadas. Solemos olvidar que también conviene posponer decisiones
hasta el último momento. No es falta de responsabilidad; nos permite tomar
decisiones con la mejor información posible. Una decisión prematura siempre
es subjetiva. Si decidimos demasiado pronto, tendremos menos información
del cliente, reflexión mental sobre el proyecto y experiencia con las opciones
de implementación.
-- 223 of 644 --

---

## [Sección 69] sección 6.8. Codificación de transferencia de contenidos Base64

La agilidad que proporciona un sistema POJO con aspectos
modularizados nos permite adoptar decisiones óptimas a tiempo,
basadas en los conocimientos más recientes. Además, se reduce la
complejidad de estas decisiones.
Usar estándares cuando añadan un valor demostrable
La construcción de edificios es una maravilla para la vista debido al ritmo
empleado (incluso en invierno) y los extraordinarios diseños posibles gracias
a la tecnología actual. La construcción es un sector maduro con elementos,
métodos y estándares optimizados que han evolucionado bajo presión durante
siglos.
Muchos equipos usaron la arquitectura EJB2 por ser un estándar, aunque
hubiera bastado con diseños más ligeros y sencillos. He visto equipos
obsesionados con estándares de moda y que se olvidaron de implementar el
valor para sus clientes.
Los estándares facilitan la reutilización de ideas y componentes,
reclutan individuos con experiencia, encapsulan buenas ideas y
conectan componentes. Sin embargo, el proceso de creación de
estándares puede tardar demasiado para el sector, y algunos pierden
el contacto con las verdaderas necesidades de aquello para los que
están dirigidos.
Los sistemas necesitan lenguajes específicos del dominio
La construcción de edificios, como muchos dominios, ha desarrollado un rico
lenguaje con vocabularios, frases y patrones[70] que comunican información
esencial de forma clara y concisa. En el mundo del software, ha renacido el
interés por crear Lenguajes específicos del dominio (Domain-Specific
Languages o DSL)[71], pequeños lenguajes independientes de creación de
secuencias de comandos o API de lenguajes estándar que permiten crear
-- 224 of 644 --

código que se lea de una forma estructurada, como lo escribiría un experto
del dominio. Un buen DSL minimiza el vacío de comunicación entre un
concepto de dominio y el código que lo implementa, al igual que las prácticas
ágiles optimizan la comunicación entre un equipo y los accionistas del
proyecto. Si tiene que implementar la lógica de dominios en el mismo
lenguaje usado por un experto del dominio, hay menos riesgo de traducir
incorrectamente el dominio en la implementación.
Los DSL, si se usan de forma eficaz, aumentan el nivel de abstracción por
encima del código y los patrones de diseño. Permiten al desarrollador revelar
la intención del código en el nivel de abstracción adecuado.
Los lenguajes específicos del dominio permiten expresar como POJO
todos los niveles de abstracción y todos los dominios de la aplicación,
desde directivas de nivel superior a los detalles más mínimos.
Conclusión
Los sistemas también deben ser limpios. Una arquitectura invasiva afecta a la
lógica de dominios y a la agilidad. Si la lógica de dominios se ve afectada, la
calidad se resiente, ya que los errores se ocultan y las historias son más
difíciles de implementar. Si la agilidad se ve comprometida, la productividad
sufre y las ventajas de TDD se pierden.
En todos los niveles de abstracción, los objetivos deben ser claros. Esto
sólo sucede si crea POJO y usa mecanismos similares a aspectos para
incorporar otros aspectos de implementación de forma no invasiva.
Independientemente de que diseñe sistemas o módulos individuales, no
olvide usar los elementos más sencillos que funcionen.
Bibliografía
[Alexander]: Christopher Alexander, A Timeless Way of Building,
Oxford University Press, New York, 1979.
-- 225 of 644 --

[AOSD]: Puerto de Desarrollo de software orientado a aspectos,
http://aosd.net.
[ASM]: Página de ASM, http://asm.objectweb.org/.
[AspectJ]: http: //eclipse.org/aspectj.
[CGLIB]: Biblioteca de generación de código,
http://cglib.sourceforge.net/.
[Colyer]: Adrian Colyer, Andy Clement, George Hurley, Mathew
Webster, Eclipse AspectJ, Person Education, Inc., Upper Saddle River,
NJ, 2005.
[DSL]: Lenguaje de programación específico del dominio,
http://es.wikipedia.org/wiki/Lenguaje_espec%C3%ADfico_del_dominio.
[Fowler]: Inversión de contenedores de control y el patrón de inyección
de dependencias (http://martinfowler.com/articles/injection.html).
[Goetz]: Brian Goetz, Java Theory and Practice: Decorating with
Dynamic Proxies, http://www.ibm.com/developerworks/java/library/jjtp08305.html.
[Javassist]: Página de Javassist,
http://www.csg.is.titech.ac.jp/chiba/javassist/.
[JBoss]: Página de JBoss, http: //jboss.org.
[JMock]: JMock: Una biblioteca de objetos Mock ligeros para Java,
http://jmock.org.
[Kolence]: Kenneth W. Kolence, Software physics and computer
performance measurements, Proceedings of the ACM annual
conference-Volume 2, Boston, Massachusetts, pp. 1024-1040,1972.
[Spring]: The Spring Framework, http://www.springframework.org.
[Mezzaros07]: XUnit Patterns, Gerard Mezzaros, Addison-Wesley,
2007.
[GOF]: Design Patterns: Elements of Reusable Object Oriented
Software, Gamma et al., Addison-Wesley, 1996.
-- 226 of 644 --
Emergencia
con Jeff Langr
Limpieza a través de diseños emergentes
-- 227 of 644 --

---

## [Sección 70] sección 6.8. Codificación de transferencia de contenidos Base64

Imagine que existieran cuatro sencillas reglas para crear diseños de calidad.
Imagine que siguiéndolas accediera a la estructura y al diseño de su código y
facilitara la aplicación de principios como SRP y DIP. Imagine que estas
cuatro reglas facilitaran la emergencia de diseños de calidad.
Muchos consideramos que las cuatro reglas de Kent Beck de diseño
sencillo[72] son fundamentales para crear un software bien diseñado.
Según Kent, un diseño es sencillo si cumple estas cuatro reglas:
Ejecuta todas las pruebas.
No contiene duplicados.
Expresa la intención del programador.
Minimiza el número de clases y métodos.
Describiremos estas reglas en orden de importancia.
Primera regla del diseño sencillo: Ejecutar todas las
pruebas
En primer lugar, un diseño debe generar un sistema que actúe de la forma
prevista. Un sistema puede tener un diseño perfecto sobre el papel pero si no
existe una forma sencilla de comprobar que realmente funciona de la forma
esperada, el esfuerzo sobre el papel es cuestionable.
Un sistema minuciosamente probado y que supera todas las pruebas en
todo momento se denomina sistema testable. Es una afirmación obvia, pero
importante. Los sistemas que no se pueden probar no se pueden verificar, y
un sistema que no se puede verificar no debe implementarse.
Afortunadamente, crear sistemas testables hace que diseñemos clases de
tamaño reducido y un solo cometido. Resulta más sencillo probar clases que
cumplen el SRP. Cuantas más pruebas diseñemos, más nos acercaremos a
elementos más fáciles de probar. Por lo tanto, hacer que nuestro sistema se
pueda probar nos ayuda a crear mejores diseños.
Las conexiones rígidas dificultan la creación de pruebas. Del mismo
modo, cuantas más pruebas creemos, más usaremos principios como DIP y
-- 228 of 644 --

herramientas con inyección de dependencias, interfaces y abstracción para
minimizar dichas conexiones. Nuestros diseños mejorarán todavía más.
En especial, seguir una sencilla regla que afirme que debemos realizar
pruebas y ejecutarlas continuamente afecta el cumplimiento por parte de
nuestro sistema de los principales objetivos de la programación orientada a
objetos de baja conexión y elevada cohesión. La creación de pruebas conduce
a obtener mejores diseños.
Reglas 2 a 4 del diseño sencillo: Refactorizar
Una vez creadas las pruebas, debemos mantener limpio el código y las clases.
Para ello, refactorizamos el código progresivamente. Tras añadir unas líneas,
nos detenemos y reflejamos el nuevo diseño. ¿Ha empeorado? En caso
afirmativo, lo limpiamos y ejecutamos las pruebas para comprobar que no
hay elementos afectados. La presencia de las pruebas hace que perdamos el
miedo a limpiar el código y que resulte dañado.
En la fase de refactorización, podemos aplicar todos los aspectos del
diseño de software correcto. Podemos aumentar la cohesión, reducir las
conexiones, separar las preocupaciones, modularizar aspectos del sistema,
reducir el tamaño de funciones y clases, elegir nombres más adecuados, etc.
Aquí también aplicamos las tres últimas reglas del diseño correcto: eliminar
duplicados, garantizar la capacidad de expresión y minimizar el número de
clases y métodos.
Eliminar duplicados
Los duplicados son los mayores enemigos de un sistema bien diseñado.
Suponen un esfuerzo adicional, riesgos añadidos y una complejidad a
mayores innecesaria. Los duplicados se manifiestan de diversas formas. Las
líneas de código similar pueden modificarse para que parezcan refactorizadas,
y hay otras formas de duplicación como la de implementación. Por ejemplo,
podríamos tener dos métodos en una clase de colección:
-- 229 of 644 --

int size() {}
boolean isEmpty() {}
Podríamos tener implementaciones separadas para cada método. El
método isEmpty podría controlar un valor booleano y size un contador, o
podemos eliminar la duplicación y vincular isEmpty a la definición de size:
boolean isEmpty() {
return 0 == size();
}
La creación de un sistema limpio requiere la eliminación de duplicados,
aunque sean unas cuantas líneas de código. Fíjese en el siguiente ejemplo:
public void scaleToOneDimension {
float desiredDimension, float imageDimension) {
if (Math.abs(desiredDimension - imageDimension) < errorThreshold)
return;
float scalingFactor = desiredDimension / imageDimension;
scalingFactor = (float)(Math.floor(scalingFactor * 100) * 0.01f);
RenderedOp newImage = ImageUtilities.getScaledImage(
image, scalingFactor, scalingFactor);
image.dispose();
System.gc();
image = newImage;
}
public synchronized void rotate(int degrees) {
RenderedOp newImage = ImageUtilities.getRotatedImage(
image, degrees);
image.dispose();
System.gc();
image = newImage;
}
Para mantener limpio este sistema, debemos eliminar la pequeña cantidad
de duplicación entre los métodos scaleToOneDimension y rotate:
public void scaleToOneDimension (
float desiredDimension, float imageDimension) {
if (Math.abs(desiredDimension - imageDimension) < errorThreshold)
return;
float scalingFactor = desiredDimension / imageDimension;
scalingFactor = (float)(Math.floor(scalingFactor * 100) * 0.01f);
replaceImage(ImageUtilities.getScaledImage(
image, scalingFactor, scalingFactor));
}
public synchronized void rotate (int degrees) {
replaceImage(ImageUtilities.getRotatedImage(image, degrees));
}
private void replaceImage(RenderedOp newImage) (
-- 230 of 644 --

---

## [Sección 71] sección 6.8. Codificación de transferencia de contenidos Base64

image.dispose();
System.gc();
image = newImage;
}
Al extraer a este reducido nivel, comenzamos a detectar incumplimientos
de SRP. Por ello, podríamos cambiar un nuevo método extraído a otra clase.
Esto aumenta su visibilidad. Otro miembro del equipo puede ver la necesidad
de volver a extraer el nuevo método y usarlo en otro contexto diferente. Esta
reutilización mínima puede reducir considerablemente la complejidad del
sistema. Saber cómo lograrlo es fundamental para alcanzar la reutilización a
gran escala.
El patrón Método de plantilla[73] es una técnica muy utilizada para
eliminar duplicados de nivel superior. Por ejemplo:
public class VacationPolicy {
public void accrueUSDivisionVacation() {
// código para calcular las vacaciones en función de las horas trabajadas
//…
// código para garantizar que las vacaciones cumplen los mínimos legales
//…
// código para aplicar vacation al registro payroll
//…
}
public void accrueEUDivisionVacation() {
// código para calcular las vacaciones en función de las horas trabajadas
//…
// código para garantizar que las vacaciones cumplen los mínimos legales
//…
// código para aplicar vacation al registro payroll
//…
}
}
El código entre accrueUSDivisionVacation y
accrueEuropeanDivisionVacation es prácticamente idéntico, a excepción
del cálculo de mínimos legales. Esa parte del algoritmo cambia en función
del tipo de empleado. Podemos eliminar la duplicación evidente si aplicamos
el patrón de Método de plantilla:
abstract public class VacationPolicy {
public void accrueVacation() {
calculateBaseVacationHours();
alterForLegalMinimums();
applyToPayroll();
}
-- 231 of 644 --

private void calculateBaseVacationHours() { /* … */ };
abstract protected void alterForLegalMinimums();
private void applyToPayroll(); { /* … */ };
}
public class USVacationPolicy extends VacationPolicy {
@Override protected void alterForLegalMinimums() {
// Lógica específica de EE.UU.
}
}
public class EUVacationPolicy extends VacationPolicy {
@Override protected void alterForLegalMinimums() {
// Lógica específica de la UE.
}
}
Las subclases ocupan el vacío generado en el algoritmo accrueVacation
y solamente proporcionan los datos que no están duplicados.
Expresividad
Muchos tenemos experiencia con código enrevesado. Muchos lo hemos
creado. Es fácil crear código que entendamos, ya que durante su creación nos
centramos en comprender el problema que intentamos resolver. Los
encargados de mantener el código no lo comprenderán de la misma forma.
El principal coste de un proyecto de software es su mantenimiento a largo
plazo. Para minimizar los posibles defectos al realizar cambios, es
fundamental que comprendamos el funcionamiento del sistema. Al aumentar
la complejidad de los sistemas, el programador necesita más tiempo para
entenderlo y aumentan las posibilidades de errores. Por tanto, el código debe
expresar con claridad la intención de su autor. Cuando más claro sea el
código, menos tiempo perderán otros en intentar comprenderlo. Esto reduce
los defectos y el coste de mantenimiento.
Puede expresarse si elige nombres adecuados. El objetivo es ver el
nombre de una clase y función, y que sus responsabilidades no nos
sorprendan.
También puede expresarse si reduce el tamaño de funciones y clases. Al
hacerlo, resulta más sencillo asignarles nombres, crearlas y comprenderlas.
-- 232 of 644 --

Otra forma de expresarse es usar una nomenclatura estándar. Los patrones de
diseño, por ejemplo, se basan en la comunicación y en la capacidad de
expresión. Al usar los nombres de patrones estándar, como COMMAND o
VISITOR, en los nombres de las clases que implementan dichos patrones
puede describir sucintamente su diseño a otros programadores.
Las pruebas de unidad bien escritas también son expresivas. Uno de los
principales objetivos de una prueba es servir de documentación mediante
ejemplos. Los que lean las pruebas deben entender con facilidad para qué
sirve una clase.
Pero la forma más importante de ser expresivo es la práctica. A menudo,
conseguimos que el código funcione y pasamos al siguiente problema sin
detenernos en facilitar la lectura del código para otros. No olvide que
seguramente sea el próximo que lea el código.
Por tanto, afronte su creación con orgullo. Dedique tiempo a sus
funciones y clases. Seleccione nombres mejores, divida las funciones
extensas en otras más reducidas y cuide su obra. El cuidado es un recurso
precioso.
Clases y métodos mínimos
Incluso conceptos tan básicos como la eliminación de código duplicado, la
expresividad del código y SRP pueden exagerarse. En un esfuerzo por reducir
el tamaño de clases y métodos, podemos crear demasiadas clases y métodos
reducidos. Esta regla también sugiere minimizar la cantidad de funciones y
clases.
Una gran cantidad de clases y métodos suele indicar un dogmatismo sin
sentido. Imagine un estándar de código que insista en la creación de una
interfaz para todas las clases, o a programadores que insisten en qué campos
y comportamientos siempre deben separarse en clases de datos y clases de
comportamiento. Este dogma debe evitarse y cambiarse por un enfoque más
pragmático.
Nuestro objetivo es reducir el tamaño general del sistema además del
tamaño de clases y funciones, pero recuerde que esta regla es la de menor
-- 233 of 644 --

---

## [Sección 72] sección 6.8. Codificación de transferencia de contenidos Base64

prioridad de las cuatro. Por ello, aunque sea importante reducir la cantidad de
clases y funciones, es más importante contar con pruebas, eliminar
duplicados y expresarse correctamente.
Conclusión
¿Existen prácticas sencillas que puedan reemplazar a la experiencia? Por
supuesto que no. Sin embargo, las prácticas descritas en este capítulo y en el
libro son una forma cristalizada de décadas de experiencia de muchos
autores. La práctica del diseño correcto anima y permite a los programadores
adoptar principios y patrones que en caso contrario tardarían años en
aprender.
Bibliografía
[XPE]: Extreme Programming Explained: Embrace Change, Kent
Beck, Addison Wesley, 1999.
[GOF]: Design Patterns: Elements of Reusable Object Oriented
Software, Gamma et al., Addison-Wesley, 1996.
-- 234 of 644 --
Concurrencia
por Brett L. Schuchert
-- 235 of 644 --

“Los objetos son abstracciones de procesamiento.
Los subprocesos son abstracciones de programaciones”.
—James O. Coplien[74]
La creación de programas concurrentes limpios es complicada, muy
complicada. Es mucho más sencillo crear código que se ejecute en un mismo
proceso. También es fácil crear código de subprocesamiento múltiple que
parezca correcto en la superficie pero que esté dañado a niveles más
profundos. Este código funciona correctamente hasta que el sistema se
somete a determinadas presiones.
En este capítulo analizaremos la necesidad de la programación
concurrente y sus dificultades. Tras ello, presentaremos diversas
recomendaciones para superar dichas dificultades y crear código concurrente
limpio. Por último, finalizaremos con los problemas relacionados con la
prueba de código concurrente.
La concurrencia limpia es un tema complejo, merecedor de un libro
propio. Aquí, intentaremos ofrecer una visión general, que después
ampliaremos en el apéndice A. Si simplemente tiene curiosidad por el tema,
le bastará con este capítulo. Si necesita entender la concurrencia a un nivel
más profundo, consulte también el apéndice.
¿Por qué concurrencia?
La concurrencia es una estrategia de desvinculación. Nos permite desvincular
lo que se hace de dónde se hace. En aplicación de un solo proceso, el qué y el
cuándo están tan firmemente vinculados que el estado de la aplicación se
puede determinar analizando la huella de la pila. Un programador que depure
este tipo de sistemas puede definir un punto de interrupción (o varios) y saber
el estado de la aplicación en función del punto al que se llegue.
La desvinculación del qué del dónde puede mejorar considerablemente el
rendimiento y la estructura de una aplicación. Desde un punto de vista
estructural, la aplicación parece una serie de equipos colaboradores y no un
gran bucle principal. Esto puede hacer que el sistema sea más fácil de
-- 236 of 644 --

comprender y ofrece diversas formas de separar las preocupaciones.
Pongamos por caso el modelo Servlet estándar de aplicaciones Web. Estos
sistemas se ejecutan bajo un contenedor Web o EJB que gestiona
parcialmente la concurrencia. Los servlet se ejecutan de forma asíncrona
cuando se reciben solicitudes Web. El programador de los servlet no tiene
que gestionar todas las solicitudes entrantes. En principio, la ejecución de
cada servlet vive en un mundo propio y se desvincula del resto.
Evidentemente, si fuera tan sencillo, no necesitaríamos este capítulo. De
hecho, la desvinculación proporcionada por los contenedores Web dista
mucho de ser perfecta. Los programadores de servlet deben asegurarse de que
sus programas sean correctos. No obstante, las ventajas estructurales del
modelo de servlet son significativas.
Pero la estructura no es el único motivo para adoptar la concurrencia.
Algunos sistemas tienen limitaciones de tiempo de respuesta y producción
que requieren soluciones concurrentes manuales. Imagine un dispositivo para
añadir información, con un solo proceso, que obtiene datos de distintos sitios
Web y los combina en un resumen diario. Al tener un solo proceso, accede
por turnos a cada sitio Web y siempre termina uno antes de comenzar el
siguiente. Su recorrido diario debe ejecutarse en menos de 24 horas. Sin
embargo, al añadir nuevos sitios Web, el tiempo aumenta hasta necesitarse
más de 24 horas para recopilar todos los datos. El único proceso implica una
prolongada espera para completar la E/S. Podríamos mejorar el rendimiento
con ayuda de un algoritmo de subprocesamiento múltiple que visite más de
un sitio Web por vez.
Imagine un sistema que procesa un usuario por vez y sólo requiere un
segundo por cada uno. Su capacidad de respuesta es válida para un número
reducido de usuarios pero si aumenta, también lo hace el tiempo de respuesta
del sistema. Ningún usuario querrá esperar a otros 150. Podríamos mejorar el
tiempo de respuesta de este sistema procesando varios usuarios a la vez.
Imagine un sistema que interprete grandes conjuntos de datos pero que sólo
ofrezca una solución completa tras procesarlos todos. Se podría procesar cada
conjunto de datos en un equipo distinto, para poder procesarlos todos en
paralelo.
-- 237 of 644 --

---

## [Sección 73] sección 6.8. Codificación de transferencia de contenidos Base64

Mitos e imprecisiones
También existen motivos evidentes para adoptar la concurrencia aunque,
como indicamos antes, sea complicada. Si no presta la suficiente atención,
pueden darse casos desagradables. Veamos los mitos e imprecisiones más
habituales:
La concurrencia siempre mejora el rendimiento: En ocasiones lo hace
pero sólo cuando se puede compartir tiempo entre varios procesos o
procesadores. Ninguna situación es trivial.
El diseño no cambia al crear programas concurrentes: De hecho, el
diseño de un algoritmo concurrente puede ser muy distinto al de un
sistema de un solo proceso. La desvinculación entre el qué y el cuándo
suele tener un efecto importante en la estructura del sistema.
No es importante entender los problemas de concurrencia al trabajar
con un contenedor Web o EJB: En realidad, debe saber lo que hace su
contenedor y protegerlo de problemas de actualizaciones concurrentes y
bloqueo, como veremos después.
Veamos otros aspectos relacionados con la creación de software
concurrente:
La concurrencia genera cierta sobrecarga, tanto en rendimiento como
en la creación de código adicional.
La concurrencia correcta es compleja, incluso para problemas sencillos.
Los errores de concurrencia no se suelen repetir, de modo que se
ignoran[75] en lugar de considerarse verdaderos problemas.
La concurrencia suele acarrear un cambio fundamental de la estrategia
de diseño.
Desafíos
¿Qué hace que la programación concurrente sea tan complicada? Fíjese en la
-- 238 of 644 --

siguiente clase:
public class X {
private int lastIdUsed;
public int getNextId() {
return ++lastIdUsed;
}
}
Imagine que creamos una instancia X, establecemos el campo lastIdUsed
en 42 y después compartimos la instancia entre dos procesos. Imagine ahora
que esos dos procesos invocan el método getNextId(); hay tres resultados
posibles:
El primer proceso obtiene el valor 43, el segundo el valor 44 y
lastIdUsed es 44.
El primer proceso obtiene el valor 44, el segundo el valor 43 y
lastIdUsed es 44.
El primer proceso obtiene el valor 43, el segundo el valor 43 y
lastIdUsed es 43.
El sorprendente tercer resultado[76] se produce cuando los dos procesos
coinciden. Se debe a que pueden adoptar varias rutas posibles en una línea de
código de Java y algunas generan resultados incorrectos. ¿Cuántas rutas
distintas existen? Para responder, debemos entender lo que hace el
compilador justo a tiempo con el código de bytes generado, y lo que el
modelo de memoria de Java considera atómico.
Una rápida respuesta, con el código de bytes generado, es que existen
12 870 rutas de ejecución diferentes[77] para los dos procesos ejecutados en el
método getNextId. Si el tipo de lastIdUsed cambia de int a long, el
número de rutas asciende a 2 704 156. Evidentemente, muchas generan
resultados válidos. El problema es que algunas no lo hacen.
Principios de defensa de la concurrencia
A continuación le mostramos una serie de principios y técnicas para proteger
-- 239 of 644 --

a sus sistemas de los problemas del código concurrente.
Principio de responsabilidad única (SRP)
SRP[78] establece que un método, clase o componente sólo debe tener un
motivo para cambiar. El diseño de concurrencia es lo bastante complejo como
para ser un motivo de cambio con derecho propio y, por tanto, debe separarse
del resto del código. Desafortunadamente, es habitual incrustar los detalles de
la implementación de concurrencia directamente en otro código de
producción.
Tenga en cuenta los siguientes aspectos:
El código relacionado con la concurrencia tiene su propio ciclo de
desarrollo, cambios y ajustes.
El código relacionado con la concurrencia tiene sus propios desafíos,
diferentes y más complicados, que los del código no relacionado con la
concurrencia.
El número de formas en las que el código incorrecto basado en la
concurrencia puede fallar lo complica ya de por sí, sin la carga añadida
del código de aplicación circundante.
Recomendación: Separe el código de concurrencia del resto del
código[79].
Corolario: Limitar el ámbito de los datos
Como hemos visto, dos procesos que modifican el mismo campo u objeto
compartido pueden interferir entre ellos y provocar un comportamiento
inesperado. Una solución consiste en usar la palabra clave synchronized
para proteger una sección importante del código que use el objeto
compartido, aunque conviene limitar la cantidad de estas secciones. Cuantos
más puntos actualicen datos compartidos, es más probable que:
-- 240 of 644 --

---

## [Sección 74] sección 6.8. Codificación de transferencia de contenidos Base64

Se olvide de proteger uno o varios de esos puntos, y se dañe el código
que modifica los datos compartidos.
Se duplique el esfuerzo necesario para garantizar la protección de todos
los elementos (incumplimiento de DRY[80]).
Resulta complicado determinar el origen de los fallos, que por
naturaleza son difíciles de detectar.
Recomendación: Encapsule los datos y limite el acceso a los datos
compartidos.
Corolario: Usar copias de datos
Una forma de evitar datos compartidos es no compartirlos. En algunos casos
se pueden copiar objetos y procesarlos como si fueran de sólo lectura. En
otros, se pueden copiar objetos, recopilar los resultados de varios procesos en
las copias y después combinar los resultados en un mismo proceso. Si existe
una forma sencilla de evitar los objetos compartidos, el código resultante
tendrá menos problemas. Puede que le preocupe el coste de la creación de
objetos adicionales. Merece la pena experimentar y comprobar si es un
problema real. No obstante, si el uso de copias de objetos permite al código
evitar la sincronización, las ventajas de evitar el bloque compensan la
creación adicional y la sobrecarga de la recolección de elementos sin usar.
Corolario: Los procesos deben ser independientes
Pruebe a crear el código de sus procesos de forma que cada uno sea
independiente y no comparta datos con otros. Cada uno procesa una solicitud
cliente y todos los datos necesarios provienen de un origen sin compartir y se
almacenan como variables locales. De este modo, los procesos se comportan
como si fueran los únicos del mundo y no existieran requisitos de
sincronización. Por ejemplo, las subclases de HttpServlet reciben toda su
información como parámetros pasados en los métodos doGet y doPost. Esto
hace que cada servlet actúe como si dispusiera de su propio equipo. Mientras
-- 241 of 644 --

el código del servlet sólo use variables locales, es imposible que cause
problemas de sincronización. Evidentemente, muchas aplicaciones que usan
servlet se topan con recursos compartidos como conexiones de base de
datos.
Recomendación: Intente dividir los datos en subconjuntos
independientes que se puedan procesar en procesos independientes,
posiblemente en distintos procesadores.
Conocer las bibliotecas
Java 5 ofrece muchas mejoras para el desarrollo concurrente con respecto a
versiones anteriores. Existen diversos aspectos que tener en cuenta a la hora
de crear código de procesos en Java 5:
Usar las colecciones compatibles con procesos proporcionadas.
Usar la estructura de ejecución de tareas no relacionadas.
Usar soluciones antibloqueo siempre que sea posible.
Varias clases de bibliotecas no son compatibles con procesos.
Colecciones compatibles con procesos
En los albores de Java, Doug Lea escribió el conocido libro[81] Concurrent
Programming in Java. Al mismo tiempo, desarrolló varias colecciones
compatibles con procesos, que posteriormente pasaron a formar parte del
JDK en el paquete java.util.concurrent. Las colecciones de dicho paquete
son compatibles con casos de procesos múltiples y tienen un rendimiento
adecuado. De hecho, la implementación ConcurrentHashMap tiene mejor
rendimiento que HashMap en la mayoría de los casos. También permite
lecturas y escrituras simultáneas, y dispone de métodos que admiten
operaciones de composición habituales que en caso contrario serian
incompatibles con subprocesos. Si Java 5 es su entorno de desarrollo,
comience con ConcurrentHashMap.
-- 242 of 644 --

Existen otras clases añadidas para admitir diseño avanzado de
concurrencia. Veamos algunos ejemplos:
ReentrantLock Bloqueo que se puede adquirir en un método y liberar en
otro.
semaphore Una implementación del clásico semáforo, un bloqueo con
un contador.
CountDownLatch Bloqueo que espera un número de eventos antes de liberar
todos los subprocesos retenidos. De este modo todos
tienen la misma oportunidad de iniciarse al mismo tiempo.
Recomendación: Revise las clases de las que disponga. En el caso de
Java, debe familiarizarse con java.util.concurrent,
java.util.concurrent.atomic y java.util.concurrent.locks.
Conocer los modelos de ejecución
Existen diversas formas de dividir el comportamiento de una aplicación
concurrente. Para describirlos debe conocer ciertas definiciones básicas.
Recursos
vinculados Recursos de tamaño o número fijo usados en un entorno
concurrente, como por ejemplo conexiones de base de datos y
búfer de lectura/escritura de tamaño fijo.
Exclusión
mutua Sólo un proceso puede acceder a datos o a un recurso
compartido por vez.
Inanición Se impide que un proceso o grupo de procesos continúen
demasiado tiempo o indefinidamente. Por ejemplo, si permite
primero la ejecución de los procesos más rápidos, los que se
ejecutan durante más tiempo pueden perecer de inanición si los
primeros no terminan nunca.
Bloqueo Dos o más procesos esperan a que ambos terminen. Cada
proceso tiene un recurso y ninguno puede terminar hasta que
obtenga el otro recurso.
Bloqueo Procesos bloqueados, intentando realizar su labor pero
-- 243 of 644 --

---

## [Sección 75] sección 6.8. Codificación de transferencia de contenidos Base64

activo estorbándose unos a otros. Por motivos de resonancia, los
procesos siguen intentando avanzar pero no pueden durante
demasiado tiempo, o de forma indefinida.
Tras mostrar estas definiciones, ya podemos describir los distintos
modelos de ejecución empleados en la programación concurrente.
Productor-Consumidor[82]
Uno o varios procesos productores crean trabajo y lo añaden a un búfer o a
una cola. Uno o varios procesos consumidores adquieren dicho trabajo de la
cola y lo completan. La cola entre productores y consumidores es un recurso
vinculado, lo que significa que los productores deben esperar a que se libere
espacio en la cola antes de escribir y los consumidores deben esperar hasta
que haya algo que consumir en la cola. La coordinación entre productores y
consumidores a través de la cola hace que unos emitan señales a otros. Los
productores escriben en la cola e indican que ya no está vacía. Los
consumidores leen de la cola e indican que ya no está llena. Ambos esperan
la notificación para poder continuar.
Lectores-Escritores[83]
Cuando un recurso compartido actúa básicamente como fuente de
información para lectores pero ocasionalmente se actualiza por parte de
escritores, la producción es un problema. El énfasis de la producción puede
provocar la inanición y la acumulación de información caducada. Las
actualizaciones pueden afectar a la producción. La coordinación de lectores
para que no lean algo que un escritor está actualizando y viceversa es
complicada. Los escritores tienden a bloquear a los lectores durante periodos
prolongados, lo que genera problemas de producción.
El desafío consiste en equilibrar las necesidades de ambos para satisfacer
un funcionamiento correcto, proporcionar una producción razonable y evitar
la inanición. Una sencilla estrategia hace que los escritores esperen hasta que
deje de haber lectores antes de realizar una actualización. Si hay lectores
-- 244 of 644 --

continuos, los escritores perecen de inanición.
Por otra parte, si hay escritores frecuentes y se les asigna prioridad, la
producción se ve afectada. Determinar el equilibrio y evitar problemas de
actualización concurrente es el objetivo de este modelo.
La cena de los filósofos[84]
Imagine varios filósofos sentados alrededor de una mesa redonda. A la
izquierda de cada uno hay un tenedor. En el centro de la mesa, una gran
fuente de espaguetis. Los filósofos pasan el tiempo pensando a menos que
tengan hambre. Cuando tienen hambre, utilizan los tenedores situados a
ambos lados para comer. No pueden comer a menos que tengan dos
tenedores. Si el filósofo situado a la derecha o izquierda de otros ya tiene uno
de los tenedores que necesita, tendrá que esperar a que termine de comer y
deje los tenedores. Cuando un filósofo termina de comer, vuelve a colocar los
tenedores en la mesa hasta que vuelve a tener hambre. Cambie los filósofos
por procesos y los tenedores por recursos y tendrá un problema habitual en
muchas aplicaciones en las que los procesos compiten por recursos. A menos
que se diseñen correctamente, los sistemas que compiten de esta forma
experimentan problemas de bloqueo, bloqueo mutuo, producción y
degradación de la eficacia. La mayoría de problemas de concurrencia que
encontrará serán alguna variante de éstos. Analice los algoritmos y cree
soluciones propias para estar preparado cuando surjan problemas de
concurrencia.
Recomendación: Aprenda estos algoritmos básicos y comprenda sus
soluciones.
Dependencias entre métodos sincronizados
Las dependencias entre métodos sincronizados generan sutiles errores en el
código concurrente. Java cuenta con synchronized, que protege métodos
individuales. No obstante, si hay más de un método sincronizado en la misma
clase compartida, puede que su sistema sea incorrecto[85].
-- 245 of 644 --

Recomendación: Evite usar más de un método en un objeto compartido.
En ocasiones tendrá que usar más de un método en un objeto compartido.
En ese caso, hay tres formas de crear código correcto:
Bloqueo basado en clientes: El cliente debe bloquear al servidor antes
de invocar el primer método y asegurarse de que el alcance del bloque
incluye el código que invoque el último método.
Bloqueo basado en servidores: Debe crear un método en el servidor
que bloquee el servidor, invoque todos los métodos y después anule el
bloqueo. El cliente debe invocar el nuevo método.
Servidor adaptado: Cree un intermediario que realice el bloque. Es un
ejemplo de bloqueo basado en servidores en el que el servidor original
no se puede modificar.
Reducir el tamaño de las secciones sincronizadas
La palabra clave synchronized presenta un bloqueo. Todas las secciones de
código protegidas por el mismo bloque sólo tendrán un proceso que las
ejecute en un momento dado. Los bloqueos son costosos ya que generan
retrasos y añaden sobrecarga. Por ello, no conviene colapsar el código con
instrucciones synchronized. Por otra parte, las secciones críticas[86] deben
protegerse, de modo que debemos diseñar nuestro código con el menor
número posible de secciones críticas.
Algunos programadores intentan lograrlo ampliando el tamaño de sus
secciones críticas. Sin embargo, al ampliar la sincronización más allá de la
sección crítica mínima aumentan los problemas y afecta negativamente al
rendimiento[87].
Recomendación: Reduzca al máximo el tamaño de las secciones
synchronized.
Crear código de cierre correcto es complicado
-- 246 of 644 --

---

## [Sección 76] sección 6.8. Codificación de transferencia de contenidos Base64

Crear un sistema activo y que se ejecute indefinidamente es distinto a crear
algo que funcione de forma temporal y después se cierre correctamente. Entre
los problemas más habituales destacan los bloqueos[88], con procesos que
esperan una señal para continuar que nunca se produce.
Imagine, por ejemplo, un sistema con un proceso principal que genera
varios procesos secundarios y que espera a que todos terminen antes de
liberar sus recursos y cerrarse. ¿Qué sucede si uno de los procesos
secundarios está bloqueado? El principal esperará indefinidamente y el
sistema nunca se cerrará.
Imagine ahora un sistema similar al que se le indica que se cierre. El
proceso principal indica a todos los secundarios que abandonen sus tareas y
terminen. Pero imagine que dos procesos secundarios funcionan como par
productor/consumidor y que el productor recibe una señal del principal y se
cierra rápidamente. El consumidor espera un mensaje del productor y puede
quedar bloqueado en un estado en el que no recibe la señal del principal, lo
que también impide que éste finalice.
Son situaciones habituales. Por tanto, si tiene que crear código
concurrente con cierres correctos, tendrá que dedicar tiempo a que el cierre se
produzca de forma correcta.
Recomendación: Planifique con antelación el proceso de cierre y
pruébelo hasta que funcione. Le llevará más tiempo del que espera. Repase
los algoritmos existentes porque será complicado.
Probar código con procesos
Demostrar que el código es correcto no resulta práctico. Las pruebas no
garantizan su corrección. Sin embargo, las pruebas adecuadas pueden
minimizar los riesgos, en especial en aplicaciones de un solo proceso.
Cuando hay dos o más procesos que usan el mismo código y trabajan con
datos compartidos, la situación se vuelve más compleja.
Recomendación: Cree pruebas que puedan detectar problemas y
ejecútelas periódicamente, con distintas configuraciones de programación y
del sistema, y cargas. Si las pruebas fallan, identifique el fallo. No lo ignore
-- 247 of 644 --

porque las pruebas superen una ejecución posterior.
Hay muchos factores que tener en cuenta. Veamos algunas
recomendaciones concretas:
Considere los fallos como posibles problemas de los procesos.
Consiga que primero funcione el código sin procesos.
El código con procesos se debe poder conectar a otros elementos.
El código con procesos debe ser modificable.
Ejecute con más procesos que procesadores.
Ejecute en diferentes plataformas.
Diseñe el código para probar y forzar fallos.
Considerar los fallos como posibles problemas de los
procesos
El código con procesos hace que fallen elementos que no deberían fallar.
Muchos desarrolladores desconocen cómo interactúan los procesos con otro
tipo de código. Los problemas del código con procesos pueden mostrar sus
síntomas una vez cada mil o un millón de ejecuciones.
Los intentos por repetir los sistemas pueden resultar frustrantes, lo que
suele provocar que los programadores consideren el fallo como algo aislado.
Es recomendable asumir que los fallos aislados no existen. Cuanto más los
ignore, mayor será la cantidad de código que se acumule sobre un enfoque
defectuoso.
Recomendación: No ignore los fallos del sistema como algo aislado.
Conseguir que primero funcione el código sin procesos
Puede parecer evidente pero no está de más recordarlo. Asegúrese de que el
código funciona fuera de sus procesos. Por lo general, esto significa crear
algunos POJO que los procesos deban invocar. Los POJO no son compatibles
con los procesos y por tanto se pueden probar fuera de su entorno. Conviene
-- 248 of 644 --

incluir en los POJO la mayor cantidad posible del sistema.
Recomendación: No intente identificar fallos de procesos y que no sean
de procesos al mismo tiempo. Asegúrese de que su código funciona fuera de
los procesos.
El código con procesos se debe poder conectar a otros
elementos
Cree el código compatible con la concurrencia de forma que se pueda
ejecutar en distintas configuraciones:
Un proceso, varios procesos y variarlo durante la ejecución.
El código con procesos interactúa con algo que puede ser real o probado.
Ejecutar con pruebas dobles ejecutadas de forma rápida, lenta y variable.
Configurar pruebas que ejecutar en diferentes iteraciones.
Recomendación: El código con procesos debe poder conectar a otros
elementos y ejecutar en distintas configuraciones.
El código con procesos debe ser modificable
La obtención del equilibrio adecuado de procesos suele requerir operaciones
de ensayo y error. En las fases iniciales, compruebe el rendimiento del
sistema bajo diferentes configuraciones. Permita que se puedan modificar los
distintos procesos y también durante la ejecución del sistema. También puede
permitir la modificación automática en función de la producción y la
utilización del sistema.
Ejecutar con más procesos que procesadores
Cuando el sistema cambia de tarea, se producen reacciones. Para promover el
intercambio de tareas, realice la ejecución con más procesos que
procesadores o núcleos. Cuanto mayor sea la frecuencia de intercambio de las
-- 249 of 644 --

---

## [Sección 77] sección 6.8. Codificación de transferencia de contenidos Base64

tareas, más probabilidades existen de que el código carezca de una sección
crítica o se produzcan bloqueos.
Ejecutar en diferentes plataformas
En 2007 diseñamos un curso sobre programación concurrente, principalmente
en OS X. La clase se presentó con Windows XP ejecutado en una MV. Se
crearon pruebas para ilustrar condiciones de fallo que fallaban con más
frecuencia en OS X que en XP.
En todos los casos, el código probado era incorrecto. Esto refuerza el
hecho de que cada sistema operativo tiene una política de procesos diferente
que afecta a la ejecución del código. El código con procesos múltiples se
comporta de forma distinta en cada entorno[89]. Debe ejecutar sus pruebas en
todos los entornos de implementación posibles.
Recomendación: Ejecute el código con procesos en todas las
plataformas de destino con frecuencia y en las fases iniciales.
Diseñar el código para probar y forzar fallos
Es habitual que los fallos del código concurrente se oculten. Las pruebas
sencillas no suelen mostrarlos. En realidad, suelen ocultarse durante el
procesamiento normal. Pueden aparecer horas, días o semanas después.
La razón de que los problemas de procesos sean infrecuentes, esporádicos
y apenas se repitan es que sólo fallan algunas de las miles de rutas posibles
que recorren una sección vulnerable. Por tanto, la probabilidad de adoptar
una ruta fallida es realmente baja, lo que dificulta la detección y la
depuración.
Se preguntará cómo aumentar las posibilidades de capturar estos casos.
Puede diseñar el código y forzarle a que se ejecute en diferentes órdenes
añadiendo métodos como Object.wait(), Object.sleep(), Object.yield()
y Object.priority().
Estos métodos afectan al orden de ejecución y, por tanto, aumentan las
posibilidades de detectar un error. Resulta más adecuado que el código
-- 250 of 644 --

incorrecto falle lo antes posible y con frecuencia. Hay dos opciones de
instrumentación de código:
Manual.
Automática.
Manual
Puede añadir invocaciones de wait(), sleep(), yield() y priority()
manualmente a su código, en especial si tiene que probar un fragmento
especialmente escabroso. Veamos un ejemplo:
public synchronized String nextUrlOrNull() {
if (hasNext()) {
String url = urlGenerator.next();
Thread.yield(); // se añade para pruebas.
updateHasNext();
return url;
}
return null;
}
La invocación de yield() cambia la ruta de ejecución adoptada por el
código y posiblemente hace que el código falla donde no lo hacía antes. Si el
código falla, no se debe a la invocación de yield() añadida[90]. Se debe a que
el código es incorrecto y hemos hecho que el fallo sea más evidente. Este
enfoque presenta varios problemas:
Tendrá que buscar manualmente los puntos adecuados donde hacerlo.
¿Cómo sabe dónde incluir la invocación y qué tipo de invocación usar?
La presencia de este código en un entorno de producción ralentiza
innecesariamente el código.
Es un enfoque que puede o no detectar los fallos; de hecho, no las tiene
todas consigo.
Lo que necesitamos es una forma de hacerlo durante la fase de pruebas,
no de producción. También debemos poder mezclar configuraciones entre
ejecuciones, lo que aumenta las probabilidades de detectar los errores.
-- 251 of 644 --

Evidentemente, si dividimos el sistema POJO que no sepa nada los
procesos en clases que controlen los procesos, resultará más sencillo ubicar
los puntos en los que instrumentar el código. Es más, podríamos crear
diferentes pruebas que invoquen los POJO bajo distintos regímenes de
invocaciones a sleep, yield y demás.
Automática
Puede usar herramientas como la estructura orientada a aspectos, CGLIB o
ASM para instrumentar su código mediante programación. Por ejemplo,
podría usar una clase con un único método:
public class ThreadJigglePoint {
public static void jiggle() {
}
}
Puede añadir invocaciones en distintos puntos del código:
public synchronized String nextUrlOrNull() {
if(hasNext()) {
ThreadJigglePoint.jiggle();
String url = urlGenerator.next();
ThreadJigglePoint.jiggle();
updateHasNext();
ThreadJigglePoint.jiggle();
return url;
}
return null;
}
Tras ello, use un sencillo aspecto que seleccione aleatoriamente entre no
hacer nada, pausar o generar un resultado.
Imagine que la clase ThreadJigglePoint tiene dos implementaciones. La
primera implementa jiggle para no hacer nada y se usa en producción. La
segunda genera un número aleatorio para elegir entre sleep, yield o nada. Si
ejecuta sus pruebas mil veces con jiggle de forma aleatoria, puede descubrir
algunos fallos. Si la prueba es satisfactoria, al menos puede felicitarse por
haber actuado correctamente. Aunque sea un tanto simple, puede resultar una
opción razonable en lugar de recurrir a una herramienta más sofisticada. La
herramienta ConTest[91], desarrollada por IBM, tiene un funcionamiento
-- 252 of 644 --

---

## [Sección 78] sección 6.8. Codificación de transferencia de contenidos Base64

similar pero es más sofisticada.
El objetivo es que los procesos del código se ejecuten en distinto orden en
momentos diferentes. La combinación de pruebas bien escritas y ejecuciones
aleatorias puede aumentar considerablemente la capacidad de detectar
errores.
Recomendación: Use estas estrategias para detectar errores.
Conclusión
Es complicado conseguir código concurrente correcto. El código sencillo se
puede complicar al añadir varios procesos y datos compartidos. Si tiene que
crear código concurrente, tendrá que hacerlo con rigor o se enfrentará a
sutiles y esporádicos fallos.
En primer lugar, siga el principio de responsabilidad única. Divida su
sistema en varios POJO que separen el código compatible con procesos del
resto. Asegúrese de probar únicamente el código compatible con procesos y
nada más, por lo que este código debe ser de tamaño reducido y específico.
Conozca los orígenes de los problemas de concurrencia: varios procesos
que operen en datos compartidos o usen una agrupación de recursos común.
Los casos de límites, como el cierre correcto o la conclusión de la iteración
de un bucle, pueden ser especialmente espinosos.
Conozca su biblioteca y los algoritmos fundamentales. Debe comprender
cómo las funciones de la biblioteca permiten resolver problemas similares a
los de los algoritmos fundamentales.
Aprenda a localizar regiones del código que se puedan bloquear y
bloquéelas. No bloquee otras regiones que no lo necesiten. Evite invocar una
sección bloqueada desde otra. Para ello debe saber si un elemento está
compartido o no. Reduzca la cantidad de objetos compartidos y su ámbito.
Cambie los diseños de los objetos con datos compartidos para acomodar
clientes en lugar de obligar a los clientes a gestionar el estado compartido.
Los problemas se acumularán. Los que no aparezcan inicialmente suelen
considerarse esporádicos y suelen producirse en la fase de carga o de modo
aparentemente aleatorio. Por tanto, debe poder ejecutar su código con
-- 253 of 644 --

procesos en diferentes configuraciones y plataformas de forma repetida y
continua. La capacidad de prueba, algo natural si aplica las tres leyes de
TDD, implica cierto nivel de conectividad, lo que ofrece la compatibilidad
necesaria para ejecutar código en distintas configuraciones.
La probabilidad de detectar errores mejora si se toma el tiempo necesario
para instrumentar su código. Puede hacerlo manualmente o mediante
tecnologías automatizadas. Hágalo en las fases iniciales. Es aconsejable
ejecutar el código basado en procesos durante el mayor tiempo posible antes
de pasarlo a producción.
Si adopta un enfoque limpio, aumentarán las probabilidades de hacerlo de
forma correcta.
Bibliografía
[Lea99]: Concurrent Programming in Java: Design Principles and
Patterns, 2d. ed., Doug Lea, Prentice Hall, 1999.
[PPP]: Agile Software Development: Principles, Patterns, and
Practices, Robert C. Martin, Prentice Hall, 2002.
[PRAG]: The Pragmatic Programmer, Andrew Hunt, Dave Thomas,
Addison-Wesley, 2000.
-- 254 of 644 --
Refinamiento sucesivo
Caso práctico de un analizador de argumentos de línea de comandos
Este capítulo es un caso práctico de refinamiento sucesivo. Veremos un
-- 255 of 644 --

módulo que comienza correctamente pero no mantiene dicha corrección. Tras
ello, veremos cómo se refactoriza y se limpia. Muchos hemos tenido que
analizar argumentos de línea de comando. Si no disponemos de una utilidad
para ello, recorremos la matriz de cadenas pasadas a la función principal.
Puede encontrar utilidades de calidad pero ninguna hace exactamente lo que
necesitamos. Por ello, decidí crear una propia, a la que he denominado Args.
Args es muy fácil de usar. Basta crearla con los argumentos de entrada y una
cadena de formato, y después consultar a la instancia de Args los valores de
los argumentos. Fíjese en el siguiente ejemplo:
Listado 14-1
Uso de Args
public static void main(String[] args) {
try {
Args arg = new Args(“l,p#,d*”, args);
boolean logging = arg.getBoolean(‘l’);
int port = arg.getInt(‘p’);
String directory = arg.getString(‘d’);
executeApplication(logging, port, directory);
} catch (ArgsException e) {
System.out.printf(“Argument error: %s\n”, e.errorMessage());
}
}
Comprobará lo sencillo que es. Creamos una instancia de la clase Args
con dos parámetros. El primero es la cadena de formato o esquema:
“l,p#,d*”. Define tres argumentos de línea de comandos. El primero, -l, es
un argumento booleano. El segundo, -p, es un argumento entero. El tercero, -
d, es un argumento de cadena. El segundo parámetro del constructor Args es
la matriz de argumentos de línea de comandos pasada a main. Si el
constructor no genera ArgsException, la línea de comandos entrante se ha
analizado y se puede consultar la instancia Args. Se usan métodos como
getBoolean, getInteger y getString para acceder a los valores de los
argumentos por sus nombres.
Si hay un problema, ya sea en la cadena de formato o en los argumentos
de línea de comandos, se genera ArgsException. La descripción del error se
-- 256 of 644 --

---

## [Sección 79] sección 6.8. Codificación de transferencia de contenidos Base64

puede recuperar del método errorMessage de la excepción.
Implementación de Args
El Listado 14-2 es la implementación de la clase Args. Examínela con
atención. El estilo y la estructura se han trabajado concienzudamente y espero
que los imite.
Listado 14-2
Args.java
package com.objectmentor.utilities.args;
import static com.objectmentor.utilities.args.ArgsException.ErrorCode.*;
import java.util.*;
public class Args {
private Map<Character, ArgumentMarshaler> marshalers;
private Set<Character> argsFound;
private ListIterator<String> currentArgument;
public Args(String schema, String[] args) throws ArgsException {
marshalers = new HashMap<Character, ArgumentMarshaler>();
argsFound = new HashSet<Character>();
parseSchema(schema);
parseArgumentStrings(Arrays.asList(args));
}
private void parseSchema(String schema) throws ArgsException {
for (String element : schema.split(“,”))
if (element.length() > 0)
parseSchemaElement(element.trim());
}
private void parseSchemaElement(String element) throws ArgsException {
char elementId = element.charAt(0);
String elementTail = element.substring(1);
validateSchemaElementId(element Id);
if (elementTail.length() == 0)
marshalers.put(elementId, new BooleanArgumentMarshaler());
else if (elementTail.equals(“*”))
marshalers.put(elementId, new StringArgumentMarshaler());
else if (elementTail.equals(“#”))
marshalers.put(elementId, new IntegerArgumentMarshaler());
else if (elementTail.equals(“##”))
marshalers.put(elementId, new DoubleArgumentMarshaler());
-- 257 of 644 --

else if (elementTail.equals(“[*]”))
marshalers.put(elementId, new StringArrayArgumentMarshaler());
else
throw new ArgsException(INVALID_ARGUMENT_FORMAT, elementId,
elementTail);
}
private void validateSchemaElementId(char elementId) throws ArgsException
{
if {!Character.isLetter(elementId))
throw new ArgsException(INVALID_ARGUMENT_NAME, elementId, null);
}
private void parseArgumentStrings(List<String> argsList) throws
ArgsException
{
for (currentArgument = argsList.listIterator();
currentArgument.hasNext();)
{
String argString = currentArgument.next();
if (argString.startsWith(“-”)) {
parseArgumentCharacters(argString.substring(1));
} else {
currentArgument.previous();
break;
}
}
}
private void parseArgumentCharacters(String argChars) throws ArgsException
{
for (int i = 0; i < argChars.length(); i++)
parseArgumentCharacter(argChars.charAt(i));
}
private void parseArgumentCharacter(char argChar) throws ArgsException {
ArgumentMarshaler m = marshalers.get(argChar);
if (m == null) {
throw new ArgsException (UNEXPECTED_ARGUMENT, argChar, null);
} else {
argsFound.add(argChar);
try {
m.set(currentArgument);
} catch (ArgsException e) {
e.setErrorArgumentId(argChar);
throw e;
}
}
}
public boolean has(char arg) {
return argsFound.contains(arg);
}
public int nextArgument() {
-- 258 of 644 --

return currentArgument.nextIndex();
}
public boolean getBoolean(char arg) {
return BooleanArgumentMarshaler.getValue(marshalers.get(arg));
}
public String getString(char arg) {
return StringArgumentMarshaler.getValue(marshalers.get(arg));
}
public int getInt(char arg) {
return IntegerArgumentMarshaler.getValue (marshalers.get(arg));
}
public double getDouble(char arg) {
return DoubleArgumentMarshaler.getValue(marshalers.get(arg));
}
public String[] getStringArray(char arg) {
return StringArrayArgumentMarshaler.getValue(marshalers.get(arg));
}
}
Puede leer el código de arriba a abajo sin necesidad de saltar de un punto
a otro ni buscar hacia adelante. Lo que seguramente busque es la definición
de ArgumentMarshaler, que hemos omitido intencionadamente. Tras leer el
código, comprenderá la interfaz ArgumentMarshaler y la función de sus
variantes. Veamos algunas de ellas (entre los listados 14-3 y 14-6).
Listado 14-3
ArgumentMarshaler.java
public interface ArgumentMarshaler {
void set(Iterator<String> currentArgument) throws ArgsException;
}
Listado 14-4
BooleanArgumentMarshaler.java
public class BooleanArgumentMarshaler implements ArgumentMarshaler {
private boolean booleanValue = false;
public void set (Iterator<String> currentArgument) throws ArgsException {
booleanValue = true;
}
public static boolean getValue(ArgumentMarshaler am) {
-- 259 of 644 --

---

## [Sección 80] sección 6.8. Codificación de transferencia de contenidos Base64

if (am != null && am instanceof BooleanArgumentMarshaler)
return ((BooleanArgumentMarshaler) am).booleanValue;
else
return false;
}
}
Listado 14-5
StringArgumentMarshaler.java
import static com.objectmentor.utilities.args.ArgsException.ErrorCode.*;
public class StringArgumentMarshaler implements ArgumentMarshaler {
private String stringValue = “”;
public void set(Iterator<String> currentArgument) throws ArgsException {
try {
stringValue = currentArgument.next();
} catch (NoSuchElementException e) {
throw new ArgsException(MISSING_STRING);
}
}
public static String getValue(ArgumentMarshaler am) {
if (am != null && am instanceof StringArgumentMarshaler)
return ((StringArgumentMarshaler) am).stringValue;
else
return “”;
}
}
Listado 14-6
IntegerArgumentMarshaler.java
import static com.objectmentor.utilities.args.ArgsException.ErrorCode.*;
public class IntegerArgumentMarshaler implements ArgumentMarshaler {
private int intValue = 0;
public void set(Iterator<String> currentArgument) throws ArgsException {
String parameter = null;
try {
parameter = currentArgument.next();
IntValue = Integer.parseInt(parameter);
} catch (NoSuchElementException e) {
throw new ArgsException(MISSING_INTEGER);
} catch (NumberFormatException e) {
throw new ArgsException(INVALID_INTEGER, parameter);
}
}
-- 260 of 644 --

public static int getValue (ArgumentMarshaler am) {
if (am != null && am instanceof IntegerArgumentMarshaler)
return ((IntegerArgumentMarshaler) am).intValue;
else
return 0;
}
}
Las otras variantes de ArgumentMarshaler simplemente repiten este
patrón en matrices double y String y sólo complicarían el capítulo. Puede
consultarlas como ejercicio. Otro fragmento que puede resultar complicado es
la definición de las constantes de código de error, incluidas en la clase
ArgsException (véase el Listado 14-7).
Listado 14-7
ArgsException.java
import static com.objectmentor.utilities.args.ArgsException.ErrorCode.*;
public class ArgsException extends Exception {
private char errorArgumentId = ‘\0’;
private String errorParameter = null;
private ErrorCode errorCode = OK;
public ArgsException() {}
public ArgsException(String message) { super(message); }
public ArgsException(ErrorCode errorCode) {
this.errorCode = errorCode;
}
public ArgsException(ErrorCode errorCode, String errorParameter) {
this.errorCode = errorCode;
this.errorParameter = errorParameter;
}
public ArgsException(ErrorCode errorCode,
char errorArgumentId, String errorParameter) {
this.errorCode = errorCode;
this.errorParameter = errorParameter;
this.errorArgumentId = errorArgumentId;
}
public char getErrorArgumentId() {
return errorArgumentId;
}
public void setErrorArgumentId(char errorArgumentId) {
this.errorArgumentId = errorArgumentId;
-- 261 of 644 --

}
public String getErrorParameter() {
return errorParameter;
}
public void setErrorParameter(String errorParameter) {
this.errorParameter = errorParameter;
}
public ErrorCode getErrorCode() {
return errorCode;
}
public void setErrorCode(ErrorCode errorCode) {
this.errorCode = errorCode;
}
public String errorMessage() {
switch (errorCode) {
case OK:
return “TILT: Should not get here.”;
case UNEXPECTED_ARGUMENT:
return String.format(“Argument -%c unexpected.”, errorArgumentId);
case MISSING_STRING:
return String.format(“Could not find string parameter for -%c.”,
errorArgumentId);
case INVALID INTEGER:
return String.format(“Argument -%c expects an integer but was ‘%s’.”,
errorArgumentId, errorParameter);
case MISSING_INTEGER:
return String.format(“Could not find integer parameter for -%c.”,
errorArgumentId);
case INVALID_DOUBLE:
return String.format(“Argument -%c expects a double but was ‘%s’.”,
errorArgumentId, errorParameter);
case MISSING_DOUBLE:
return String.format(“Could not find double parameter for -%c.”,
errorArgumentId);
case INVALID_ARGUMENT_NAME:
return String.format(“‘%c’ is not a valid argument name.”,
errorArgumentId);
case INVALID_ARGUMENT_FORMAT:
return String.format(“‘%s’ is not a valid argument format.”,
errorParameter);
}
return “”;
}
public enum ErrorCode {
OK, INVALID_ARGUMENT_FORMAT, UNEXPECTED_ARGUMENT, INVALID_ARGUMENT_NAME,
MISSING_STRING,
MISSING_INTEGER, INVALID_INTEGER,
MISSING_DOUBLE, INVALID_DOUBLE }
}
-- 262 of 644 --

---

## [Sección 81] sección 6.8. Codificación de transferencia de contenidos Base64

Es sorprendente la cantidad de código necesario para detallar este sencillo
concepto. Uno de los motivos es el uso de un lenguaje especialmente profuso.
Java, al ser un lenguaje de tipos estáticos, requiere muchas palabras para
satisfacer el sistema de tipos. En lenguajes como Ruby, Python o Smalltalk,
este programa es mucho más reducido[92].
Vuelva a leer el código. Fíjese especialmente en los nombres de los
elementos, el tamaño de las funciones y el formato. Si tiene experiencia como
programador, partes del estilo o la estructura no le convencerán, pero espero
que, desde un punto de vista global, considere que el programa está bien
escrito y tiene una estructura limpia.
Por ejemplo, debería ser evidente cómo añadir un nuevo tipo de
argumento, como una fecha o un número complejo, y que dicha inclusión
apenas requeriría código. En definitiva, bastaría con una nueva variante de
ArgumentMarshaler, una nueva función getXXX y una nueva instrucción case
en la función parseSchemaElement. También habría un nuevo código
ArgsException.ErrorCode y un nuevo mensaje de error.
Cómo se ha realizado
No diseñé este programa de principio a fin en su forma actual y, sobre todo,
no espero que pueda crear programas limpios y elegantes a la primera. Si
algo hemos aprendido en las dos últimas décadas es que la programación es
un arte más que una ciencia. Para escribir código limpio, primero debe crear
código imperfecto y después limpiarlo. No debería sorprenderle. Ya lo
aprendimos en el colegio cuando los profesores (normalmente en vano) nos
obligaban a crear borradores de nuestras redacciones. El proceso, nos decían,
era escribir un primer borrador, después otro, y después otros muchos hasta
lograr una versión definitiva. Para escribir redacciones limpias, el
refinamiento debía ser continuado.
Muchos programadores noveles (como sucede con los alumnos) no
siguen este consejo. Creen que el objetivo principal es que el programa
funcione. Una vez que lo consiguen, pasan a la siguiente tarea, y conservan el
estado funcional del programa, sea cual sea. Los programadores
-- 263 of 644 --

experimentados saben que esto es un suicidio profesional.
Args: El primer borrador
El Listado 14-8 muestra una versión inicial de la clase Args. Funciona, pero
es un desastre.
Listado 14-8
Args.java (primer borrador)
import java.text.ParseException;
import java.util.*;
public class Args {
private String schema;
private String[] args;
private boolean valid = true;
private Set<Character> unexpectedArguments = new TreeSet<Character>();
private Map<Character, Boolean> booleanArgs =
new HashMap<Character, Boolean>();
private Map<Character, String> stringArgs =
new HashMap<Character, String>();
private Map<Character, Integer> intArgs =
new HashMap<Character, Integer>();
private Set<Character> argsFound = new HashSet<Character>();
private int currentArgument;
private char errorArgumentId = ‘\0’;
private String errorParameter = “TILT”;
private ErrorCode errorCode = ErrorCode.OK;
private enum ErrorCode {
OK, MISSING_STRING, MISSING_INTEGER, INVALID_INTEGER,
UNEXPECTED_ARGUMENT}
public Args(String schema. String[] args) throws ParseException {
this.schema = schema;
this.args = args;
valid = parse();
}
private boolean parse() throws ParseException {
if (schema.length() == 0 && args.length == 0)
return true;
parseSchema();
try {
parseArguments();
} catch (ArgsException e) {
-- 264 of 644 --

}
return valid;
}
private boolean parseSchema() throws ParseException {
for (String element : schema.split(“,”)) {
if (element.length() > 0) {
String trimmedElement = element.trim();
parseSchemaElement(trimmedElement);
}
}
return true;
}
private void parseSchemaElement(String element) throws ParseException {
char elementId = element.charAt(0);
String elemenTail = element.substring(1);
validateSchemaElementId(elementId);
if (isBooleanSchemaElement(elementTail));
parseBooleanSchemaElement(elementId);
else if (isStringSchemaElement(elementTail))
parseStringSchemaElement(elementId);
else if (isIntegerSchemaElement(elementTail)) {
parseIntegerSchemaElement(elementId);
} else {
throw new ParseException(
String.format(“Argument: %c has invalid format: %s.”,
elementId, elementTail), 0);
}
}
private void validateSchemaElementId(char elementId) throws ParseException
{
if (!Character.isLetter(elementId)) {
throw new ParseException(
“Bad character:” + elementId + “in Args format: ” + schema, 0);
}
}
private void parseBooleanSchemaElement(char elementId) {
booleanArgs.put(elementId, false);
}
private void parseIntegerSchemaElement(char elementId) {
intArgs.put(elementId, 0);
}
private void parseStringSchemaElement(char elementId) {
stringArgs.put(elementId, “”);
}
private boolean isStringSchemaElement(String elementTail) {
return elementTail.equals(“*”);
}
-- 265 of 644 --

---

## [Sección 82] sección 6.8. Codificación de transferencia de contenidos Base64

private boolean isBooleanSchemaElement(String elementTail) {
return elementTail.length() == 0;
}
private boolean isIntegerSchemaElement(String elementTail) {
return elementTail.equals(“#”);
}
private boolean parseArguments() throws ArgsException {
for (currentArgument = 0; currentArgument < args.length;
currentArgument++)
{
String arg = args[currentArgument];
parseArgument(arg);
}
return true;
}
private void parseArgument(String arg) throws ArgsException {
if (arg.startsWith(“-”))
parseElements(arg);
}
private void parseElements(String arg) throws ArgsException {
for (int i = 1; i < arg.length(); i++)
parseElement(arg.charAt(i));
}
private void parseElement(char argChar) throws ArgsException {
if (setArgument(argChar))
argsFound.add(argChar);
else {
unexpectedArguments.add(argChar);
errorCode = ErrorCode.UNEXPECTED_ARGUMENT;
valid = false;
}
}
private boolean setArgument(char argChar) throws ArgsException {
if (isBooleanArg(argChar))
setBooleanArg(argChar, true);
else if (isStringArg(argChar))
setStringArg(argChar);
else if (isIntArg(argChar))
setIntArg(argChar);
else
return false;
return true;
}
private boolean isIntArg(char argChar) {
return intArgs.containsKey(argChar);
}
-- 266 of 644 --

private void setIntArg(char argChar) throws ArgsException {
currentArgument++;
String parameter = null;
try {
parameter = args[currentArgument];
intArgs.put(argChar, new Integer(parameter));
} catch (ArrayIndexOutOfBoundsException e) {
valid = false;
errorArgumentId = argChar;
errorCode = ErrorCode.MISSING_INTEGER;
throw new ArgsException();
} catch (NumberFormatException e) {
valid = false;
errorArgumentId = argChar;
errorParameter = parameter;
errorCode = ErrorCode.INVALID_INTEGER;
throw new ArgsException();
}
}
private void setStringArg(char argChar) throws ArgsException {
currentArgument++;
try {
stringArgs.put(argChar, args[currentArgument]);
} catch (ArrayIndexOutOfBoundsException e) {
valid = false;
errorArgumentId = argChar;
errorCode = ErrorCode.MISSING_STRING;
throw new ArgsException();
}
}
private boolean isStringArg(char argChar) {
return stringArgs.containsKey(argChar);
}
private void setBooleanArg(char argChar, boolean value) {
booleanArgs.put(argChar, value);
}
private boolean isBooleanArg(char argChar) {
return booleanArgs.containsKey(argChar);
}
public int cardinality() {
return argsFound.size();
}
public String usage() {
if (schema.length() > 0)
return "-[" + schema + “]”;
else
return “”;
}
-- 267 of 644 --

public String errorMessage() throws Exception {
switch (errorCode) {
case OK:
throw new Exception(“TILT: Should not get here.”);
case UNEXPECTED_ARGUMENT:
return unexpectedArgumentMessage();
case MISSING_STRING:
return String.format(“Could not find string parameter for -%c.”,
errorArgumentId);
case INVALID_INTEGER:
return String.format(“Argument - %c expects an integer but was
‘%s’.”,
errorArgumentId, errorParameter);
case MISSING_INTEGER:
return String.format(“Could not find integer parameter for -%c.”,
errorArgumentId);
}
return “”;
}
private String unexpectedArgumentMessage() {
StringBuffer message = new StringBuffer(“Arguments(s) -”);
for (char c : unexpectedArguments) {
message.append(c);
}
message.append(“ unexpected.”);
return message.toString();
}
private boolean falseIfNull(Boolean b) {
return b != null && b;
}
private int zeroIfNull(Integer i) {
return i == null ? 0 : i;
}
private String blankIfNull(String s) {
return s = null ? “” : s;
}
public String getString(char arg) {
return blankIfNull(stringArgs.get(arg));
}
public int getInt(char arg) {
return zeroIfNull(intArgs.get(arg));
}
public boolean getBoolean(char arg) {
return falseIfNull(booleanArgs.get(arg));
}
public boolean has(char arg) (
-- 268 of 644 --

return argsFound.contains(arg);
}
public boolean isValid() {
return valid;
}
private class ArgsException extends Exception {
}
}
Espero que su reacción inicial ante tal cantidad de código es alegrarse por
no haberlo conservado tal cual. Si ha sido su reacción, recuerde que será la
que tengan otros que lean un borrador de su código.
En realidad, primer borrador es lo mejor que se puede decir sobre este
código. Evidentemente es un trabajo en progreso. La cantidad de variables de
instancia es apabullante. Cadenas extrañas como «TILT», HashSet y TreeSet,
y los bloques try-catch-catch aumentan el desastre.
No era mi intención crear este desastre. En realidad, intentaba mantener
cierta organización, como demuestra la elección de nombres de funciones y
variables, y la estructura del programa. Pero es evidente que el problema se
me fue de las manos.
El desastre aumentó gradualmente. Las versiones anteriores no fueron tan
malas. Por ejemplo, el Listado 14-9 muestra una versión inicial en la que sólo
funcionaban los argumentos booleanos.
Listado 14-9
Args.java (sólo argumentos booleanos)
package com.objectmentor.utilities.getopts;
import java.util.*;
public class Args {
private String schema;
private String[] args;
private boolean valid;
private Set<Character> unexpectedArguments = new TreeSet<Character>();
private Map<Character, Boolean> booleanArgs =
new HashMap<Character, Boolean>();
private int numberOfArguments = 0;
public Args(String schema, String[] args) {
this.schema = schema;
this.args = args;
-- 269 of 644 --

---

## [Sección 83] sección 6.8. Codificación de transferencia de contenidos Base64

valid = parse();
}
public boolean isValid() {
return valid;
}
private boolean parse() {
if (schema.length() == 0 && args.length == 0)
return true;
parseSchema();
parseArguments();
return unexpectedArguments.size() == 0;
}
private boolean parseSchema() {
for (String element : schema.split(“,”)) {
parseSchemaElement(element);
}
return true;
}
private void parseSchemaElement(String element) {
if (element.length() == 1) {
parseBooleanSchemaElement(element);
}
}
private void parseBooleanSchemaElement(String element) {
char c = element.charAt(0);
if (Character.isLetter(c)) {
booleanArgs.put(c, false);
}
}
private boolean parseArguments() {
for (String arg : args)
parseArgument(arg);
return true;
}
private void parseArgument(String arg) {
if (arg.startsWith(“-”))
parseElement(arg);
}
private void parseElements(String arg) {
for (int i = 1; i < arg.length(); i++)
parseElement(arg.charAt(i));
}
private void parseElement(char argChar) {
if (isBoolean(argChar)) {
numberOfArguments++;
setBooleanArg(argChar, true);
-- 270 of 644 --

} else
unexpectedArguments.add(argChar);
}
private void setBooleanArg(char argChar, boolean value) {
booleanArgs.put(argChar, value);
}
private boolean isBoolean(char argChar) {
return booleanArgs.containsKey(argChar);
}
public int cardinality() {
return numberOfArguments;
}
public String usage() {
if (schema.length() > 0)
return “-[”+schema+“]”;
else
return “”;
}
public String errorMessage() {
if (unexpectedArguments.size() > 0) {
return unexpectedArgumentMessage();
} else
return “”;
}
private String unexpectedArgumentMessage() {
StringBuffer message = new StringBuffer(“Argument(s) -”);
for (char c : unexpectedArguments) {
message.append(c);
}
message.append(“ unexpected.”);
return message.toString();
}
public boolean getBoolean(char arg) {
return booleanArgs.get(arg);
}
}
Aunque hay motivos para quejarse del código, no es tan malo. Es
compacto y sencillo, y fácil de entender. Sin embargo, en este código se
aprecia la semilla del desastre posterior y resulta evidente porqué.
La versión posterior sólo tiene dos tipos de argumentos más que ésta:
String e integer. La inclusión de sólo dos tipos más tiene un tremendo
impacto negativo en el código. Lo convierte de algo que sería razonablemente
-- 271 of 644 --

mantenible en algo que seguramente esté plagado de errores.
Añadí los dos tipos de argumento de forma incremental. Primero, el
argumento String, que genera lo siguiente:
Listado 14-10
Args.java (booleano y String)
package com.objectmentor.utilities.getopts;
import java.text.ParseException;
import java.util.*;
public class Args {
private String schema;
private String[] args;
private boolean valid = true;
private Set<Character> unexpectedArguments = new TreeSet<Character>();
private Map<Character, Boolean> booleanArgs =
new HashMap<Character, Boolean>();
private Map<Character, String> stringArgs =
new HashMap<Character, String>();
private Set<Character> argsFound = new HashSet<Character>();
private int currentArgument;
private char errorArgument = ‘\0’;
enum ErrorCode { OK, MISSING_STRING }
private ErrorCode errorCode = ErrorCode.OK;
public Args(String schema, String[] args) throws ParseException {
this.schema = schema;
this.args = args;
valid = parse();
}
private boolean parse() throws ParseException {
if (schema.length() == 0 && args.length == 0)
return true;
parseSchema();
parseArguments();
return valid;
}
private boolean parseSchema() throws ParseException {
for (String element : schema.split(“,”)) {
if (element.length() > 0) {
String trimmedElement = element.trim();
parseSchemaElement(trimmedElement);
}
}
return true;
-- 272 of 644 --

}
private void parseSchemaElement(String element) throws ParseException {
char elementId = element.charAt(0);
String elementTail = element.substring(1);
validateSchemaElementId(elementId);
if (isBooleanSchemaElement(elementTail))
parseBooleanSchemaElement(elementId);
else if (isStringSchemaElement(elementTail))
parseStringSchemaElement(elementId);
}
private void validateSchemaElementId(char elementId) throws ParseException
{
if (!Character.isLetter(elementId)) {
throw new ParseException(
“Bad character:” + elementId + “in Args format: ” + schema, 0);
}
}
private void parseStringSchemaElement(char elementId) {
stringArgs.put(elementId, “”);
}
private boolean isStringSchemaElement(String elementTail) {
return elementTail.equals(“*”);
}
private boolean isBooleanSchemaElement(String elementTail) {
return elementTail.length() == 0;
}
private void parseBooleanSchemaElement(char elementId) {
booleanArgs.put(elementId, false);
}
private boolean parseArguments() {
for (currentArgument = 0; currentArgument < args.length;
currentArgument++)
{
String arg = args[currentArgument];
parseArgument(arg);
}
return true;
}
private void parseArgument(String arg) {
if (arg.startsWith(“-”))
parseElements(arg);
}
private void parseElements(String arg) {
for (int i = 1; i < arg.length(); i++)
parseElement(arg.charAt(i));
}
-- 273 of 644 --

---

## [Sección 84] sección 6.8. Codificación de transferencia de contenidos Base64

private void parseElement(char argChar) {
if (setArgument(argChar))
argsFound.add(argChar);
else {
unexpectedArguments.add(argChar);
valid = false;
}
}
private boolean setArgument(char argChar) {
boolean set = true;
if (isBoolean(argChar))
setBooleanArg(argChar, true);
else if (isString(argChar))
setStringArg (argChar, “”);
else
set = false;
return set;
}
private void setStringArg(char argChar, String s) {
currentArgument++;
try {
stringArgs.put(argChar, args[currentArgument]);
} catch (ArrayIndexOutOfBoundsException e) {
valid = false;
errorArgument = argChar;
errorCode = ErrorCode.MISSING_STRING;
}
}
private boolean isString(char argChar) {
return stringArgs.containsKey(argChar);
}
private void setBooleanArg(char argChar, boolean value) {
booleanArgs.put(argChar, value);
}
private boolean isBoolean(char argChar) {
return booleanArgs.containsKey(argChar);
}
public int cardinality() {
return argsFound.size();
}
public String usage() {
if (schema.length() > 0)
return “-[” + schema + “]”;
else
return “”;
}
-- 274 of 644 --

public String errorMessage() throws Exception {
if (unexpectedArguments.size() > 0) {
return unexpectedArgumentMessage();
} else
switch (errorCode) {
case MISSING_STRING:
return String.format (“Could not find string parameter for -%c.”,
errorArgument);
case OK:
throw new Exception(“TILT: Should not get here.”);
}
return “”;
}
private String unexpectedArgumentMessage() {
StringBuffer message = new StringBuffer(“Argument(s) -”);
for (char c : unexpectedArguments) {
message.append(c);
}
message.append(“ unexpected.”);
return message.toString();
}
public boolean getBoolean(char arg) {
return falseIfNull(booleanArgs.get(arg));
}
private boolean falseIfNull(Boolean b) {
return b == null ? false : b;
}
public String getString(char arg) {
return blankIfNull(stringArgs.get(arg));
}
private String blankIfNull(String s) {
return s == null ? “” : s;
}
public boolean has(char arg) {
return argsFound.contains(arg);
}
public boolean isValid() {
return valid;
}
}
Comprobará que empieza a desbocarse. No es terrible pero el desastre se
está gestando. Basta con incluir el tipo de argumento integer para que
resulte fatídico.
-- 275 of 644 --

Entonces me detuve
Todavía tenía que añadir otros dos tipos de argumentos y sabía que
empeorarían las cosas. Si los forzaba, seguramente funcionarían pero
provocaría un desastre demasiado complicado de arreglar. Si la estructura del
código tenía que poder mantenerse, era el momento de corregirla.
Por ello dejé de añadir elementos y comencé la refactorización. Tras
añadir los argumentos String e integer, sabía que cada uno necesitaría
nuevo código en tres puntos principales. En primer lugar, cada tipo de
argumento necesita una forma de analizar su elemento de esquema para poder
seleccionar el HashMap de ese tipo. Tras ello, sería necesario analizar cada
tipo de argumento en las cadenas de línea de comandos y convertirlos en su
tipo correcto. Por último, cada tipo de argumento necesitaría un método
getXXX para poder devolverlo al invocador como su tipo correcto.
Muchos tipos diferentes y todos con métodos similares, lo que en realidad
era una clase. Y de este modo nació el concepto de ArgumentMarshaler.
Sobre el incrementalismo
Una de las mejores formas de acabar con un programa es realizar cambios
masivos con la intención de mejorarlo. Algunos programas nunca se
recuperan de estas mejoras. El problema es lo complicado que resulta
conseguir que el programa funcione de la misma forma que antes de la
mejora.
Para evitarlo, recurro a la disciplina TDD (Test-Driven Development o
Desarrollo guiado por pruebas). Una de las doctrinas centrales de este
enfoque es mantener la ejecución del sistema en todo momento. Es decir, con
TDD no puedo realizar cambios que afecten al funcionamiento del sistema.
Todos los cambios deben mantenerlo como antes de los cambios. Para
lograrlo, necesito una serie de pruebas automatizadas que ejecutar
rápidamente y que verifiquen que el comportamiento del sistema no ha
variado. Para la clase Args, creé una serie de pruebas de unidad y aceptación.
Las pruebas de unidad se crearon en Java y se administraron con JUnit. Las
-- 276 of 644 --

---

## [Sección 85] sección 6.8. Codificación de transferencia de contenidos Base64

pruebas de aceptación se crearon como páginas wiki en FitNesse. Podría
haber ejecutado estas pruebas en cualquier momento y, si eran satisfactorias,
sabría que el sistema funcionaba de la forma especificada.
Así pues, comencé a realizar pequeños cambios. Cada uno desplazaba la
estructura del sistema hacia el concepto ArgumentMarshaler, y cada cambio
mantenía el funcionamiento del sistema. El primer cambio realizado fue
añadir el esqueleto de ArgumentMarshaller al final del desastre anterior
(véase el Listado 14-11).
Listado 14-11
ArgumentMarshaller añadido a Args.java
private class ArgumentMarshaler {
private boolean booleanValue = false;
public void setBoolean(boolean value) {
booleanValue = value;
}
public boolean getBoolean() { return booleanValue; }
private class BooleanArgumentMarshaler extends ArgumentMarshaler {
}
private class StringArgumentMarshaler extends ArgumentMarshaler {
}
private class IntegerArgumentMarshaler extends ArgumentMarshaler {
}
}
Evidentemente, esto no afectaría a nada, por lo que realicé la
modificación más sencilla posible que afectara a la mínima cantidad de
código. Cambié HashMap para que los argumentos Boolean aceptaran
ArgumentMarshaler.
private Map<Character, ArgumentMarshaler> booleanArgs =
new HashMap<Character, ArgumentMarshaler>();
Esto afectaba a varias instrucciones que corregí rápidamente.
…
private void parseBooleanSchemaElement(char elementId) {
booleanArgs.put(elementId, new BooleanArgumentMarshaler());
}
…
-- 277 of 644 --

private void setBooleanArg(char argChar, boolean value) {
booleanArgs.get(argChar).setBoolean(value);
}
…
public boolean getBoolean(char arg) {
return falseIfNull (booleanArgs.get(arg).getBoolean());
}
Estos cambios se aplican a las zonas que mencionamos antes: parse, set
y get para el tipo de argumento. Desafortunadamente, aunque sean cambios
menores, algunas de las pruebas comenzaron a fallar. Si se fija atentamente
en getBoolean, comprobará que se puede invocar con y pero no existe un
argumento y, por lo que booleanArgs.get(‘y’) devolverá null y la función
generará NullPointerException. La función falseIfNull se usa como
protección ante este hecho pero el cambio aplicado hace que la función sea
irrelevante.
El incrementalismo exigía que esto funcionara antes de realizar otros
cambios. La solución no era demasiado complicada; bastaba con cambiar la
comprobación de null. Ya no era necesario comprobar null en boolean, sino
en ArgumentMarshaller.
Primero, eliminé la invocación de falseIfNull en la función
getBoolean. Ya no servía de nada, por lo que eliminé directamente la
función. Las pruebas seguían fallando igual, lo que suponía que no había
nuevos errores.
public boolean getBoolean(char arg) {
return booleanArgs.get(arg).getBoolean();
}
Tras ello, dividí la función en dos líneas y añadí ArgumentMarshaller a
una variable propia: argumentMarshaller. No me preocupaba el extenso
nombre de la variable; era redundante y estorbaba a la función, por lo que lo
reduje a am [N5].
public boolean getBoolean(char arg) {
Args.ArgumentMarshaler am = booleanArgs.get(arg);
return am.getBoolean();
}
Y tras ello añadí la lógica de detección de null.
public boolean getBoolean(char arg) {
Args.ArgumentMarshaler am = booleanArgs.get(arg);
-- 278 of 644 --

return am != null && am.getBoolean();
}
Argumentos de cadena
La inclusión de los argumentos String fue similar a la de los argumentos
boolean. Tuve que cambiar HashMap y conseguir que funcionaran parse, set
y get. No deberían producirse sorpresas posteriores a excepción de que la
implementación completa se incluía en la clase ArgumentMarshaller en lugar
de distribuirla en variantes.
private Map<Character, ArgumentMarshaler> stringArgs =
new HashMap<Character, ArgumentMarshaler>();
…
private void parseStringSchemaElement(char elementId) {
stringArgs.put(elementId, new StringArgumentMarshaler());
}
…
private void setStringArg(char argChar) throws ArgsException {
currentArgument++;
try {
stringArgs.get(argChar).setString(args[currentArgument]);
} catch (ArrayIndexOutOfBoundsException e) {
valid = false;
errorArgumentId = argChar;
errorCode = ErrorCode.MISSING_STRING;
throw new ArgsException();
}
}
…
public String getString (char arg) {
Args.ArgumentMarshaler am = stringArgs.get(arg);
return am == null ? “” : am.getString();
}
…
private class ArgumentMarshaler {
private boolean booleanValue = false;
private String stringValue;
public void setBoolean(boolean value) {
booleanValue = value;
}
public boolean getBoolean() {
return booleanValue;
}
public void setString(String s) {
-- 279 of 644 --

---

## [Sección 86] sección 6.8. Codificación de transferencia de contenidos Base64

stringValue = s;
}
public String getString() {
return stringValue == null ? “” : stringValue;
}
}
De nuevo, estos cambios se realizaron individualmente para conservar las
pruebas, aunque fallaran. Si una prueba fallaba, me aseguraba de que fuera
correcta antes de continuar con el siguiente cambio.
Ya debería reconocer mi intención. Tras incluir el comportamiento de
señalización en la clase base ArgumentMarshaler, comencé a transferirlo a
las variantes, para de esta forma mantener el funcionamiento mientras
cambiaba gradualmente la forma del programa.
El siguiente paso consistía en transferir la funcionalidad del argumento
int a ArgumentMarshaler. De nuevo, no hubo sorpresas.
private Map<Character, ArgumentMarshaler> intArgs =
new HashMap<Character, ArgumentMarshaler>();
…
private void parseIntegerSchemaElement(char elementId) {
intArgs.put(elementId, new IntegerArgumentMarshaler());
}
…
private void setIntArg(char argChar) throws ArgsException {
currentArgume

---
> *[Truncated at 420 KB for optimal local RAG indexing speed]*
