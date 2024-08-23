import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  salaryRange: { type: String },
  skillsRequired: [{ type: String }],
  postedAt: { type: Date, default: Date.now },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, enum: ["open", "closed"], default: "open" },
});

export default model("Job", jobSchema);
