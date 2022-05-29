import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@cygnetops/common";
import { createTicketRouter } from "./routes/new";
import { currentUser } from "./middleware/current-user";
import { showTicketRouter } from "./routes/showTicket";
import { updateTicketRouter } from "./routes/updateTicket";
import { indexTicketRouter } from "./routes";
import { deleteAll } from "./routes/deleteAll";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);
app.use(deleteAll);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
