import express from "express";

const router = express.Router();

router.get("/api/ticket/new", (req, res) => {
  res.status(200).send({ success: "OK" });
});

export { router as newRouter };
