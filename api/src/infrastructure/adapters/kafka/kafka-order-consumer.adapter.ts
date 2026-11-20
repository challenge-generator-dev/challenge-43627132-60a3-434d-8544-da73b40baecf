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