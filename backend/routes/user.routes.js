import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  changePassword,
} from "../controllers/user.controller.js";
/* import { protect } from "../middleware/auth.middleware.js"; */

const router = express.Router();

router.get("/profile", /* protect, */ getUserProfile);
router.put("/profile", /* protect, */ updateUserProfile);
router.delete("/account", /* protect, */ deleteUserAccount);
router.put("/change-password", /* protect, */ changePassword);

export default router;
