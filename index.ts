import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import { Connection } from "mysql2/promise";
// const { connectMySQL } = require("./connection");
require("dotenv").config();

const app: Express = express();
// const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());


// let connection: Connection;

// app.get("/users", async (req : Request, res: Response) => {
//   try {
//     const [results] = await connection.query("SELECT * FROM users");
//     res.json(results);
//   } catch (error: any) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

app.listen(process.env.BE_PORT, async () => {
  console.log("HTTP server running at port", process.env.BE_PORT);
});