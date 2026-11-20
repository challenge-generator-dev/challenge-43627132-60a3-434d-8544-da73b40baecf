import { Component, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Order } from '../../../core/models/order.model';
import { StatusPipe } from '../../pipes/status.pipe';

// Tarjeta presentacional: recibe una orden por entrada y muestra su estado y total.
// La lógica de color de estado pertenece a la pieza de estado de pedido y se consume desde allí.
@Component({
  selector: 'app-order-status-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatDividerModule, StatusPipe],
  templateUrl: './order-status-card.component.html',
  styleUrls: ['./order-status-card.component.scss']
})
export class OrderStatusCardComponent {
  @Input() order!: Order;

  totalAmount = computed(() => {
    const items = this.order?.items ?? [];
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  itemCount = computed(() => {
    const items = this.order?.items ?? [];
    return items.reduce((count, item) => count + item.quantity, 0);
  });

  hasItems(): boolean {
    return (this.order?.items?.length ?? 0) > 0;
  }

  formatTotal(amount: number): string {
    return amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
  }
}