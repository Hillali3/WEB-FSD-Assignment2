import { Request, Response } from "express";
import Post from "../models/post";
import mongoose from "mongoose";

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  const { userId, title, content } = req.body;

  if (!userId || !title || !content) {
    return res
      .status(400)
      .json({ message: "UserId, title and content are required" });
  }

  try {
    const newPost = new Post({ userId, title, content });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Error creating post", error });
  }
};

// Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get post by id
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post is not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// Get all posts by by user id
export const getPostByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ userId });
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get all posts by by username
export const getPostByUsername = async (req: Request, res: Response) => {
  const username = req.params.username;

  try {
    const posts = await Post.find({ username });
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts found for this username" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching posts", error });
  }
};

//update post by id
export const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, content, sender } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, sender },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post", error });
  }
};
