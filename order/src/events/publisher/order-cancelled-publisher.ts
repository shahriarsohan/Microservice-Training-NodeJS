import { Publisher, OrderCancelledEvent, Subjects } from "@cygnetops/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
