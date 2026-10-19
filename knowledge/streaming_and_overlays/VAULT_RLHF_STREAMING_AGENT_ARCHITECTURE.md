# Arquitectura Agéntica para Live Streaming: Estado del Arte, RLHF y Percepción Multimodal


**Alcance:** Aprendizaje por refuerzo y bucles de retroalimentación en vivo para sistemas de streaming. (Fuente migrada y curada desde Centinela Studio Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

Este documento resume la investigación profunda sobre las mejores tecnologías, arquitecturas y estrategias para bots conversacionales autónomos en plataformas de live streaming (Kick/Twitch), enfocados en el aprendizaje por imitación, RLHF y comprensión multimodal omnidireccional.

## 1. El Paradigma "Omni-Modal" y Full-Duplex (SOTA)

La investigación de vanguardia (modelos como MiniCPM-o, OmniLMM o Gemini 2.0) está alejando a los agentes del modelo clásico de "turnos" (escuchar -> procesar -> responder) hacia arquitecturas **Full-Duplex**.

*   **Omni-Flow & Time-Division Multiplexing (TDM):** Los agentes más avanzados consumen streams concurrentes de video y audio fraccionados en "info groups" temporales. El LLM mantiene un estado temporal compartido, lo que le permite entender el contexto sin bloquearse.
*   **Comportamiento Proactivo vs Reactivo:** En streaming, el agente no debe esperar a ser "prompteado". Evalúa el estado del stream (qué ocurre en pantalla, el nivel de hype en audio, la velocidad del chat) y de forma proactiva decide intervenir (ej. comentar una jugada, unirse al spam de un emote, alertar sobre un bono).
*   **Viabilidad Actual:** Para el ecosistema Centinela, procesar frames a intervalos regulares (ej. cada 1s) mediante VLM y aplicar un gating de silencio de voz (Silero VAD + Whisper) emula este "Omni-Flow" usando herramientas off-the-shelf probadas y altamente costo-eficientes, permitiendo multiplexar el sentido visual y acústico antes de pasarlo al Hilo Sociable.

## 2. Aprendizaje por Imitación (Imitation Learning) en Live Streaming

Los streams acumulan miles de horas de trayectorias humanas perfectas. La estrategia ideal para un bot que se quiere "mimetizar" no es inyectarle un gran prompt de reglas, sino usar **Imitation Learning**.

*   **Clone de Trayectorias de Chat:** Consiste en recolectar qué dijo el usuario (o la masa) dado un contexto `C` (estado del juego + audio del streamer + chat reciente). 
*   **Shadow Mode (Fase de Aprendizaje):** Un enfoque altamente recomendado en la literatura es mantener al agente escuchando y "prediciendo" lo que diría el streamer/espectador objetivo. Se comparan las predicciones del bot con los mensajes reales del usuario. Si hay alta divergencia, el agente ajusta sus heurísticas.
*   **Implementación en Centinela:** El `demonstrationHarvester.recordIncomingMessage` que captura `visualState`, `acousticState` y `chatWindow` cada vez que el usuario toma el teclado manualmente es la implementación perfecta de este paradigma. Crea un Dataset de Imitación de alta calidad.

## 3. RLHF (Reinforcement Learning from Human Feedback) en Tiempo Real

El RLHF clásico asume la recopilación offline de preferencias. En Live Streaming, el entorno es no-estacionario y ruidoso, requiriendo **Online/Iterative RLHF**.

### Componentes de una Arquitectura RLHF para Chatbots:
1.  **Capa de Recolección de Feedback:**
    *   *Feedback Explícito:* Aprobaciones de moderadores, confirmación verbal del streamer (ej. "¡Buena esa Tarkansky!").
    *   *Feedback Implícito:* Supervivencia del mensaje (no fue borrado/timeouteado), reacciones positivas del chat circundante (emotes de risa o hype que siguen al mensaje del bot).
2.  **Reward Shaping (Modelado de Recompensa):**
    *   Las recompensas en streaming son dispersas. Se deben diseñar recompensas densas: un punto por usar la jerga correcta, un punto si la longitud es menor a 5 palabras, castigo extremo por alucinar o sugerir slots sin confirmación.
3.  **Frameworks Open Source:** Herramientas como `OpenRLHF` facilitan afinar modelos en base a estas preferencias. Sin embargo, para agentes basados en prompts y RAG (sin entrenamiento de pesos), el RLHF se aplica actualizando los "Instintos" (Continuous Learning Engine). El bot recibe el castigo, ajusta su prompt dinámico o su `cognitiveRules.json` y no vuelve a cometer el error.

## 4. Riesgos, Ética y Platform Policy

*   **Mimetización Robótica (Botting):** Las plataformas penalizan la automatización orientada a la inflación de estadísticas o la interacción inauténtica. El bot **debe** operar bajo el usuario y emular el comportamiento humano real.
*   **Alignment Tax:** Enseñar al bot a ser hiper-precavido (como el fallo de sugerir slots aleatoriamente) a través de reglas estrictas puede degradar su capacidad de ser "divertido". El balance (Trade-off) se logra con **Contextual Chatter**, donde se le da libertad en conversaciones banales, pero requiere **HITL (Human-In-The-Loop) estricto** para decisiones críticas (dinero/sugerencias).

## 5. Recomendaciones de Implementación Estratégica (Acciones Clave)

1.  **Mantener el "Shadow Mode" Activo:** La recolección pasiva con `demonstration-harvester` construirá la base de conocimiento perfecta sobre CÓMO te expresas en situaciones específicas.
2.  **Integrar Múltiples Sentidos en el Bucle de Recompensa:** Validar si un comentario es bueno no solo si nadie responde, sino si el audio del streamer refleja la misma emoción.
3.  **Memoria Continua (Instincts):** Integrar un motor de heurísticas operacionales que se actualice cada vez que corriges al bot (ej. cuando se equivoca y lo silencias con el MUTEX).
4.  **Confirmación Multimodal:** Para las sugerencias de call de slots, NUNCA confiar en un solo sentido. Exigir que el VLM confirme que se está eligiendo slot O que el audio confirme "qué jugamos", sumado al chat de los moderadores.

## Conclusión
La arquitectura actual de Centinela (con enrutamiento Top9, Harvester de demostraciones y separación de Hilos) se alinea sorprendentemente bien con los patrones SOTA (State Of The Art) de agentes multimodales y aprendizaje offline (Behavioral Cloning). El periodo de Shadow Mode que has decretado es estadísticamente y operativamente la decisión más sensata antes de liberar un agente estocástico en un entorno en vivo.
