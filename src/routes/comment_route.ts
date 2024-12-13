import { Router } from "express";

const router = Router();
const CommentController = require("../controllers/comment");

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
