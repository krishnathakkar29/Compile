import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    fullCode: {
      html: String,
      css: String,
      javascript: String,
    },
    title:{
      type:String,
      required: true
    },
    ownerName: {
      type: String
    },
    ownerInfo:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
  },
  {
    timestamps: true,
  }
);

export const Code = mongoose.model("Code", codeSchema);
