import { OrderEvent } from '../models/order-event.model';

export interface OrderEventHandlerPort {
  /**
   * Maneja un evento de orden recibido.
   * @param event Evento de orden a manejar
   */
  handle(event: OrderEvent): Promise<void>;
}