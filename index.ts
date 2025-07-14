import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usersRouter from "./routers/users";
import AuthenticationRouter from "./routers/authentication";

require("dotenv").config();
const cookieParser = require("cookie-parser");

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Router
app.use("/users", usersRouter)
app.use("/authentication", AuthenticationRouter);

app.listen(process.env.BE_PORT, async () => {
  console.log("HTTP server running at port", process.env.BE_PORT);
});