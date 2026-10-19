> **Alcance:** Literatura canónica de diseño UI/UX, sistemas de diseño, psicología cognitiva, economía conductual, gamificación y conversión (CRO) para la Software Factory Web y DiggityBets.

---
version: 1.0.0
tipo: research
tags:
  - yendo-mobile
  - architecture
  - en-progreso
autores: [RESEARCHER_AGENT, MANAGER_AGENT]
ultima_revision: 2026-08-27
---

# 🌐 Tratado Canónico: Platform Revolution & Platform Scale
### Basado en: *Platform Revolution* (Parker, Van Alstyne, Choudary) & *Platform Scale* (Sangeet Paul Choudary)
**Autores:** Geoffrey G. Parker, Marshall W. Van Alstyne & Sangeet Paul Choudary
**Archivos Fuente:** `unsorted/Platfrom_revolution.pdf` (284 páginas) y `unsorted/dokumen.pub_platform-scale-how-an-emerging-business-model-helps-startups-build-large-empires-with-minimum-investment-9789810967581-9810967586.epub` (155 capítulos/secciones)

---

## 1. La Transición Paradigmática: De Negocios Lineales (Pipelines) a Plataformas

Un negocio tradicional es un **Pipeline**: crea valor de forma lineal paso a paso (materia prima → manufactura → distribución → venta al consumidor). 
Una **Plataforma** no posee el inventario ni produce el contenido; es una infraestructura conectiva y gobernada que orquesta el intercambio de valor entre dos o más lados independientes (**Productores** y **Consumidores**).

> **"En una plataforma, los activos clave son la información y las interacciones, no las fábricas ni el inventario físico."**
> — Geoffrey Parker & Marshall Van Alstyne

En el mercado del ocio nocturno y cultural:
- **Ticketeras Tradicionales (Pipelines):** Compran derechos exclusivos de venta, montan un sitio web lento, cobran comisiones abusivas y tratan cada evento como un producto cerrado.
- **Yendo (Plataforma Multisitio):** Orquesta interacciones en tiempo real entre organizadores de eventos/venues y squads de usuarios que buscan experiencias sociales espontáneas o planificadas.

---

## 2. La Unidad Central de Interacción (The Core Interaction)

Toda plataforma escalable debe reducir su propuesta de valor a una **Interacción Central** compuesta por cuatro elementos indispensables:

```
┌─────────────────────────────────────────────────────────────┐
│                      THE CORE INTERACTION                   │
│                                                             │
│   ┌───────────────┐     Unidad de Valor     ┌───────────┐   │
│   │   Productor   ├────────────────────────►│ Consumidor│   │
│   │ (Venue / Host)│                         │ (Clubber) │   │
│   └───────▲───────┘                         └─────▲─────┘   │
│           │                                       │         │
│           └───────────────────┬───────────────────┘         │
│                               ▼                             │
│                      ┌─────────────────┐                    │
│                      │ Filtro / Motor  │                    │
│                      │ de Curación AI  │                    │
│                      └─────────────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

1. **Participantes:** 
   - **Productor:** Dueño del bar, boliche, organizador de fiesta o centro cultural independiente en CABA.
   - **Consumidor:** Grupo de amigos / Squad que busca salir esta noche.
2. **Unidad de Valor (Value Unit):** La propuesta del evento enriquecida con metadatos en tiempo real (aforo restante, música, género, beneficios por quórum, geolocalización precisa).
3. **Filtro (Filter):** El algoritmo de recomendación semántica georreferenciado (<150m, afinidad musical, hora de llegada, amigos que asisten).
4. **Intercambio:** Transacción de compromiso mutuo (reserva o check-in presencial validado biométricamente en el hardware).

---

## 3. Dinámica de Efectos de Red (Network Effects)

1. **Efectos de Red Directos (Same-side):**
   - Más amigos de un usuario en Yendo → mayor valor del grafo social, mayor facilidad de quórum.
2. **Efectos de Red Cruzados (Cross-side):**
   - Más venues verificados en CABA → mayor atractivo para los usuarios.
   - Más usuarios activos en una zona (ej: Palermo Soho a la medianoche) → mayor incentivo para que los bares carguen ofertas de última hora para llenar mesas.
3. **Congestión y Externalidades Negativas:**
   - Si un venue se satura de mala calidad o spam, se produce churn masivo de usuarios. El rol de Yendo como curador es actuar como **Guardián de Calidad (Quality Governance)** mediante filtros determinísticos y reputación verificada.

---

## 4. Resolución del Dilema del Huevo y la Gallina (Chicken & Egg Problem)

Choudary y Parker especifican que para arrancar una plataforma de dos lados en un mercado urbano, **nunca se debe intentar abarcar toda la ciudad de golpe**.
- **Estrategia del Micro-Mercado Hiper-Líquido:** Conquistar un solo radio geográfico de 15 manzanas (ej: Corredor Plaza Serrano o San Telmo Colonial) hasta lograr **Liquidez del 80%** (8 de cada 10 usuarios encuentran un plan perfecto en menos de 3 minutos).
- **Subsidio de la Oferta:** En la fase inicial, se subsidia y facilita el onboarding del lado más difícil de captar (los venues de calidad), ofreciéndoles el software de gestión de aforo y analytics de clientes gratis sin comisión.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[B2B_GTM_STRATEGY]]
- [[Modelo_Economico_Redireccion_Arbitraje_B2B]]
- [[TICKETING_PARTNERSHIP_SOCIAL_LAYER_THESIS]]
