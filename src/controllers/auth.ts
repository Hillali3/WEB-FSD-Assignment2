import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/user";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtils";

// User Registration
export const register = async (req: Request, res: Response) => {
  const { username, name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, name, email, password: hashedPassword });
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Logout (Invalidate the refresh token)
export const logoutUser = async (req: Request, res: Response) => {
  // In a real-world scenario, you may invalidate the refresh token (e.g., remove from DB or store in blacklist)
  res.status(200).json({ message: "Logged out successfully" });
};
