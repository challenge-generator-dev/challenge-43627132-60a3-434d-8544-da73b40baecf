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