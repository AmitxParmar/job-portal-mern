import { Company } from "../../models/Company.js";
import Job from "../../models/Job.js";
import { User } from "../../models/User.js";
import { createError } from "../../utils/error.js";

export const jobControllers = {
  // Create a new job
  createJob: async (req, res, next) => {
    const recruiterId = req.user.id;
    try {
      const recruiter = await User.findById(recruiterId);
      if (!recruiter || recruiter.role !== "recruiter") {
        return next(createError(403, "Only recruiters can post jobs"));
      }

      const company = await Company.findById(recruiter.company);
      if (!company) {
        return next(createError(404, "Company not found"));
      }

      const newJob = new Job({
        ...req.body,
        company: company._id,
        postedBy: recruiter._id,
      });

      const savedJob = await newJob.save();

      // Add job to company's jobs array
      company.jobs.push(savedJob._id);
      await company.save();

      res.status(201).json(savedJob);
    } catch (err) {
      next(err);
    }
  },

  // Get all jobs (with optional filtering)
  getAllJobs: async (req, res, next) => {
    console.log("entered getAll jobs", req.body);
    try {
      const {
        company,
        title,
        location,
        jobType,
        workFrom,
        experience,
        frequency,
        skills,
        salaryMin,
        salaryMax,
        postedAfter,
        postedBefore,
        status,
        cursor = null,
        limit = 10,
        sortBy = "postedAt",
        sortOrder = "desc",
      } = req.query;

      console.log("Raw query parameters:", req.query);

      const filter = {};
      if (company) filter.company = company;
      if (title) filter.title = { $regex: title, $options: "i" };
      if (location) {
        filter["location.city"] = { $regex: location, $options: "i" };
      }
      if (jobType) filter.jobType = jobType;
      if (workFrom) filter.workFrom = workFrom;
      if (experience) filter.experience = experience;
      if (frequency) filter.frequency = frequency;
      if (skills && skills.length > 0) {
        filter.skillsRequired = {
          $in: skills.split(",").map((skill) => new RegExp(skill.trim(), "i")),
        };
      }
      if (salaryMin) filter["salaryRange.min"] = { $gte: parseInt(salaryMin) };
      if (salaryMax) filter["salaryRange.max"] = { $lte: parseInt(salaryMax) };
      if (postedAfter) filter.postedAt = { $gte: new Date(postedAfter) };
      if (postedBefore) filter.postedAt = { $lte: new Date(postedBefore) };
      if (status) filter.status = status;

      console.log("Constructed filter:", JSON.stringify(filter, null, 2));

      const sort = {};
      sort[sortBy] = sortOrder === "asc" ? 1 : -1;

      const query = Job.find(filter)
        .sort(sort)
        .limit(parseInt(limit) + 1);

      if (cursor) {
        query.where("_id").gt(cursor);
      }

      console.log(
        "Executing query with filter:",
        JSON.stringify(filter, null, 2)
      );
      console.log("Sort:", JSON.stringify(sort, null, 2));
      console.log("Cursor:", cursor);
      console.log("Limit:", parseInt(limit));

      const _jobs = await query
        .populate("company", "name logo")
        .populate("postedBy", "fullName");

      console.log("Query executed. Number of jobs found:", _jobs.length);

      const hasNextPage = _jobs.length > parseInt(limit);
      const jobs = hasNextPage ? _jobs.slice(0, -1) : _jobs;

      const formattedJobs = jobs.map((job) => ({
        ...job.toObject(),
        combinedField: {
          requiredSkills: job.skillsRequired[0] || null,
          jobType: job.jobType,
          workFrom: job.workFrom,
          experience: job.experience,
        },
      }));

      res.status(200).json({
        nextCursor: hasNextPage ? jobs[jobs.length - 1]._id : null,
        jobs: formattedJobs,
      });
    } catch (err) {
      console.error("Error in getAllJobs:", err);
      next(err);
    }
  },

  // Get a specific job by ID
  getJobById: async (req, res, next) => {
    try {
      const job = await Job.findById(req.params.id)
        .populate("company")
        .populate("postedBy", "fullName email");

      if (!job) {
        return next(createError(404, "Job not found"));
      }

      res.status(200).json(job);
    } catch (err) {
      next(err);
    }
  },

  // Update a job
  updateJob: async (req, res, next) => {
    const jobId = req.params.jobId;
    try {
      const job = await Job.findById(jobId);
      if (!job) {
        return next(createError(404, "Job not found"));
      }

      // Check if the user is the one who posted the job
      if (job.postedBy.toString() !== req.user.id) {
        return next(createError(403, "You can update only your own job posts"));
      }

      const updatedJob = await Job.findByIdAndUpdate(
        jobId,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Job updated successfully!",
        job: updatedJob,
      });
    } catch (err) {
      next(err);
    }
  },

  // Delete a job
  deleteJob: async (req, res, next) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) {
        return next(createError(404, "Job not found"));
      }

      // Check if the user is the one who posted the job
      if (job.postedBy.toString() !== req.user.id) {
        return next(createError(403, "You can delete only your own job posts"));
      }

      // Remove job from company's jobs array
      await Company.findByIdAndUpdate(job.company, {
        $pull: { jobs: job._id },
      });

      await Job.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Job has been deleted successfully" });
    } catch (err) {
      next(err);
    }
  },

  // Get jobs posted by a recruiter
  getRecruiterJobs: async (req, res, next) => {
    const recruiterId = req.user.id;
    try {
      const recruiter = await User.findById(recruiterId);

      console.log("gettings recruiters job", recruiter.email);
      const jobs = await Job.find({ postedBy: recruiter._id })
        .populate("company", "name logo")
        .populate("applicants", "fullName email");
      const formattedJobs = jobs.map((job) => ({
        ...job.toObject(),
        combinedField: {
          requiredSkills: job.skillsRequired[0] || null,
          jobType: job.jobType,
          workFrom: job.workFrom,
          experience: job.experience,
        },
      }));
      res.status(200).json({ jobs: formattedJobs });
    } catch (err) {
      next(err);
    }
  },
};
