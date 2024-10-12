import { protect, authorize } from "../middleware/auth.middleware.js";
import {
  applyForJob,
  getJobApplications,
  getUserApplications,
  updateApplicationStatus,
  getRecruiterDashboard,
} from "../controllers/application.controller.js";

import { Router } from "express";

const router = Router();
router.use(protect);

// For Recruiters NOTE: add authorize('recruiter') later
router.get("/recruiter/dashboard", getRecruiterDashboard);
router.get(
  "/:jobId/get-job-applications",
  authorize("recruiter"),
  getJobApplications
);
router.put(
  "/update-status/:applicationId/:status",
  authorize("recruiter"),
  updateApplicationStatus
);

// For Job Seekers
router.post("/:jobId/apply", applyForJob);
router.get("/get-user-applications", getUserApplications);

export default router;
