import { Router } from "express";

const router = Router();
const CommentController = require("../controllers/comment");
import { authenticate } from "../middleware/authMiddleware";

router.use(authenticate); // Add authentication middleware to all routes

router.post("/", (req, res) => {
  CommentController.createComment(req, res);
});

router.get("/id/:id", (req, res) => {
  CommentController.getCommentById(req, res);
});

router.get("/postId/:postId", (req, res) => {
  CommentController.getCommentsByPost(req, res);
});

router.put("/:id", (req, res) => {
  CommentController.updateComment(req, res);
});

router.delete("/:id", (req, res) => {
  CommentController.deleteComment(req, res);
});

export default router;
