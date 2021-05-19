import mongoose from "mongoose";

// Route Handlers
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find({});

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

  res.send("THIS WORKS!");
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    // Save to DB
    await newPost.save();

    // Successful Creation
    res.status(201).json(newPost);
  } catch (error) {
    // Unsuccessful Creation
    res.status(409).json({ message: error.message });
  }

  res.send("Post Creation");
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  // Check
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  // If post exists update it
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  // Return Post
  res.json(updatedPost);
};