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