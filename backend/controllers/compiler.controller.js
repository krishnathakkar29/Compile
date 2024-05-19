import { Code } from "../models/code.model.js";

const saveCode = async (req,res) => {
  try {
    const  fullCode  = req.body;

    if(!fullCode.html && !fullCode.css && !fullCode.javascript){
      return res.status(400).send({message: "Code Cannot be Empty"})
    }

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

const loadCode = async (req, res, next) => {
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


export {loadCode , saveCode}