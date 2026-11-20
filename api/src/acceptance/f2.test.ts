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