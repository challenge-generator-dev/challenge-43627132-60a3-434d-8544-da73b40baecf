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