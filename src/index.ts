import express, { Request, Response } from "express";
import postRoutes from "./routes/post_route";
import commentRoutes from "./routes/comment_route";
import userRoutes from "./routes/user_route";
import authRoutes from "./routes/auth_route";
import connectDB from "./config/db";
import setupSwaggerDocs from "./swagger";
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON request body
app.use(express.json());

// Use Swagger docs
setupSwaggerDocs(app);

// Register routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/users", userRoutes);

// Sample GET route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Post and Comment API!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
