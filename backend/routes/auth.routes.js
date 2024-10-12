import {
  register,
  login,
  logout,
  forgetPassword,
  resetPassword,
  verifyEmail,
  refreshToken,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validation.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/logout", protect, logout);
router.post("/forget-password", forgetPassword);
router.put("/reset-password/:token", resetPassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/refresh-token", refreshToken);

export default router;
