import { Request, Response } from 'express';
import Comment from '../models/comment';
import Post from '../models/post';
import User from '../models/user';

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
  const { postId, userId, text } = req.body;
  console.log("req.body", req.body);
  if (!postId || !userId || !text) {
    return res.status(400).json({ message: 'PostId, UserId, and text are required' });
  }

  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newComment = new Comment({
      postId,
      userId,
      text,
    });

    await newComment.save();

    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating comment', error });
  }
};

// Get all comments for a specific post
export const getCommentsByPost = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ postId });

    if (comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching comments', error });
  }
};

// Get a specific comment by id
export const getCommentById = async (req: Request, res: Response) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId)
    
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching comment', error });
  }
};

// Update a comment
export const updateComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Text is required to update the comment' });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true, runValidators: true }
    )
    
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating comment', error });
  }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting comment', error });
  }
};