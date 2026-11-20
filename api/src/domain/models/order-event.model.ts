import { IsDate, IsEnum, IsString } from 'class-validator';

export enum OrderStatus {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class OrderItem {
  @IsString()
  productId: string;

  @IsString()
  quantity: number;

  @IsString()
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

  @IsString({ each: true })
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

  @IsDate()
  timestamp: Date;

  constructor(id: string, orderId: string, status: OrderStatus, timestamp: Date) {
    this.id = id;
    this.orderId = orderId;
    this.status = status;
    this.timestamp = timestamp;
  }
}