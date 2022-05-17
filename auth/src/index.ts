import mongoose from "mongoose";

import { app } from "./app";

const PORT = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must provided");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must provided");
  }

  try {
    // await mongoose.connect(process.env.MONGO_URI);
    // console.log("Auth database connected to DB");
  } catch (e) {
    console.log("Error connection to auth database", e);
  }

  app.listen(PORT, () => {
    console.log("Auth service listening on port", PORT);
  });
};

start();
