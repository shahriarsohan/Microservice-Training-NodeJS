import Express from "express";
import { currentUser } from "@cygnetops/common";

const router = Express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  console.log(req.session);
  res.send({
    currentUser: req.currentUser,
  });
});

export { router as currentUserRouter };
