import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { User } from "../models/User.js";
import { createError } from "../utils/error.js";

export const applyForJob = async (req, res, next) => {
  try {
    const { jobId, notes } = req.body;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return next(createError(404, "Job not found!"));

    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found!"));

    // Check if the user has already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication)
      return next(createError(400, "You have already applied for this job!"));

    const newApplication = new Application({
      job: jobId,
      applicant: userId,
      notes,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    next(error);
  }
};

// Get all applications for a job (for employers)
export const getJobApplications = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) return next(createError(404, "Job not found!"));

    const applications = await Application.find({ job: jobId }).populate(
      "applicant",
      "username email profile"
    );
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

// Get all applications by a user (for job seekers)
export const getUserApplications = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found!"));

    const applications = await Application.find({ applicant: userId }).populate(
      "job",
      "title company location"
    );
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

// Update application status (for employers)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId);
    if (!application) return next(createError(404, "Application not found!"));

    application.status = status;
    const updatedApplication = await application.save();
    res.status(200).json(updatedApplication);
  } catch (error) {
    next(error);
  }
};
