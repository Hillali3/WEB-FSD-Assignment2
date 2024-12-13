import { Router } from "express";

const postController = require("../controllers/post");
const router = Router();
import { authenticate } from "../middleware/authMiddleware";

router.use(authenticate); // Add authentication middleware to all routes

router.post("/", (req, res) => {
  postController.createPost(req, res);
});

router.get("/", (req, res) => {
  postController.getPosts(req, res);
});

router.get("/id/:id", (req, res) => {
  postController.getPostById(req, res);
});

router.get("/userId/:userId", (req, res) => {
  postController.getPostByUserId(req, res);
});

router.get("/username/:username", (req, res) => {
  postController.getPostByUsername(req, res);
});

router.put("/:id", (req, res) => {
  postController.updatePost(req, res);
});

router.delete("/:id", (req, res) => {
  postController.deletePost(req, res);
});

export default router;
