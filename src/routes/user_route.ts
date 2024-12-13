import { Router } from "express";

const router = Router();
const authController = require("../controllers/auth");

router.post("/login", (req, res) => {
  authController.login(req, res);
});
router.post("/register", (req, res) => {
  authController.register(req, res);
});
router.post("/logout", (req, res) => {
  authController.logout(req, res);
});

export default router;
