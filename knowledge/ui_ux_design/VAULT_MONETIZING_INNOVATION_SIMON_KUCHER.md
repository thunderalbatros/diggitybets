**Alcance:** Síntesis de Monetizing Innovation (Madhavan Ramanujam): diseño de paquetes de valor, segmentación por niveles (Tiers) y disposición a pagar. (Fuente migrada y curada desde Yendo Mobile Vault para la Software Factory Web y DiggityBets. NO sustituye las reglas de negocio locales ni los contratos primarios en `CANON_*`).

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

# 💎 Tratado Canónico: Monetizing Innovation (Simon-Kucher & Partners)
### Basado en: *Monetizing Innovation: How Smart Companies Design the Product Around the Price*
**Autores:** Madhavan Ramanujam & Georg Tacke (Simon-Kucher & Partners)
**Archivo Fuente:** `unsorted/dokumen.pub_monetizing-innovation-how-smart-companies-design-the-product-around-the-price.pdf` (259 páginas)

---

## 1. Tesis Central y Axioma Fundamental de Simon-Kucher

El 72% de todas las innovaciones de productos fracasan comercialmente no por deficiencias de ingeniería o fallas de código, sino por un error metodológico estructural: **diseñar primero el producto y postergar la conversación sobre el precio y la monetización hasta el momento del lanzamiento**.

> **"El precio no es una etiqueta que se pega al final del ciclo de desarrollo; el precio es el filtro de diseño más implacable que existe para priorizar funcionalidades y validar el valor percibido antes de construir."**
> — Madhavan Ramanujam & Georg Tacke

El marco canónico de Simon-Kucher establece que antes de escribir una sola línea de código o diseñar una sola pantalla, la empresa debe descubrir la **Disposición a Pagar (Willingness to Pay - WTP)** del usuario final y del cliente B2B, construyendo la arquitectura técnica y de producto estrictamente **alrededor del precio**.

---

## 2. Las 4 Tipologías Canónicas de Falla en Monetización

Simon-Kucher clasifica el 72% de los fracasos de nuevos productos en cuatro patrones patológicos exactos:

| Patología | Definición y Síntomas | Causa Raíz en Startups | Riesgo para Yendo y Mitigación |
| :--- | :--- | :--- | :--- |
| **1. Feature Shock (Shock de Funcionalidades)** | El producto intenta hacer de todo para todos. Llena la app de botones, configuraciones y opciones secundarias. El resultado es confusión cognitiva, costos de desarrollo astronómicos y ningún segmento dispuesto a pagar la prima por el exceso de complejidad. | Obsesión de los desarrolladores/fundadores por agregar "una cosita más" sin verificar si el usuario la valora o si destruye la claridad del producto. | **Mitigación Yendo:** No convertir la app de eventos en una red social inflada o ticketero laberíntico. Flujo unificado: Descubrimiento geográfico (<150m) → Quórum con amigos → Check-in biométrico → Salida al venue. Cero bloat. |
| **2. Minivation (Mini-innovación)** | La empresa crea una innovación genuina pero fija un precio tímido por miedo al rechazo, o se enfoca en mejoras incrementales tan pequeñas que no logran traccionar tracción de red ni justificar cambio de hábito. | Falta de convicción en el valor diferencial entregado o incapacidad para cuantificar el ROI del cliente B2B. | **Mitigación Yendo:** Para los venues de CABA, Yendo no cobra una comisión genérica; monetiza el **RevPASH incremental en horas muertas** (jueves y domingos), donde el venue tiene capacidad ociosa y un margen de contribución del 80%. |
| **3. Hidden Gem (Gema Oculta)** | Un producto o funcionalidad secundaria tiene un potencial de monetización masivo, pero la empresa lo esconde dentro de un plan general gratuito o no lo promociona adecuadamente porque va en contra del "core business" histórico. | Falta de visión estratégica sobre los subproductos de datos y transacciones colaterales generados por la plataforma. | **Mitigación Yendo:** El valor oculto de Yendo no es solo vender la entrada; es el **Consorcio de Datos de Tráfico Nocturno de CABA** y la **Garantía Anti-No-Show con Quórum Social**. |
| **4. Undead (Muerto Viviente)** | Un producto que nunca debió haber nacido: resuelve un problema que nadie tiene o que nadie está dispuesto a pagar por resolver, pero sigue vivo consumiendo recursos por inercia o ego del equipo. | No matar a tiempo experimentos que no demuestran elasticidad precio positiva ni tracción orgánica. | **Mitigación Yendo:** Validación rápida con telemetría de embudos. Si una funcionalidad B2B no genera conversión de reservas en 3 semanas, se depreca inmediatamente. |

---

## 3. Segmentación por Disposición a Pagar (WTP Segmentation)

La segmentación tradicional (por edad, género o geografía) es estéril para fijar precios. Simon-Kucher postula que la única segmentación que importa es la **Segmentación Basada en Necesidades y Disposición a Pagar**:

1. **Segmento "Value Seekers" (Buscadores de Ocio Económico / Estudiantes Universitarios):**
   - **WTP:** Sensibles al precio facial de la entrada ($10.000 - $15.000 ARS en 2026).
   - **Drivers de Valor:** Descuentos grupales por Quórum, acceso antes de las 01:30 AM (Early Bird dinámico), beneficios en tragos (2x1 en barra).
   - **Empaquetamiento:** "Pase Squad" sin costo de emisión si el grupo asiste completo (garantía social).

2. **Segmento "Experience Enthusiasts" (Consumidores de Ocio Premium / High LTV):**
   - **WTP:** Muy baja sensibilidad al precio de entrada; alta sensibilidad a la fricción y al estatus ($25.000 - $60.000 ARS o más).
   - **Drivers de Valor:** Fila rápida (Fast Pass biométrico), reservas de mesa VIP sin intermediarios turbios, certeza absoluta de ingreso sin "derecho de admisión" arbitrario en puerta.
   - **Empaquetamiento:** "Yendo Black Pass" con fee de conveniencia transparentado.

3. **Segmento B2B: Bares, plataforma y Centros Culturales de CABA:**
   - **WTP:** Altísima disposición a pagar a cambio de **Garantía de Ocupación** y **Consumo en Barra**.
   - **Drivers de Valor:** Llenar mesas entre las 20:00 y las 23:30 (jueves y domingos), conocer los consumos reales y fidelizar al público habitual.
   - **Métrica de Valor:** Costo por Asistente Efectivo Verificado por Geofencing + Biometría (Pay-per-Showup, no Pay-per-Click).

---

## 4. Empaquetamiento Dinámico: Leaders, Fillers y Killers

Simon-Kucher define la ciencia del bundling en 3 tipos de características:
- **Leaders (Líderes):** La funcionalidad central por la que el usuario compra (ej: Acceso seguro al evento sin reventa trucha, Quórum con amigos).
- **Fillers (Rellenos):** Funcionalidades complementarias que aumentan el valor percibido a costo marginal cero (ej: Playlist de Spotify del venue en el feed, mapa de calor de amigos que asisten).
- **Killers (Destructores):** Funcionalidades que, si se fuerzan dentro del paquete base, destruyen la disposición a pagar o alienan a un segmento (ej: Forzar a comprar una consumición alcohólica obligatoria dentro de la entrada para menores o conductores designados).

---

## 5. El Modelo de Precios y Métrica de Valor (Price Metric)

La elección de la **Métrica de Valor (Price Metric)** es el factor determinante de la rentabilidad:
- Una mala métrica de valor: Cobrarle al venue un abono mensual fijo plano (SaaS) independiente de si se llena o no. Si una semana no va nadie, el venue cancela la suscripción (churn alto).
- Una métrica de valor alineada con Simon-Kucher: **Monetizar el Éxito Compartido**. Yendo cobra un porcentaje sobre el ticket efectivamente cortado y un fee por show-up verificado de mesas en horas valle. Si el venue explota de gente, Yendo gana; si la noche es floja, el costo para el venue es mínimo.

---

## Relaciones de Contexto
- [[YENDO_DNA]]
- [[YENDO_LIBRARY]]
- [[CANON_ECONOMIA_MATEMATICA_PRICING_SOTA_2026]]
- [[Modelo_Economico_Redireccion_Arbitraje_B2B]]
- [[ESTRATEGIAS_MONETIZACION_TICKETERAS_MVP]]
- [[B2B_GTM_STRATEGY]]
