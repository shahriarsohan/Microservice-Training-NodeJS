import { Message } from "node-nats-streaming";

import { Subjects, Listener, TicketUpdatedEvent } from "@cygnetops/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    console.log(data);

    const ticket = await Ticket.findById(data);

    if (!ticket) {
      throw new Error("ticket not found");
    }

    const { title, price } = data;

    ticket.set({ title, price });

    await ticket.save();

    msg.ack();
  }
}
