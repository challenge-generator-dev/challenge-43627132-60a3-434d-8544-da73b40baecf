import { IsString, IsNumber, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export class OrderItem {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}

export class Order {
  @IsString()
  id: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  constructor(id: string, status: OrderStatus, items: OrderItem[]) {
    this.id = id;
    this.status = status;
    this.items = items;
  }
}

export class OrderEvent {
  @IsString()
  id: string;

  @IsString()
  orderId: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsString()
  timestamp: Date;

  constructor(id: string, orderId: string, status: OrderStatus, timestamp: Date) {
    this.id = id;
    this.orderId = orderId;
    this.status = status;
    this.timestamp = timestamp;
  }
}