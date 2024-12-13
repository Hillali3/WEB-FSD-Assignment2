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
