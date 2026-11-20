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