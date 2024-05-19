import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from 'cookie-parser'
import { connectDB } from "./db/connectDB.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser())
config();

import compilerRouter from "./routes/compiler.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/compiler", compilerRouter);
app.use("/user", userRouter);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
