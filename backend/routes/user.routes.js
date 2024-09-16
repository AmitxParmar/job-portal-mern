import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  changePassword,
} from "../controllers/user.controller.js";
/* import { protect } from "../middleware/auth.middleware.js"; */

const router = express.Router();
router.get("/", getAllJobSeekers);
router.get("/get-user/:id", /* protect, */ getUserProfile);
router.put("/update-user/:id", /* protect, */ updateUserProfile);
router.delete("/delete/:id", /* protect, */ deleteUserAccount);
router.put("/change-password/:id", /* protect, */ changePassword);

export default router;
