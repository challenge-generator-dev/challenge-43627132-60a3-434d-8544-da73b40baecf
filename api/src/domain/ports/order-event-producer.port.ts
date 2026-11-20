import { OrderEvent } from '../models/order-event.model';

export interface OrderEventProducerPort {
  /**
   * Publica un evento de orden en el sistema de mensajería.
   * @param event Evento de orden a publicar
   * @returns Promise que se resuelve cuando el evento es publicado exitosamente
   * @throws Error si ocurre un fallo al publicar el evento
   */
  publish(event: OrderEvent): Promise<void>;
}