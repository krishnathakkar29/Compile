import express from "express";
import {
  deleteCode,
  editCode,
  getAllCodes,
  loadCode,
  saveCode,
} from "../controllers/compiler.controller.js";
import { verifyTokenAnonymous } from "../middlewares/verifyAnonymousToken.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const compilerRouter = express.Router();

compilerRouter.post("/save", verifyTokenAnonymous, saveCode);
compilerRouter.post("/load", verifyTokenAnonymous, loadCode);
compilerRouter.delete("/delete/:id", verifyToken, deleteCode);
compilerRouter.put("/edit/:id", verifyToken, editCode);
compilerRouter.get("/get-all-codes", getAllCodes);

export default compilerRouter;
