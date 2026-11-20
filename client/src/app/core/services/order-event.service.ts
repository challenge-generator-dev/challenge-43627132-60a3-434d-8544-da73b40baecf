import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order, OrderEvent } from '../models/order.model';
import { environment } from '../../../environments/environment';

/**
 * Servicio de estado de órdenes en tiempo real.
 * Mantiene la conexión SSE con el backend y expone el estado con Signals.
 */
@Injectable({
  providedIn: 'root'
})
export class OrderEventService {
  private eventSource: EventSource | null = null;
  private readonly ordersSignal = signal<Order[]>([]);
  private readonly eventSubject = new Subject<OrderEvent>();

  constructor(private readonly http: HttpClient) {}

  get orders$() {
    return this.ordersSignal.asReadonly();
  }

  get events$(): Observable<OrderEvent> {
    return this.eventSubject.asObservable();
  }

  connect(): void {
    if (this.eventSource) {
      return;
    }

    this.eventSource = new EventSource(`${environment.apiUrl}/orders/events`);

    this.eventSource.onmessage = (event: MessageEvent) => {
      try {
        const raw = JSON.parse(event.data) as OrderEvent;
        const orderEvent: OrderEvent = {
          ...raw,
          timestamp: new Date(raw.timestamp)
        };
        this.eventSubject.next(orderEvent);
        this.updateOrderStatus(orderEvent);
      } catch (error) {
        console.error('Error al parsear evento SSE:', error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('Error en la conexión SSE:', error);
      this.disconnect();
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  fetchOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${environment.apiUrl}/orders/${orderId}`);
  }

  fetchAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`);
  }

  private updateOrderStatus(event: OrderEvent): void {
    const orderIndex = this.ordersSignal().findIndex(order => order.id === event.orderId);

    if (orderIndex !== -1) {
      this.ordersSignal.update(orders => {
        const updatedOrders = [...orders];
        updatedOrders[orderIndex] = {
          ...updatedOrders[orderIndex],
          status: event.status
        };
        return updatedOrders;
      });
      return;
    }

    // La orden no está en memoria: se trae desde la API y se agrega sin pisar el estado vigente.
    this.fetchOrder(event.orderId).subscribe({
      next: (order) => {
        this.ordersSignal.update(orders => {
          const alreadyPresent = orders.some(existing => existing.id === order.id);
          return alreadyPresent ? orders : [...orders, order];
        });
      },
      error: (error) => {
        console.error('Error al obtener la orden del evento:', error);
      }
    });
  }
}