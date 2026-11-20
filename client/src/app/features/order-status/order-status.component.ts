// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderStatus, OrderEvent } from '../../core/models/order.model';
import { OrderEventService } from '../../core/services/order-event.service';
import { StatusPipe } from '../../shared/pipes/status.pipe';
import { OrderStatusCardComponent } from '../../shared/components/order-status-card/order-status-card.component';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule, StatusPipe, OrderStatusCardComponent],
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  private orderEventService = inject(OrderEventService);
  
  orders = signal<Order[]>([]);
  errorMessage = signal<string | null>(null);
  isConnected = signal<boolean>(false);
  
  hasOrders = computed(() => this.orders().length > 0);
  
  private eventSource: EventSource | null = null;

  ngOnInit(): void {
    this.connectToSSE();
    this.loadInitialOrders();
  }

  ngOnDestroy(): void {
    throw new Error('TODO(reto): ngOnDestroy');
  }

  private connectToSSE(): void {
    throw new Error('TODO(reto): connectToSSE');
  }

  handleOrderEvent(event: MessageEvent): void {
    throw new Error('TODO(reto): handleOrderEvent');
  }

  private updateLocalOrder(eventData: OrderEvent): void {
    throw new Error('TODO(reto): updateLocalOrder');
  }

  private handleSSEError(): void {
    throw new Error('TODO(reto): handleSSEError');
  }

  private disconnectFromSSE(): void {
    throw new Error('TODO(reto): disconnectFromSSE');
  }

  private loadInitialOrders(): void {
    throw new Error('TODO(reto): loadInitialOrders');
  }

  retryConnection(): void {
    throw new Error('TODO(reto): retryConnection');
  }

  getStatusClass(status: OrderStatus): string {
    throw new Error('TODO(reto): getStatusClass');
  }
}