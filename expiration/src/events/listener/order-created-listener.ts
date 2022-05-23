import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@cygnetops/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-name";

export class OrderCreateListener extends Listener<OrderCreatedEvent> {
  queueGroupName: string = queueGroupName;
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  async onMessage(
    data: {
      id: string;
      version: number;
      status: OrderStatus;
      userId: string;
      expiresAt: string;
      ticket: { id: string; price: number };
    },
    msg: Message
  ) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("waiting this many ms to process the jobs", delay);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      { delay }
    );

    msg.ack();
  }
}
