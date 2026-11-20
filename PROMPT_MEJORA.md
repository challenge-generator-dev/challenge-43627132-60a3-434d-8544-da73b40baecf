# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/infrastructure/adapters/kafka/kafka-order-producer.adapter.ts` — La pieza p1 (Publicación de eventos en Kafka usando kafkajs, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/application/services/order-event.service.ts` — La pieza p2 (Coordinación de la publicación de eventos de órdenes, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/adapters/kafka/kafka-order-consumer.adapter.ts` — La pieza p3 (Consumo de eventos de Kafka usando kafkajs, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/adapters/sse/order-event-sse.service.ts` — La pieza p4 (Transformación de eventos Kafka a Server-Sent Events, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `client/src/app/features/order-status/order-status.component.ts` — La pieza p5 (Consumo de eventos SSE y actualización de la UI en Angular, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

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

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced L2

### Brecha de conocimiento
Publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real

### Misión / candidato
Mostrar en vivo el estado de las ordenes

### Reto
- Tema: Consumo de eventos en tiempo real con Kafka
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de un sistema de eventos en tiempo real con Kafka y Angular
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno y publicación de eventos — objetivo: Configurar el entorno de desarrollo y publicar eventos en Kafka. — entregable (NO resolver): Proyecto Angular configurado para consumir eventos de Kafka y servidor publicando eventos.
- Fase 2: Consumo de eventos y actualización de la UI — objetivo: Consumir eventos de Kafka y actualizar la UI en tiempo real. — entregable (NO resolver): Cliente Angular consumiendo eventos de Kafka y actualizando la UI en tiempo real.
- Fase 3: Pruebas de aceptación y verificación — objetivo: Realizar pruebas de aceptación para verificar el funcionamiento del sistema. — entregable (NO resolver): Pruebas de aceptación que cubren los casos de éxito y error definidos para las piezas implementadas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "10.4.22",
    "@nestjs/config": "4.0.4",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "@nestjs/testing": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "kafkajs": "^2.2.4",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "@types/jest": "29.5.14"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/domain/models/order-event.model.ts ===
import { IsDate, IsEnum, IsString } from 'class-validator';

export enum OrderStatus {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class OrderItem {
  @IsString()
  productId: string;

  @IsString()
  quantity: number;

  @IsString()
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class Order {
  @IsString()
  id: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsString({ each: true })
  items: OrderItem[];

  constructor(id: string, status: OrderStatus, items: OrderItem[]) {
    this.id = id;
    this.status = status;
    this.items = items;
  }
}

export class OrderEvent {
  @IsString()
  id: string;

  @IsString()
  orderId: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsDate()
  timestamp: Date;

  constructor(id: string, orderId: string, status: OrderStatus, timestamp: Date) {
    this.id = id;
    this.orderId = orderId;
    this.status = status;
    this.timestamp = timestamp;
  }
}

// === ARCHIVO: api/src/domain/ports/order-event-producer.port.ts ===
import { OrderEvent } from '../models/order-event.model';

export interface OrderEventProducerPort {
  /**
   * Publica un evento de orden en el sistema de mensajería.
   * @param event Evento de orden a publicar
   * @returns Promise que se resuelve cuando el evento es publicado exitosamente
   * @throws Error si ocurre un fallo al publicar el evento
   */
  publish(event: OrderEvent): Promise<void>;
}

// === ARCHIVO: api/src/domain/ports/order-event-handler.port.ts ===
import { OrderEvent } from '../models/order-event.model';

export interface OrderEventHandlerPort {
  /**
   * Maneja un evento de orden recibido.
   * @param event Evento de orden a manejar
   */
  handle(event: OrderEvent): Promise<void>;
}

// === ARCHIVO: api/src/infrastructure/adapters/kafka/kafka-order-producer.adapter.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable } from '@nestjs/common';
import { OrderEvent } from '../../../domain/models/order-event.model';
import { KafkaClient } from './kafka-client';

@Injectable()
export class KafkaOrderProducer {
  private readonly topic = 'order-events';

  constructor(private readonly kafkaClient: KafkaClient) {}

  async produce(event: OrderEvent): Promise<void> {
    throw new Error('TODO(reto): produce');
  }
}

// === ARCHIVO: api/src/application/services/order-event.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject } from '@nestjs/common';
import { Order, OrderEvent, OrderStatus } from '../../domain/models/order-event.model';
import { OrderEventProducerPort } from '../../domain/ports/order-event-producer.port';

@Injectable()
export class OrderEventService {
  constructor(@Inject('OrderEventProducerPort') private readonly orderEventProducer: OrderEventProducerPort) {}

  async emitOrderEvent(order: Order): Promise<void> {
    throw new Error('TODO(reto): emitOrderEvent');
  }

  private isValidOrderStatus(status: OrderStatus): boolean {
    throw new Error('TODO(reto): isValidOrderStatus');
  }

  private generateEventId(): string {
    throw new Error('TODO(reto): generateEventId');
  }
}

// === ARCHIVO: api/src/infrastructure/adapters/kafka/kafka-order-consumer.adapter.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Logger, Inject } from '@nestjs/common';
import { OrderEvent } from '../../../domain/models/order-event.model';
import { OrderEventHandlerPort } from '../../../domain/ports/order-event-handler.port';
import { KafkaClient } from './kafka-client';

@Injectable()
export class OrderEventConsumer {
  private readonly logger = new Logger(OrderEventConsumer.name);
  private isConsuming = false;

  constructor(
    private readonly kafkaClient: KafkaClient,
    @Inject('OrderEventHandlerPort') private readonly orderEventHandler: OrderEventHandlerPort,
  ) {}

  async start(): Promise<void> {
    throw new Error('TODO(reto): start');
  }

  async stop(): Promise<void> {
    throw new Error('TODO(reto): stop');
  }

  private parseMessageToOrderEvent(message: { value: string }): OrderEvent {
    throw new Error('TODO(reto): anonymous');
  }
}

// === ARCHIVO: api/src/infrastructure/adapters/sse/order-event-sse.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Logger } from '@nestjs/common';
import { OrderEvent } from '../../../domain/models/order-event.model';
import { Response } from './sse-response';

@Injectable()
export class OrderEventSseService {
  private readonly logger = new Logger(OrderEventSseService.name);
  private readonly clients: Map<string, Response> = new Map();

  addClient(response: Response): void {
    throw new Error('TODO(reto): addClient');
  }

  removeClient(clientId: string): void {
    throw new Error('TODO(reto): removeClient');
  }

  broadcast(event: OrderEvent): void {
    throw new Error('TODO(reto): broadcast');
  }

  private formatSseEvent(event: OrderEvent): string {
    throw new Error('TODO(reto): formatSseEvent');
  }

  private generateClientId(): string {
    throw new Error('TODO(reto): generateClientId');
  }

  getClientCount(): number {
    throw new Error('TODO(reto): getClientCount');
  }
}

// === ARCHIVO: api/src/acceptance/f1.test.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { OrderEventService } from '../application/services/order-event.service';
import { OrderEventProducerPort } from '../domain/ports/order-event-producer.port';
import { Order, OrderStatus, OrderItem } from '../domain/models/order-event.model';
import { KafkaOrderProducer } from '../infrastructure/adapters/kafka/kafka-order-producer.adapter';
import { KafkaClient } from '../infrastructure/adapters/kafka/kafka-client';

describe('Fase 1 - Publicación de eventos en Kafka', () => {
  describe('KafkaOrderProducer', () => {
    let kafkaOrderProducer: KafkaOrderProducer;
    let mockKafkaClient: any;

    beforeEach(() => {
      mockKafkaClient = {
        getProducer: jest.fn().mockReturnValue({
          send: jest.fn().mockResolvedValue(undefined)
        })
      };
      kafkaOrderProducer = new KafkaOrderProducer(mockKafkaClient);
    });

    it('should publish order event to Kafka topic', async () => {
      const event = new OrderEvent(
        'evt-123',
        'order-456',
        OrderStatus.CREATED,
        new Date()
      );

      await kafkaOrderProducer.produce(event);

      const producer = mockKafkaClient.getProducer();
      expect(producer.send).toHaveBeenCalledWith({
        topic: 'order-events',
        messages: [
          {
            key: 'order-456',
            value: expect.stringContaining('"id":"evt-123"')
          }
        ]
      });
    });

    it('should throw error when Kafka client fails to publish', async () => {
      const mockProducer = {
        send: jest.fn().mockRejectedValue(new Error('Kafka connection failed'))
      };
      mockKafkaClient.getProducer.mockReturnValue(mockProducer);

      const event = new OrderEvent(
        'evt-123',
        'order-456',
        OrderStatus.CREATED,
        new Date()
      );

      await expect(kafkaOrderProducer.produce(event)).rejects.toThrow(
        'Kafka connection failed'
      );
    });
  });

  describe('OrderEventService', () => {
    let orderEventService: OrderEventService;
    let mockProducerPort: OrderEventProducerPort;

    beforeEach(() => {
      mockProducerPort = {
        publish: jest.fn().mockResolvedValue(undefined)
      };
      orderEventService = new OrderEventService(mockProducerPort);
    });

    it('should emit order event when order status changes', async () => {
      const order = new Order(
        'order-123',
        OrderStatus.PROCESSING,
        [new OrderItem('product-1', 2, 100)]
      );

      await orderEventService.emitOrderEvent(order);

      expect(mockProducerPort.publish).toHaveBeenCalled();
      const publishedEvent = mockProducerPort.publish.mock.calls[0][0];
      expect(publishedEvent.orderId).toBe('order-123');
      expect(publishedEvent.status).toBe(OrderStatus.PROCESSING);
    });

    it('should throw error when order status is invalid', async () => {
      const order = new Order(
        'order-123',
        'INVALID_STATUS' as any,
        [new OrderItem('product-1', 2, 100)]
      );

      await expect(orderEventService.emitOrderEvent(order)).rejects.toThrow(
        'Invalid order status'
      );
      expect(mockProducerPort.publish).not.toHaveBeenCalled();
    });
  });
});

// === ARCHIVO: api/src/acceptance/f2.test.ts ===
import { Test, TestingModule } from '@nestjs/testing';
import { OrderEventConsumer } from '../infrastructure/adapters/kafka/kafka-order-consumer.adapter';
import { OrderEventSseService } from '../infrastructure/adapters/sse/order-event-sse.service';
import { OrderEvent, OrderStatus } from '../domain/models/order-event.model';
import { OrderEventHandlerPort } from '../domain/ports/order-event-handler.port';
import { KafkaClient } from '../infrastructure/adapters/kafka/kafka-client';
import { Response } from '../infrastructure/adapters/sse/sse-response';

describe('Fase 2 - Consumo de eventos y actualización de la UI', () => {
  describe('OrderEventConsumer (p3)', () => {
    let consumer: OrderEventConsumer;
    let mockKafkaClient: jest.Mocked<KafkaClient>;
    let mockHandler: OrderEventHandlerPort;
    let mockHandlerHandleFn: jest.Mock;

    beforeEach(async () => {
      mockHandlerHandleFn = jest.fn().mockResolvedValue(undefined);
      mockHandler = {
        handle: mockHandlerHandleFn,
      };

      mockKafkaClient = {
        subscribe: jest.fn().mockResolvedValue(undefined),
        disconnect: jest.fn().mockResolvedValue(undefined),
      } as unknown as jest.Mocked<KafkaClient>;

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          OrderEventConsumer,
          { provide: KafkaClient, useValue: mockKafkaClient },
          { provide: 'OrderEventHandlerPort', useValue: mockHandler },
        ],
      }).compile();

      consumer = module.get<OrderEventConsumer>(OrderEventConsumer);
    });

    it('should consume order event from Kafka topic', async () => {
      const testEvent = new OrderEvent(
        'event-123',
        'order-456',
        OrderStatus.PROCESSING,
        new Date(),
      );

      let capturedCallback: ((message: { value: string }) => Promise<void>) | null = null;
      mockKafkaClient.subscribe.mockImplementation(async (options, callback) => {
        capturedCallback = callback;
      });

      await consumer.start();

      expect(mockKafkaClient.subscribe).toHaveBeenCalledWith(
        { topic: 'order-events', fromBeginning: false },
        expect.any(Function),
      );

      const message = {
        value: JSON.stringify({
          id: testEvent.id,
          orderId: testEvent.orderId,
          status: testEvent.status,
          timestamp: testEvent.timestamp.toISOString(),
        }),
      };

      await capturedCallback!(message);

      expect(mockHandlerHandleFn).toHaveBeenCalledTimes(1);
      expect(mockHandlerHandleFn).toHaveBeenCalledWith(
        expect.objectContaining({
          id: testEvent.id,
          orderId: testEvent.orderId,
          status: testEvent.status,
        }),
      );
    });

    it('should throw error when Kafka client fails to consume', async () => {
      mockKafkaClient.subscribe.mockRejectedValue(new Error('Kafka connection failed'));

      await expect(consumer.start()).rejects.toThrow(
        'Kafka consumer failed to start: Kafka connection failed',
      );
    });
  });

  describe('OrderEventSseService (p4)', () => {
    let sseService: OrderEventSseService;
    let mockResponse: Response;

    beforeEach(() => {
      sseService = new OrderEventSseService();
      mockResponse = {
        write: jest.fn(),
      };
    });

    it('should add client and send initial event', () => {
      sseService.addClient(mockResponse);

      expect(mockResponse.write).toHaveBeenCalledTimes(1);
      const firstCallArg = mockResponse.write.mock.calls[0][0] as string;
      expect(firstCallArg).toMatch(/^data: .+\n\n$/);
      expect(firstCallArg).toContain('"orderId":"system"');
      expect(sseService.getClientCount()).toBe(1);
    });

    it('should broadcast event to all connected clients', () => {
      const mockResponse2: Response = { write: jest.fn() };

      sseService.addClient(mockResponse);
      sseService.addClient(mockResponse2);

      const testEvent = new OrderEvent(
        'event-789',
        'order-101',
        OrderStatus.SHIPPED,
        new Date(),
      );

      sseService.broadcast(testEvent);

      expect(mockResponse.write).toHaveBeenCalledTimes(2);
      expect(mockResponse2.write).toHaveBeenCalledTimes(2);

      const broadcastCall = mockResponse.write.mock.calls[1][0] as string;
      expect(broadcastCall).toContain(`"id":"${testEvent.id}"`);
      expect(broadcastCall).toContain(`"orderId":"${testEvent.orderId}"`);
      expect(broadcastCall).toContain(`"status":"${testEvent.status}"`);
    });

    it('should remove client and stop sending events', () => {
      sseService.addClient(mockResponse);
      expect(sseService.getClientCount()).toBe(1);

      const clientId = Array.from(
        (sseService as any).clients.keys(),
      )[0];

      sseService.removeClient(clientId);
      expect(sseService.getClientCount()).toBe(0);

      const testEvent = new OrderEvent(
        'event-999',
        'order-202',
        OrderStatus.DELIVERED,
        new Date(),
      );

      sseService.broadcast(testEvent);
      expect(mockResponse.write).toHaveBeenCalledTimes(1);
    });
  });
});

// === ARCHIVO: api/src/infrastructure/adapters/kafka/kafka-client.ts ===
import { Kafka, Producer, Consumer, logLevel, EachMessagePayload } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

export class KafkaClient {
  private readonly kafka: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private readonly clientId: string;
  private readonly brokers: string[];

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>('KAFKA_CLIENT_ID', 'order-events-client');
    const brokersString = this.configService.get<string>('KAFKA_BROKERS', 'localhost:9092');
    this.brokers = brokersString.split(',').map(b => b.trim());

    this.kafka = new Kafka({
      clientId: this.clientId,
      brokers: this.brokers,
      logLevel: logLevel.WARN,
      retry: {
        initialRetryTime: 100,
        retries: 8,
      },
    });
  }

  async getProducer(): Promise<Producer> {
    if (!this.producer) {
      this.producer = this.kafka.producer();
      await this.producer.connect();
    }
    return this.producer;
  }

  async getConsumer(groupId: string): Promise<Consumer> {
    if (!this.consumer) {
      this.consumer = this.kafka.consumer({ groupId });
      await this.consumer.connect();
    }
    return this.consumer;
  }

  async sendMessage(topic: string, messages: { key?: string; value: string }[]): Promise<void> {
    const producer = await this.getProducer();
    await producer.send({
      topic,
      messages,
    });
  }

  async subscribeToTopic(
    topic: string,
    groupId: string,
    callback: (message: EachMessagePayload) => Promise<void>
  ): Promise<void> {
    const consumer = await this.getConsumer(groupId);
    await consumer.subscribe({ topic, fromBeginning: false });
    await consumer.run({
      eachMessage: callback,
    });
  }

  async disconnect(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
      this.producer = null;
    }
    if (this.consumer) {
      await this.consumer.disconnect();
      this.consumer = null;
    }
  }
}

// === ARCHIVO: api/src/infrastructure/adapters/sse/sse-response.ts ===
export interface SseResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
}

// Destino escribible de un stream SSE (por ejemplo, la respuesta HTTP de un cliente conectado).
// Se tipa como any para que las pruebas puedan sustituirlo por dobles de Jest sin errores de tipo.
export interface Response {
  write: any;
}

export class SseResponseBuilder {
  private readonly headers: Record<string, string> = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  };

  private eventId?: string;
  private eventType?: string;
  private data: string = '';

  setEventId(id: string): this {
    this.eventId = id;
    return this;
  }

  setEventType(type: string): this {
    this.eventType = type;
    return this;
  }

  setData(data: object | string): this {
    if (typeof data === 'object') {
      this.data = JSON.stringify(data);
    } else {
      this.data = data;
    }
    return this;
  }

  build(): SseResponse {
    let body = '';

    if (this.eventId) {
      body += `id: ${this.eventId}\n`;
    }
    if (this.eventType) {
      body += `event: ${this.eventType}\n`;
    }
    body += `data: ${this.data}\n\n`;

    return {
      status: 200,
      headers: this.headers,
      body,
    };
  }

  static forOrderEvent(event: { id: string; orderId: string; status: string; timestamp: Date }): SseResponse {
    return new SseResponseBuilder()
      .setEventId(event.id)
      .setEventType('order-update')
      .setData({
        id: event.id,
        orderId: event.orderId,
        status: event.status,
        timestamp: event.timestamp.toISOString(),
      })
      .build();
  }
}

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderEventService } from './application/services/order-event.service';
import { KafkaOrderProducer } from './infrastructure/adapters/kafka/kafka-order-producer.adapter';
import { OrderEventConsumer } from './infrastructure/adapters/kafka/kafka-order-consumer.adapter';
import { OrderEventSseService } from './infrastructure/adapters/sse/order-event-sse.service';
import { KafkaClient } from './infrastructure/adapters/kafka/kafka-client';
import { OrdersController } from './infrastructure/controllers/orders.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [OrdersController],
  providers: [
    KafkaClient,
    {
      provide: 'OrderEventProducerPort',
      useClass: KafkaOrderProducer,
    },
    {
      provide: 'OrderEventHandlerPort',
      useClass: OrderEventSseService,
    },
    OrderEventService,
    OrderEventConsumer,
    OrderEventSseService,
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
  console.log(`Endpoint SSE disponible en http://localhost:${port}/orders/events`);
}

bootstrap();

// === ARCHIVO: api/src/infrastructure/controllers/orders.controller.ts ===
import { Controller, Get } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';
import { OrderEventSseService } from '../adapters/sse/order-event-sse.service';

// Controlador HTTP del stream de eventos de órdenes.
// El identificador de cada cliente SSE se genera aquí, porque el proveedor
// no expone públicamente su generador interno.
@Controller('orders')
export class OrdersController {
  constructor(private readonly sseService: OrderEventSseService) {}

  @Get('events')
  sse(): Observable<any> {
    return new Observable<any>((observer) => {
      const clientId = this.createClientId();

      const streamHeaders = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      };

      observer.next({
        type: 'message',
        data: JSON.stringify({
          type: 'connection',
          clientId,
          message: 'Conectado al stream de eventos de órdenes',
          timestamp: new Date().toISOString(),
        }),
      });

      this.sseService.addClient({
        status: 200,
        headers: streamHeaders,
        write: (data: string) => {
          observer.next({ type: 'message', data });
        },
        end: () => {
          this.sseService.removeClient(clientId);
          observer.complete();
        },
      } as any);

      return () => {
        this.sseService.removeClient(clientId);
      };
    });
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      sseClients: this.sseService.getClientCount(),
      timestamp: new Date().toISOString(),
    };
  }

  private createClientId(): string {
    return randomUUID();
  }
}

// === ARCHIVO: client/src/app/app.component.ts ===
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {}

// === ARCHIVO: client/package.json ===
{
  "name": "reto-angular",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "ng": "ng",
    "build": "ng build",
    "test": "jest"
  },
  "dependencies": {
    "@angular/animations": "19.2.25",
    "@angular/common": "19.2.25",
    "@angular/compiler": "19.2.25",
    "@angular/core": "19.2.25",
    "@angular/forms": "19.2.25",
    "@angular/material": "19.2.19",
    "@angular/platform-browser": "19.2.25",
    "@angular/platform-browser-dynamic": "19.2.25",
    "@angular/router": "19.2.25",
    "@types/jest": "30.0.0",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "jest": "29.7.0",
    "rxjs": "7.8.2",
    "tslib": "2.9.1",
    "zone.js": "0.15.1"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "19.2.27",
    "@angular/cli": "19.2.27",
    "@angular/compiler-cli": "19.2.25",
    "typescript": "5.7.3"
  }
}

// === ARCHIVO: client/angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "analytics": false
  },
  "newProjectRoot": "projects",
  "projects": {
    "reto": {
      "projectType": "application",
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/reto",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [],
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1MB",
                  "maximumError": "2MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "16kB",
                  "maximumError": "32kB"
                }
              ],
              "outputHashing": "all"
            }
          },
          "defaultConfiguration": "production"
        }
      }
    }
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "strictPropertyInitialization": false,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// === ARCHIVO: client/tsconfig.app.json ===
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: client/src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Reto</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
</body>
</html>

// === ARCHIVO: client/src/styles.css ===
/* estilos globales */

// === ARCHIVO: client/src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

// === ARCHIVO: client/src/app/core/models/order.model.ts ===
import { IsString, IsNumber, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export class OrderItem {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class Order {
  @IsString()
  id: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  constructor(id: string, status: OrderStatus, items: OrderItem[]) {
    this.id = id;
    this.status = status;
    this.items = items;
  }
}

export class OrderEvent {
  @IsString()
  id: string;

  @IsString()
  orderId: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsString()
  timestamp: Date;

  constructor(id: string, orderId: string, status: OrderStatus, timestamp: Date) {
    this.id = id;
    this.orderId = orderId;
    this.status = status;
    this.timestamp = timestamp;
  }
}

// === ARCHIVO: client/src/app/core/services/order-event.service.ts ===
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order, OrderEvent } from '../models/order.model';
import { environment } from '../../../environments/environment';

/**
 * Servicio de estado de órdenes en tiempo real.
 * Mantiene la conexión SSE con el backend y expone el estado con Signals.
 */
@Injectable({
  providedIn: 'root'
})
export class OrderEventService {
  private eventSource: EventSource | null = null;
  private readonly ordersSignal = signal<Order[]>([]);
  private readonly eventSubject = new Subject<OrderEvent>();

  constructor(private readonly http: HttpClient) {}

  get orders$() {
    return this.ordersSignal.asReadonly();
  }

  get events$(): Observable<OrderEvent> {
    return this.eventSubject.asObservable();
  }

  connect(): void {
    if (this.eventSource) {
      return;
    }

    this.eventSource = new EventSource(`${environment.apiUrl}/orders/events`);

    this.eventSource.onmessage = (event: MessageEvent) => {
      try {
        const raw = JSON.parse(event.data) as OrderEvent;
        const orderEvent: OrderEvent = {
          ...raw,
          timestamp: new Date(raw.timestamp)
        };
        this.eventSubject.next(orderEvent);
        this.updateOrderStatus(orderEvent);
      } catch (error) {
        console.error('Error al parsear evento SSE:', error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('Error en la conexión SSE:', error);
      this.disconnect();
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  fetchOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/orders/${orderId}`);
  }

  fetchAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
  }

  private updateOrderStatus(event: OrderEvent): void {
    const orderIndex = this.ordersSignal().findIndex(order => order.id === event.orderId);

    if (orderIndex !== -1) {
      this.ordersSignal.update(orders => {
        const updatedOrders = [...orders];
        updatedOrders[orderIndex] = {
          ...updatedOrders[orderIndex],
          status: event.status
        };
        return updatedOrders;
      });
      return;
    }

    // La orden no está en memoria: se trae desde la API y se agrega sin pisar el estado vigente.
    this.fetchOrder(event.orderId).subscribe({
      next: (order) => {
        this.ordersSignal.update(orders => {
          const alreadyPresent = orders.some(existing => existing.id === order.id);
          return alreadyPresent ? orders : [...orders, order];
        });
      },
      error: (error) => {
        console.error('Error al obtener la orden del evento:', error);
      }
    });
  }
}

// === ARCHIVO: client/src/app/shared/components/order-status-card/order-status-card.component.ts ===
import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Order } from '../../../core/models/order.model';
import { StatusPipe } from '../../pipes/status.pipe';

// Tarjeta presentacional: recibe una orden por entrada y muestra su estado y total.
// La lógica de color de estado pertenece a la pieza de estado de pedido y se consume desde allí.
@Component({
  selector: 'app-order-status-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule, StatusPipe],
  templateUrl: './order-status-card.component.html',
  styleUrls: ['./order-status-card.component.scss']
})
export class OrderStatusCardComponent {
  @Input() order!: Order;

  totalAmount = computed(() => {
    const items = this.order?.items ?? [];
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  itemCount = computed(() => {
    const items = this.order?.items ?? [];
    return items.reduce((count, item) => count + item.quantity, 0);
  });

  hasItems(): boolean {
    return (this.order?.items?.length ?? 0) > 0;
  }

  formatTotal(amount: number): string {
    return amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
  }
}

// === ARCHIVO: client/src/app/shared/pipes/status.pipe.ts ===
import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../core/models/order.model';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {
  transform(value: OrderStatus | string): string {
    if (!value) {
      return '';
    }

    const status = typeof value === 'string' ? value as OrderStatus : value;

    switch (status) {
      case OrderStatus.PENDING:
        return 'Pendiente';
      case OrderStatus.PROCESSING:
        return 'En proceso';
      case OrderStatus.SHIPPED:
        return 'Enviado';
      case OrderStatus.DELIVERED:
        return 'Entregado';
      case OrderStatus.CANCELLED:
        return 'Cancelado';
      default:
        return status;
    }
  }

  getStatusColor(status: OrderStatus | string): string {
    const statusValue = typeof status === 'string' ? status as OrderStatus : status;

    switch (statusValue) {
      case OrderStatus.PENDING:
        return '#FFC107';
      case OrderStatus.PROCESSING:
        return '#2196F3';
      case OrderStatus.SHIPPED:
        return '#4CAF50';
      case OrderStatus.DELIVERED:
        return '#8BC34A';
      case OrderStatus.CANCELLED:
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  }
}

// === ARCHIVO: client/src/app/features/order-status/order-status.component.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderStatus, OrderEvent } from '../../core/models/order.model';
import { OrderEventService } from '../../core/services/order-event.service';
import { StatusPipe } from '../../shared/pipes/status.pipe';
import { OrderStatusCardComponent } from '../../shared/components/order-status-card/order-status-card.component';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule, StatusPipe, OrderStatusCardComponent],
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  private orderEventService = inject(OrderEventService);
  
  orders = signal<Order[]>([]);
  errorMessage = signal<string | null>(null);
  isConnected = signal<boolean>(false);
  
  hasOrders = computed(() => this.orders().length > 0);
  
  private eventSource: EventSource | null = null;

  ngOnInit(): void {
    this.connectToSSE();
    this.loadInitialOrders();
  }

  ngOnDestroy(): void {
    throw new Error('TODO(reto): ngOnDestroy');
  }

  private connectToSSE(): void {
    throw new Error('TODO(reto): connectToSSE');
  }

  handleOrderEvent(event: MessageEvent): void {
    throw new Error('TODO(reto): handleOrderEvent');
  }

  private updateLocalOrder(eventData: OrderEvent): void {
    throw new Error('TODO(reto): updateLocalOrder');
  }

  private handleSSEError(): void {
    throw new Error('TODO(reto): handleSSEError');
  }

  private disconnectFromSSE(): void {
    throw new Error('TODO(reto): disconnectFromSSE');
  }

  private loadInitialOrders(): void {
    throw new Error('TODO(reto): loadInitialOrders');
  }

  retryConnection(): void {
    throw new Error('TODO(reto): retryConnection');
  }

  getStatusClass(status: OrderStatus): string {
    throw new Error('TODO(reto): getStatusClass');
  }
}

// === ARCHIVO: client/src/app/features/order-status/order-status.component.html ===
<div class="order-status-container">
  <header class="order-status__header">
    <h1 class="order-status__title">Estado de Órdenes</h1>
    <p class="order-status__subtitle">Seguimiento en tiempo real de tus pedidos</p>
  </header>

  @if (isLoading()) {
    <div class="order-status__loading">
      <mat-spinner diameter="48"></mat-spinner>
      <p>Cargando órdenes...</p>
    </div>
  }

  @if (error()) {
    <div class="order-status__error">
      <mat-icon>error_outline</mat-icon>
      <p>{{ error() }}</p>
      <button mat-raised-button color="primary" (click)="retryConnection()">
        Reintentar conexión
      </button>
    </div>
  }

  @if (!isLoading() && !error() && orders().length === 0) {
    <div class="order-status__empty">
      <mat-icon>inbox</mat-icon>
      <p>No hay órdenes disponibles</p>
    </div>
  }

  @if (!isLoading() && orders().length > 0) {
    <div class="order-status__grid">
      @for (order of orders(); track order.id) {
        <app-order-status-card
          [order]="order"
          [ngClass]="getStatusClass(order.status)">
        </app-order-status-card>
      }
    </div>
  }

  <footer class="order-status__footer">
    <div class="order-status__connection-status">
      @if (isConnected()) {
        <span class="connection-badge connection-badge--active">
          <span class="connection-badge__dot"></span>
          Conectado en tiempo real
        </span>
      } @else {
        <span class="connection-badge connection-badge--disconnected">
          <span class="connection-badge__dot"></span>
          Desconectado
        </span>
      }
    </div>
  </footer>
</div>

// === ARCHIVO: client/src/app/features/order-status/order-status.component.scss ===
.order-status-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.order-status__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.order-status__title {
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 0.5rem;
  letter-spacing: -0.5px;
}

.order-status__subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
}

.order-status__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;

  p {
    color: #6b7280;
    font-size: 1rem;
  }
}

.order-status__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background-color: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
  gap: 1rem;

  mat-icon {
    font-size: 48px;
    width: 48px;
    height: 48px;
    color: #dc2626;
  }

  p {
    color: #991b1b;
    font-size: 1rem;
    margin: 0;
    text-align: center;
  }
}

.order-status__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  border: 2px dashed #e5e7eb;
  gap: 1rem;

  mat-icon {
    font-size: 64px;
    width: 64px;
    height: 64px;
    color: #9ca3af;
  }

  p {
    color: #6b7280;
    font-size: 1.125rem;
    margin: 0;
  }
}

.order-status__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.order-status__footer {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.connection-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.connection-badge--active {
  background-color: #ecfdf5;
  color: #065f46;

  .connection-badge__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #10b981;
    animation: pulse 2s infinite;
  }
}

.connection-badge--disconnected {
  background-color: #fef3c7;
  color: #92400e;

  .connection-badge__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #f59e0b;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .order-status-container {
    padding: 1rem;
  }

  .order-status__title {
    font-size: 1.5rem;
  }

  .order-status__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

// === ARCHIVO: client/src/app/app.config.ts ===
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter([]),
    provideAnimationsAsync()
  ]
};

// === ARCHIVO: client/src/environments/environment.ts ===
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  kafka:
    image: "apache/kafka:3.8.0"
    ports:
      - "127.0.0.1:9092:9092"
    environment:
      KAFKA_NODE_ID: "1"
      KAFKA_PROCESS_ROLES: "broker,controller"
      KAFKA_LISTENERS: "PLAINTEXT://:9092,CONTROLLER://:9093"
      KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://localhost:9092"
      KAFKA_CONTROLLER_LISTENER_NAMES: "CONTROLLER"
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: "CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT"
      KAFKA_CONTROLLER_QUORUM_VOTERS: "1@localhost:9093"
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: "1"
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: "0"
    healthcheck:
      test: ["CMD-SHELL","/opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092 > /dev/null 2>&1"]
      interval: 15s
      timeout: 10s
      retries: 10
      start_period: 30s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| Apache Kafka (KRaft, un nodo) | `apache/kafka:3.8.0` | 9092 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/kafka/create-topics.sh ===
#!/usr/bin/env bash
# Crea los topics en Kafka local (idempotente). Ejecutar con el compose levantado y healthy.
set -euo pipefail

docker compose exec -T kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --if-not-exists --topic app-events --partitions 1 --replication-factor 1

```
