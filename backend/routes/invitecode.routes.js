import { Router } from "express";
import {
  generateInviteCode,
  verifyInviteCode,
} from "../controllers/invitecode.controller.js";
/* import { verifyToken, isAdmin } from "../middlewares/authMiddleware"; */

const router = Router();

// Generate invite code (Only admins should be allowed to generate codes)
router.post("/generate", /* verifyToken, isAdmin, */ generateInviteCode);

// Verify invite code during registration
router.post("/verify", verifyInviteCode);

export default router;
