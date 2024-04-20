import express from "express";
import { merge, get } from "lodash";
import jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    //Decoding the token
    const decodedToken = jwt.verify(
      token.split(" ")[1],
      "secretkeyappearshere"
    ) as {
      userId: string;
    };

    console.log(decodedToken);
    merge(req, { currentUserId: decodedToken.userId });
    return next();
  } catch (error) {
    return res.sendStatus(400);
  }
};
