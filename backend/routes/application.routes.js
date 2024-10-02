import {
  applyForJob,
  getJobApplications,
  getUserApplications,
  updateApplicationStatus,
} from "../controllers/application.controller.js";

import { Router } from "express";

const router = Router();

router.post("/:jobId/apply", applyForJob);
/* router.post("/apply", verifyToken, applyForJob); */

router.get("/job/:jobId/applications", /* verifyToken, */ getJobApplications);
router.get("/user/applications", /* verifyToken, */ getUserApplications);
router.put(
  "/application/:id/status",
  /* verifyToken, */ updateApplicationStatus
);

export default router;
