import {
  applyForJob,
  getJobApplications,
  getUserApplications,
  updateApplicationStatus,
  getRecruiterDashboard,
} from "../controllers/application.controller.js";

import { Router } from "express";

const router = Router();

router.post("/:jobId/apply", applyForJob);
/* router.post("/apply", verifyToken, applyForJob); */

router.get("/job/:jobId/applications", /* verifyToken, */ getJobApplications);
router.get("/user", /* verifyToken, */ getUserApplications);
router.put(
  "/application/:applicationId/:status",
  /* verifyToken, */ updateApplicationStatus
);

router.get("/recruiter/dashboard", /* verifyToken, */ getRecruiterDashboard);

export default router;
