import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { User } from "../models/User.js";
import { createError } from "../utils/error.js";

const userId = "66ccb1ecb5e4de35acdbb80d"; // Hardcoded for testing
export const applyForJob = async (req, res, next) => {
  try {
    console.log("Request params:", req.params);
    const { jobId } = req.params;
    console.log("Job ID:", jobId);

    // In a real application, you'd get the userId from the authenticated user
    // const userId = req.user.id;

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return next(createError(404, "Job not found"));
    }

    // Check if an application already exists
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    let application;
    let message;

    if (existingApplication) {
      // If application exists, remove it
      const deletedApplication = await Application.findByIdAndDelete(
        deletedApplication._id
      );

      // Remove applicant from job
      await Job.findByIdAndUpdate(jobId, {
        $pull: { applicants: deletedApplication._id },
      });

      message = "Application removed successfully";
    } else {
      // If no application exists, create one
      application = new Application({
        job: jobId,
        applicant: userId,
      });
      const savedApplication = await application.save();

      // Add applicant to job
      await Job.findByIdAndUpdate(jobId, {
        $addToSet: { applicants: savedApplication._id },
      });

      message = "Applied for job successfully";
    }

    // Fetch the updated job
    const updatedJob = await Job.findById(jobId).populate("applicants");

    res.status(200).json({
      message,
      job: updatedJob,
      application: application || null,
    });
  } catch (error) {
    console.error("Error applying/unapplying for job:", error);
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
      "email"
    );
    res.status(200).json(applications);
  } catch (error) {
    next(error);
  }
};

// Get all applications by a user (for job seekers)
export const getUserApplications = async (req, res, next) => {
  try {
    /* const userId = req.user.id; */
    console.log("getUserApplication");
    const user = await User.findById(userId);
    if (!user) return next(createError(404, "User not found!"));
    console.log("UserA]lication User::::", user);
    const applications = await Application.find({ applicant: userId }).populate(
      "job"
    );
    console.log("applications", applications);
    res.status(200).json(applications);
  } catch (error) {
    console.log("UserAppErrr:", error);
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
