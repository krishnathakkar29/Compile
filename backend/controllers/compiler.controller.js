import { Code } from "../models/code.model.js";
import { User } from "../models/user.model.js";

const saveCode = async (req, res) => {
  try {
    const { fullCode, title } = req.body;
    console.log("\neh hai title \n", title);
    let ownerName = "Anonymous";
    let ownerInfo = undefined;
    let isAuthenticated = false;
    let user = undefined;

    if (req._id) {
      user = await User.findById(req._id);
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      ownerName = user?.username;
      ownerInfo = user._id;
      isAuthenticated = true;
    }

    if (!fullCode.html && !fullCode.css && !fullCode.javascript) {
      return res.status(400).send({ message: "Code Cannot be Empty" });
    }

    const newCode = await Code.create({
      fullCode: fullCode,
      ownerName: ownerName,
      ownerInfo: ownerInfo,
      title: title,
    });

    if (isAuthenticated && user) {
      user?.savedCodes.push(newCode._id);
      await user.save();
    }

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
    let isOwner = false;

    const existingCode = await Code.findById(urlId);

    if (!existingCode) {
      return res.status(404).send({
        message: "Code not found",
      });
    }

    const user = await User.findById(req._id);
    if (user?.username == existingCode.ownerName) {
      isOwner = true;
    }

    return res.status(201).send({
      fullCode: existingCode.fullCode,
      isOwner,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error while loading code",
      error,
    });
  }
};

const deleteCode = async (req, res) => {
  try {
    const userId = req._id;
    const owner = await User.findById(userId);
    const { id } = req.params;

    if (!owner) {
      return res.status(404).send({ message: "Cannot find potential owner!" });
    }
    const existingCode = await Code.findById(id);

    if (!existingCode) {
      return res.status(200).send({ message: "Code not found" });
    }

    if (existingCode.ownerName != owner.username) {
      return res
        .status(404)
        .send({ message: "You don't have permission to delete this code" });
    }

    const deleteCode = await Code.findByIdAndDelete(id);
    if (deleteCode) {
      return res.status(200).send({ message: "Code Deleted Successfully" });
    } else {
      return res.status(200).send({ message: "Code not found" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error deleting code",
      error,
    });
  }
};

const editCode = async (req, res) => {
  const userId = req._id;
  const postId = req.params.id;
  const fullCode = req.body;
  try {
    const owner = await User.findById(userId);
    if (!owner) {
      return res.status(404).send({ message: "cannot find owner!" });
    }
    const existingPost = await Code.findById(postId);
    if (!existingPost) {
      return res.status(404).send({ message: "Cannot find post to edit!" });
    }
    if (existingPost.ownerName !== owner.username) {
      return res
        .status(400)
        .send({ message: "You don't have permission to edit this post!" });
    }
    await Code.findByIdAndUpdate(postId, {
      fullCode: fullCode,
    });
    return res.status(200).send({ message: "Post updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error editing code!", error });
  }
};

const getAllCodes = async (req, res) => {
  try {
    const allCodes = await Code.find().sort({ createdAt: -1 });
    return res.status(200).send(allCodes);
  } catch (error) {
    return res.status(500).send({ message: "Error editing code!", error });
  }
};

export { loadCode, saveCode, deleteCode, editCode, getAllCodes };
