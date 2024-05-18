import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    fullCode: {
      html: String,
      css: String,
      javascript: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Code = mongoose.model("Code", codeSchema);
