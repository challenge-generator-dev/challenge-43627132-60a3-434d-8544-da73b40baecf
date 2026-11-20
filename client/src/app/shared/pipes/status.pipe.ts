import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from '../../core/models/order.model';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {
  transform(value: OrderStatus | string): string {
    if (!value) {
      return '';
    }

    const status = typeof value === 'string' ? value as OrderStatus : value;

    switch (status) {
      case OrderStatus.PENDING:
        return 'Pendiente';
      case OrderStatus.PROCESSING:
        return 'En proceso';
      case OrderStatus.SHIPPED:
        return 'Enviado';
      case OrderStatus.DELIVERED:
        return 'Entregado';
      case OrderStatus.CANCELLED:
        return 'Cancelado';
      default:
        return status;
    }
  }

  getStatusColor(status: OrderStatus | string): string {
    const statusValue = typeof status === 'string' ? status as OrderStatus : status;

    switch (statusValue) {
      case OrderStatus.PENDING:
        return '#FFC107';
      case OrderStatus.PROCESSING:
        return '#2196F3';
      case OrderStatus.SHIPPED:
        return '#4CAF50';
      case OrderStatus.DELIVERED:
        return '#8BC34A';
      case OrderStatus.CANCELLED:
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  }
}