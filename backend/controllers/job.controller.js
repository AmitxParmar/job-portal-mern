import Job from "../models/Job.js";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      description,
      company,
      salary,
      location,
      jobType,
      requirements,
      employer, // This is assumed to be the employer ID
    } = req.body;

    const newJob = new Job({
      title,
      description,
      company,
      salary,
      location,
      jobType,
      requirements,
      employer, // Set the employer field with the userId from the request
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
};

// Get all jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const {
      title,
      location,
      minSalary,
      maxSalary,
      skillsRequired,
      status,
      postedAfter,
      postedBefore,
    } = req.query;

    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };
    if (minSalary) filter["salaryRange.min"] = { $gte: Number(minSalary) };
    if (maxSalary) filter["salaryRange.max"] = { $lte: Number(maxSalary) };
    if (skillsRequired)
      filter.skillsRequired = { $in: skillsRequired.split(",") };
    if (status) filter.status = status;
    if (postedAfter) filter.postedAt = { $gte: new Date(postedAfter) };
    if (postedBefore)
      filter.postedAt = { ...filter.postedAt, $lte: new Date(postedBefore) };

    const jobs = await Job.find(filter);
    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

// Get a single job by ID
export const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return next(createError(404, "Job not found!"));
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

// Update a job (only for the creator)
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return next(createError(404, "Job not found!"));

    if (job.employer.toString() !== req.user.id) {
      return next(createError(403, "You can only update your own jobs!"));
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    next(error);
  }
};

// Delete a job (only for the creator)
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return next(createError(404, "Job not found!"));

    /*  if (job.employer.toString() !== req.user.id) {
      return next(createError(403, "You can only delete your own jobs!"));
    }
 */
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job has been deleted." });
  } catch (error) {
    next(error);
  }
};

// Bookmark a job
export const bookmarkJob = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const jobId = req.params.id;

    // Check if the job is already bookmarked
    const bookmarkIndex = user.bookmarkedJobs.indexOf(jobId);

    if (bookmarkIndex > -1) {
      // Job is already bookmarked, so remove it (toggle off)
      user.bookmarkedJobs.splice(bookmarkIndex, 1);
      await user.save();
      return res
        .status(200)
        .json({ message: "Job unbookmarked successfully." });
    } else {
      // Job is not bookmarked, so add it (toggle on)
      user.bookmarkedJobs.push(jobId);
      await user.save();
      return res.status(200).json({ message: "Job bookmarked successfully." });
    }
  } catch (error) {
    next(error);
  }
};

// Unbookmark a job
/* export const unbookmarkJob = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const jobId = req.params.id;
    if (!user.bookmarkedJobs.includes(jobId)) {
      return next(createError(400, "Job not bookmarked!"));
    }

    user.bookmarkedJobs.pull(jobId);
    await user.save();

    res.status(200).json({ message: "Job unbookmarked successfully." });
  } catch (error) {
    next(error);
  }
};
 */
// Get all unique job locations
export const getJobLocations = async (req, res, next) => {
  try {
    const locations = await Job.distinct("location");

    if (!locations || locations.length === 0) {
      return res.status(404).json({ message: "No job locations found." });
    }

    res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

// Get Bookmarked Jobs
export const getBookmarkedJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("bookmarkedJobs");
    if (!user) return next(createError(404, "User not found!"));

    res.status(200).json(user.bookmarkedJobs);
  } catch (error) {
    next(error);
  }
};

// Apply for a job
export const applyForJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return next(createError(404, "Job not found!"));

    // Check if the user has already applied
    if (job.applicants.some((app) => app.user.toString() === req.user.id)) {
      return next(createError(400, "You have already applied for this job!"));
    }

    job.applicants.push({
      user: req.user.id,
      resume: req.body.resume, // Assuming you send a resume URL or file link
      coverLetter: req.body.coverLetter,
    });

    await job.save();

    res.status(200).json({ message: "Application submitted successfully." });
  } catch (error) {
    next(error);
  }
};

// Get all applications for a job (for employers)
export const getJobApplications = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "applications.user",
      "username email"
    );
    if (!job) return next(createError(404, "Job not found!"));

    if (job.employer.toString() !== req.user.id) {
      return next(
        createError(403, "You can only view applications for your own jobs!")
      );
    }

    res.status(200).json(job.applications);
  } catch (error) {
    next(error);
  }
};
