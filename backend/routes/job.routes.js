import express from "express";
import { jobControllers } from "../controllers/user/job.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);

router.post("/", jobControllers.createJob);
router.get("/", jobControllers.getAllJobs);
router.get("/:jobId", jobControllers.getJobById);
router.put("/:jobId", jobControllers.updateJob);
router.delete("/:jobId", jobControllers.deleteJob);

router.get(
  "/recruiter/jobs",
  authorize("recruiter"),
  jobControllers.getRecruiterJobs
);

export default router;
