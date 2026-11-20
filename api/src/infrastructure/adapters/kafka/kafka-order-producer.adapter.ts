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