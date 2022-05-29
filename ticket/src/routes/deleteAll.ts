import { requireAuth } from "@cygnetops/common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.delete("/api/tickets/deleteAll", requireAuth, async (req, res) => {
  const t = await Ticket.deleteMany();
  res.send(t);
});

export { router as deleteAll };
