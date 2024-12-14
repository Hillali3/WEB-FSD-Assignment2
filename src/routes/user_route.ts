/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - name
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               email:
 *                 type: string
 *                 description: The user's email
 *               password:
 *                 type: string
 *                 description: The user's password
 *               name:
 *                 type: string
 *                 description: The user's name
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/id/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/username/{username}:
 *   get:
 *     summary: Get a user by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
import { Router } from "express";

const router = Router();
const UserController = require("../controllers/user");
import { authenticate } from "../middleware/authMiddleware";

router.use(authenticate); // Add authentication middleware to all routes

router.post("/", (req, res) => {
  UserController.createUser(req, res);
});
router.get("/", (req, res) => {
  UserController.getUsers(req, res);
});
router.get("/id/:id", (req, res) => {
  UserController.getUserById(req, res);
});
router.get("/username/:username", (req, res) => {
  UserController.getUserByUsername(req, res);
});
router.put("/:id", (req, res) => {
  UserController.updateUser(req, res);
});
router.delete("/:id", (req, res) => {
  UserController.deleteUser(req, res);
});

export default router;
