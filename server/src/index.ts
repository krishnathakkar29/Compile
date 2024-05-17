import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./lib/connectDB";
import { compilerRouter } from "./routes/compilerRouter";

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());
config();

app.use('/compiler', compilerRouter)

connectDB();
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
