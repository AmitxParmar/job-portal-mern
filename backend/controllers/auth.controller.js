import { createRateLimiter } from "../middleware/rateLimiter.js";
import { User } from "../models/User.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 attempts
  message: "Too many login attempts, please try again later.",
});

export const register = [
  authRateLimiter, // Optional middleware for rate-limiting
  async (req, res, next) => {
    try {
      const { email, password, ...otherDetails } = req.body;

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(createError(400, "Email is already in use."));
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create and save new user
      const newUser = new User({
        email,
        password: hashedPassword,
        ...otherDetails,
      });
      const savedUser = await newUser.save();

      // Exclude password from the response
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
  // authRateLimiter,
  async (req, res, next) => {
    console.log("Login attempt", {
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return next(createError(400, "Email and password are required"));
      }

      // Find user by email
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(createError(401, "Invalid credentials"));
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(createError(401, "Invalid credentials"));
      }

      // Respond with user details (without sensitive information)
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });

      console.log("Login successful for user:", user._id);
    } catch (error) {
      console.error("Login error:", error);
      next(createError(500, "An unexpected error occurred during login"));
    }
  },
];

// Forget Password Function
export const forgetPassword = async (req, res, next) => {
  try {
    const { email, newPassword } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "User not found"));

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been successfully updated.",
    });
  } catch (error) {
    console.error("Forget password error:", error);
    next(createError(500, "Internal Server Error"));
  }
};
