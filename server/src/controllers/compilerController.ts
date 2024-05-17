import { Request, Response } from "express";
import { Code } from "../models/code.model";

export const saveCode = async (req: Request, res: Response) => {
  try {
    const { fullCode } = req.body;

    const newCode = await Code.create({
      fullCode: fullCode,
    });

    return res.status(201).send({ url: newCode._id, status: "saved" });
  } catch (error) {
    res.status(500).send({
      message: "Error while saving code",
      error,
    });
  }
};

export const loadCode = async (req: Request, res: Response) => {
  try {
    const { urlId } = req.body;

    const existingCode = await Code.findById(urlId);

    if (!existingCode) {
      return res.status(404).send({
        message: "Code not found",
      });
    }

    return res.status(201).send({
      fullCode: existingCode.fullCode
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while loading code",
      error,
    });
  }
};
