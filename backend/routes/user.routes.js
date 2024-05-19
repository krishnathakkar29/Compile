import express from "express";
import { getMyCodes, login, logout, signup, userDetails } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

userRouter.get("/user-details", verifyToken ,  userDetails);
userRouter.get("/my-codes", verifyToken ,  getMyCodes);

export default userRouter
