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