import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { createError } from "../utils/error.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    console.log("cookie auth done", req.cookies);
    try {
      // Get token from cookie
      token = req.cookies.token;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      return next(createError(401, "Not authorized, token failed"));
    }
  }

  if (!token) {
    return next(createError(401, "Not authorized, no token"));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        createError(
          403,
          `User role ${req.user.role} is not authorized to access this route`
        )
      );
    }
    next();
  };
};
