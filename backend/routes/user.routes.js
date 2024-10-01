import {
  addEducation,
  removeEducation,
  updateEducation,
} from "../controllers/user/education.controller.js";
import {
  addExperience,
  removeExperience,
  updateExperience,
} from "../controllers/user/experience.controller.js";
import {
  addProject,
  removeProject,
  updateProject,
} from "../controllers/user/projects.controller.js";
import {
  changePassword,
  deleteUserAccount,
  getUserProfile,
  toggleBookmarkJob,
  updateProfile,
  updateUserAuth,
} from "../controllers/user/user.controller.js";

import express from "express";

const router = express.Router();
// User routes
router.get("/:userId", getUserProfile);
router.put("/:userId/auth", updateUserAuth);
router.put("/:userId/profile", updateProfile);
router.delete("/:userId", deleteUserAccount);
router.put("/:userId/password", changePassword);
router.put("/:jobId/toggle-bookmark", toggleBookmarkJob);

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
