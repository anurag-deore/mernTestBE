import express from "express";
import { createUser, getUserByEmail } from "../db/userModel";
import { authentication, random } from "../helpers";
import jwt from "jsonwebtoken";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    let { email, password, username } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User Exists. Please login" });
    }
    const uId = random();
    const user = await createUser({
      Email: email,
      UserID: uId,
      Username: username,
      UserType: "admin",
      PasswordHash: authentication(password),
    });

    const token = jwt.sign(
      {
        userId: uId,
        username: user.Username,
      },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .json({
        userId: user.UserID,
        token: token,
        message: "SignUp Successfull",
      })
      .end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    let { email, password } = req.body;
    console.log(req.body);
    const existingUser = await getUserByEmail(email).select("+PasswordHash");
    console.log("existingUser", email);
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User does not Exists. Please Sign up" });
    }

    const expectedhash = authentication(password);
    if (expectedhash.toString() !== existingUser.PasswordHash.toString()) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jwt.sign(
      {
        userId: existingUser.UserID,
        username: existingUser.Username,
      },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );
    console.log("token", {
      userId: existingUser.UserID,
      username: existingUser.Username,
    });
    return res
      .status(200)
      .json({
        userID: existingUser.UserID,
        token,
        message: "Sign In Successful",
      })
      .end();
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
