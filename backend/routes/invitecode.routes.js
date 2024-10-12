import { Router } from "express";
import {
  generateInviteCode,
  verifyInviteCode,
} from "../controllers/invitecode.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protect);
// Generate invite code (Only admins should be allowed to generate codes)
router.post("/generate", authorize("recruiter"), generateInviteCode);

// Verify invite code during registration
router.post("/verify", verifyInviteCode);

export default router;
