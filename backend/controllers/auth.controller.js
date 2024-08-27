import { createRateLimiter } from "../middleware/rateLimiter.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 attempts
  message: "Too many login attempts, please try again later.",
});

export const register = [
  authRateLimiter,
  async (req, res, next) => {
    try {
      const { username, email, password, ...otherDetails } = req.body;

      // Check for existing email or username
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        const conflictField =
          existingUser.email === email ? "Email" : "Username";
        return next(createError(400, `${conflictField} is already in use.`));
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create and save the new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        ...otherDetails,
      });
      const savedUser = await newUser.save();

      // Return user details excluding the password
      const { password: _, ...userDetails } = savedUser._doc;

      res.status(201).json({
        success: true,
        message: "User successfully registered.",
        user: userDetails,
      });
    } catch (error) {
      console.error("Registration error:", error);
      next(error);
    }
  },
];

export const login = [
  authRateLimiter, // Apply rate limiting middleware
  async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      // Find user by username or email
      const user = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (!user) return next(createError(404, "User not found"));

      // Validate password
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return next(createError(400, "Invalid username, email, or password"));
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET || "defaultSecret",
        { expiresIn: "1h" }
      );

      // Set secure cookie options
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(200)
        .json({
          message: "Login successful",
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          token, // Optionally exclude this if using only cookies
        });
    } catch (error) {
      console.error("Login error:", error.message);
      next(createError(500, "Internal Server Error"));
    }
  },
];
