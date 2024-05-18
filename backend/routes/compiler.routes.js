import express from "express";
import { loadCode, saveCode } from "../controllers/compiler.controller.js";

const compilerRouter = express.Router();

compilerRouter.post("/save", saveCode);
compilerRouter.post("/load", loadCode);

export default compilerRouter;