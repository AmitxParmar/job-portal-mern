import express from "express";
import { jobControllers } from "../controllers/user/job.controller.js";

// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", jobControllers.createJob);
router.get("/", jobControllers.getAllJobs);
router.get("/:id", jobControllers.getJobById);
router.put("/:id", jobControllers.updateJob);
router.delete("/:id", jobControllers.deleteJob);
/* router.post("/:id/apply", jobControllers.applyForJob); */
router.get("/recruiter/jobs", jobControllers.getRecruiterJobs);

export default router;
