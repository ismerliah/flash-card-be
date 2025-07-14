import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";

const connection = require("../utils/connection.ts");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const saltRounds = 10;

const router = Router();

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  last_login: Date;
}

// Register
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    await connection("users")
      .insert({
        id: uuidv4(),
        email,
        username,
        password: hash,
      })
      .then(() => {
        res.json({
          message: "create user successful",
          user: {
            username,
            email,
          },
        });
      });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

// Sign in
router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await connection("users")
      .select()
      .where("email", email)
      .first()
      .then((user: User) => {
        bcrypt
          .compare(password, user.password)
          .then((isAuthenticated: boolean) => {
            if (isAuthenticated) {
              const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              res.cookie("token", token, {
                maxAge: 3600000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
              });
              res.json({
                message: "sign in successful",
                token: token,
              });
            } else {
              res.status(401).json({
                message: "invalid email or password",
              });
            }
          });
      });
  } catch (error: any) {
    res.json({
      message: error.message,
    });
  }
});

export default router;
