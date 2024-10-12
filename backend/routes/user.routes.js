import {
  fetchCurrentUser,
  changePassword,
  deleteUserAccount,
  getUserProfile,
  toggleBookmarkJob,
  updateProfile,
  updateUserAuth,
} from "../controllers/user/user.controller.js";
import {
  getEducations,
  addEducation,
  removeEducation,
  updateEducation,
} from "../controllers/user/education.controller.js";
import {
  getExperiences,
  addExperience,
  removeExperience,
  updateExperience,
} from "../controllers/user/experience.controller.js";
import {
  getProjects,
  addProject,
  removeProject,
  updateProject,
} from "../controllers/user/projects.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

import express from "express";

const router = express.Router();

router.use(protect);
// user can update their own data
router.get("/current-user", protect, fetchCurrentUser);

// User routes
// (public route used to fetch specific user data)
router.get("/:userId", authorize("recruiter"), getUserProfile);

router.put("/auth-update", updateUserAuth);
router.put("/profile-update", updateProfile);
router.delete("/delete", deleteUserAccount);
router.put("/change-password", changePassword);
router.put("/:jobId/toggle-bookmark", toggleBookmarkJob);

// Education routes
router.get("/get-educations", getEducations);
router.post("/add-education", addEducation);
router.put("/update-education/:eduId", updateEducation);
router.delete("/delete-education/:eduId", removeEducation);

// Experience routes
router.get("/get-experiences", getExperiences);
router.post("/add-experience", addExperience);
router.put("/update-experience/:expId", updateExperience);
router.delete("/experience/:expId", removeExperience);

// Projects routes
router.get("/get-projects", getProjects);
router.post("/add-project", addProject);
router.put("/update-project/:projectId", updateProject);
router.delete("/delete-project/:projectId", removeProject);

export default router;
