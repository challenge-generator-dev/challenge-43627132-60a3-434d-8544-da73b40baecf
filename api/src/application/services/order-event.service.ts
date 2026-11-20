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