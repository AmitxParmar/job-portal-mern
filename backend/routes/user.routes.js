import express from "express";
import {
  getUserProfile,
  updateUserAuthProfile,
  updateProfile,
  deleteUserAccount,
  changePassword,
} from "../controllers/user/user.controller.js";

import {
  /* getEducation, */
  addEducation,
  updateEducation,
  removeEducation,
} from "../controllers/user/education.controller.js";
import {
  /* getExperience, */
  addExperience,
  updateExperience,
  removeExperience,
} from "../controllers/user/experience.controller.js";
import {
  /* getProjects, */
  addProject,
  updateProject,
  removeProject,
} from "../controllers/user/projects.controller.js";

const router = express.Router();
// User routes
router.get("/:userId", getUserProfile);
router.put("/:userId", updateUserAuthProfile);
router.put("/:userId", updateProfile);
router.delete("/:userId", deleteUserAccount);
router.put("/:userId", changePassword);

/* // Profile routes
router.get("/:userId/profile", createOrUpdateProfile);
router.put("/:userId/profile", createOrUpdateProfile);
 */
// Education routes
/* router.get("/:userId/education", getEducation); */
router.post("/:userId/education", addEducation);
router.put("/:userId/education/:eduId", updateEducation);
router.delete("/:userId/education/:eduId", removeEducation);

// Experience routes
/* router.get("/:userId/experience", getExperience); */
router.post("/:userId/experience", addExperience);
router.put("/:userId/experience/:expId", updateExperience);
router.delete("/:userId/experience/:expId", removeExperience);

// Projects routes
/* router.get("/:userId/projects", getProjects); */
router.post("/:userId/projects", addProject);
router.put("/:userId/projects/:projectId", updateProject);
router.delete("/:userId/projects/:projectId", removeProject);

export default router;
