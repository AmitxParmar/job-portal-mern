import { Schema, model } from "mongoose";

const locationSchema = new Schema(
  {
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
  },
  { _id: true }
); // This ensures each location has its own unique ID

const jobSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: locationSchema, required: true },
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
  },
  tags: [{ type: String }],
  socials: {
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
    frequency: {
      type: String,
      enum: ["hourly", "monthly", "yearly"],
      required: true,
    },
  },

  skillsRequired: [{ type: String }],
  postedAt: { type: Date, default: Date.now },
  applicants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["open", "closed"], default: "open" },
});

export default model("Job", jobSchema);
