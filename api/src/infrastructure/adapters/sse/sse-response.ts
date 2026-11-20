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