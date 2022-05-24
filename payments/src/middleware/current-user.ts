import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.jWt) {
    console.log("asdggahhhhhhhhhhhhhhhsd", req.session.jWt);
  }

  console.log("asdggdfgdrgfasd", Object.values(req.rawHeaders).slice(-1)[0]);

  // if (!req.session?.jwt) {
  //   // console.log(req.session);
  //   console.log("request", req.session);
  //   return next();
  // }

  // try {
  //   const payload = jwt.verify(
  //     req.session.jwt,
  //     process.env.JWT_KEY!
  //   ) as UserPayload;
  //   req.currentUser = payload;
  // } catch (err) {}

  next();
};
