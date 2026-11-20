# Implementación de un sistema de eventos en tiempo real con Kafka y Angular

El sistema debe publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real en la interfaz de usuario. El estado de cada orden se actualizará sin recargar la página.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Consumo de eventos en tiempo real con Kafka |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Configuración del entorno y publicación de eventos

**Objetivo:** Configurar el entorno de desarrollo y publicar eventos en Kafka.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el proyecto Angular para consumir eventos de Kafka usando kafkajs 2.
- Publicar eventos en un topic Kafka desde el servidor.
- Verificar que los eventos se publican correctamente.

**Entregable:** Proyecto Angular configurado para consumir eventos de Kafka y servidor publicando eventos.

<details>
<summary>Pistas de conocimiento</summary>

- Configuración de kafkajs en Angular.
- Uso de Server-Sent Events para recibir eventos en el cliente.

</details>

### Fase 2: Consumo de eventos y actualización de la UI

**Objetivo:** Consumir eventos de Kafka y actualizar la UI en tiempo real.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Consumir eventos de Kafka en el cliente usando kafkajs 2.
- Actualizar el estado de las órdenes en la UI sin recargar la página.
- Verificar que los eventos se consumen y la UI se actualiza correctamente.

**Entregable:** Cliente Angular consumiendo eventos de Kafka y actualizando la UI en tiempo real.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Server-Sent Events para recibir eventos en el cliente.
- Actualización de la UI sin recargar la página.

</details>

### Fase 3: Pruebas de aceptación y verificación

**Objetivo:** Realizar pruebas de aceptación para verificar el funcionamiento del sistema.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar pruebas de aceptación para la pieza p1 (KafkaOrderProducer) que verifiquen la publicación de eventos en Kafka.
- Implementar pruebas de aceptación para la pieza p3 (OrderEventConsumer) que verifiquen el consumo de eventos desde Kafka.
- Implementar pruebas de aceptación para la pieza p4 (OrderEventSseService) que verifiquen la transformación de eventos Kafka a SSE y su envío al cliente.
- Implementar pruebas de aceptación para la pieza p5 (OrderStatusComponent) que verifiquen la actualización de la UI sin recargar la página.

**Entregable:** Pruebas de aceptación que cubren los casos de éxito y error definidos para las piezas implementadas.

<details>
<summary>Pistas de conocimiento</summary>

- Escritura de pruebas de aceptación en Angular.
- Verificación del estado de las órdenes en la UI.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es kafkajs y cómo se usa en Angular para consumir eventos de Kafka?
- **paraQueSirve**: ¿Para qué sirve consumir eventos de Kafka en tiempo real en una aplicación Angular?
- **comoSeUsa**: ¿Cómo se usa Server-Sent Events para recibir eventos en el cliente Angular?
- **erroresComunes**: ¿Cuáles son los errores comunes al consumir eventos de Kafka en Angular y cómo se solucionan?
- **queDecisionesImplica**: ¿Qué decisiones implica el consumo de eventos de Kafka en tiempo real en una aplicación Angular?

## Criterios de Evaluacion

- Configuración correcta de kafkajs en el proyecto Angular.
- Publicación correcta de eventos en Kafka desde el servidor.
- Consumo correcto de eventos de Kafka en el cliente Angular usando kafkajs 2.
- Actualización correcta del estado de las órdenes en la UI sin recargar la página.
- Pruebas de aceptación que verifican el funcionamiento del sistema.

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Configuración del entorno y publicación de eventos | Publicación de eventos en Kafka usando kafkajs | `api/src/infrastructure/adapters/kafka/kafka-order-producer.adapter.ts:KafkaOrderProducer` | El servidor publica eventos en un topic Kafka cuando el estado de una orden cambia; El entorno local de Kafka está configurado y accesible | `api/src/acceptance/f1.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f1 — Configuración del entorno y publicación de eventos | Coordinación de la publicación de eventos de órdenes | `api/src/application/services/order-event.service.ts:OrderEventService` | El servidor publica eventos en un topic Kafka cuando el estado de una orden cambia; El entorno local de Kafka está configurado y accesible | `api/src/acceptance/f1.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f2 — Consumo de eventos y actualización de la UI | Consumo de eventos de Kafka usando kafkajs | `api/src/infrastructure/adapters/kafka/kafka-order-consumer.adapter.ts:OrderEventConsumer` | El cliente Angular recibe eventos de Kafka a través de Server-Sent Events y actualiza la UI sin recargar la página; Los eventos de Kafka se transforman en eventos SSE correctamente | `api/src/acceptance/f2.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Consumo de eventos y actualización de la UI | Transformación de eventos Kafka a Server-Sent Events | `api/src/infrastructure/adapters/sse/order-event-sse.service.ts:OrderEventSseService` | El cliente Angular recibe eventos de Kafka a través de Server-Sent Events y actualiza la UI sin recargar la página; Los eventos de Kafka se transforman en eventos SSE correctamente | `api/src/acceptance/f2.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f2.test.ts` |
| f2 — Consumo de eventos y actualización de la UI | Consumo de eventos SSE y actualización de la UI en Angular | `client/src/app/features/order-status/order-status.component.ts:OrderStatusComponent` | El cliente Angular recibe eventos de Kafka a través de Server-Sent Events y actualiza la UI sin recargar la página; Los eventos de Kafka se transforman en eventos SSE correctamente | — | — |
| f3 — Pruebas de aceptación y verificación | — | — | Las pruebas de aceptación cubren todos los casos definidos para las piezas implementadas; Las pruebas verifican el flujo completo desde la publicación hasta la visualización de eventos | — | — |

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar kafkajs 2 para el consumidor de eventos (dependencia kafkajs en package.json) | chequeo estatico (manifest): exige `"kafkajs": "^2` | Verificada |
| No usar socket.io; el cliente recibe los eventos por Server-Sent Events (text/event-stream) | chequeo estatico (code): exige `text/event-stream`; prohibe `socket.io` | Verificada |
| El estado de cada orden se actualiza en la UI sin recargar la pagina y las pruebas de aceptacion lo verifican | sin ubicar | Restriccion no verificada en sin ubicar |

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | Apache Kafka |
| `client` | `client/` | chapter, support | client | Angular | Angular |
| `infra-local` | (raiz) | support | infra | Compose local | Apache Kafka |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
3. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `GET /orders/events`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
