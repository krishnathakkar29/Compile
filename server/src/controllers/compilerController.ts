import { Request, Response } from "express";
import { Code } from "../models/code.model";

export const saveCode = async (req:Request,res: Response) => {
try {

    const {fullCode} = req.body;

    const newCode = await Code.create({
        fullCode: fullCode
    })

    return res.status(201).send(newCode)
    
} catch (error) {
    res.status(500).send({
        message: "Error while saving code",
        error
    })
}
}