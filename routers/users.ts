import { Router, Request, Response } from "express";
import { verifyToken } from "../middleware";

const connection = require("../utils/connection.ts");
const jwt = require("jsonwebtoken");
const router = Router();

require("dotenv").config();

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  last_login: Date;
}

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    await connection("users")
      .select("*")
      .then((users: User) => {
        res.json(users);
      });
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const { username, email, password } = req.body;
//     await connection("users")
//       .insert({
//         id: uuidv4(),
//         email,
//         username,
//         password,
//       })
//       .then(() => {
//         res.json({
//           message: "create user successful",
//           user: req.body,
//         });
//       });
//   } catch (error: any) {
//     res.json({
//       status: res.status,
//       message: error.message,
//     });
//     console.error({});
//   }
// });

export default router;
