import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  bookmarkJob,
  getBookmarkedJobs,
  applyForJob,
  getJobApplications,
  getAllJobListingsByEmployer,
} from "../controllers/job.controller.js";
/* import { verifyToken, verifyRole } from "../middleware/authMiddleware.js"; */

const router = express.Router();

// Route to create a new job (employer only)
router.post("/create", /* verifyToken, verifyRole("employer"), */ createJob);

// Route to get all available jobs (public)
router.get("/", getAllJobs);

// Route to get a single job by its ID (public)
router.get("/:id", getJobById);

// Route to update a job (employer only)
router.put("/:id/update", /* verifyToken, verifyRole("employer"), */ updateJob);

// Route to delete a job (employer only)
router.delete(
  "/:id/delete",
  /* verifyToken,
  verifyRole("employer"), */
  deleteJob
);

// Route to bookmark a job (job seeker only)
router.post(
  "/:id/bookmark-job",
  /* verifyToken,
  verifyRole("jobSeeker"), */
  bookmarkJob
);

// Get bookmarked jobs
router.get("/bookmarks", getBookmarkedJobs);

// Route to unbookmark a job (job seeker only)
//router.post(
// "/:id/unbookmark",
//verifyToken,
//  verifyRole("jobSeeker"),
// unbookmarkJob
//);

// Route to apply for a job (job seeker only)
router.post(
  "/:id/apply",
  /* verifyToken,
  verifyRole("jobSeeker"), */
  applyForJob
);

// Route to get all applications for a job (employer only)
router.get(
  "/:id/applications",
  /* verifyToken,
  verifyRole("employer"), */
  getJobApplications
);
// Route to get all job listings by a specific employer
router.get("/employer/:id/jobs", getAllJobListingsByEmployer);

export default router;
