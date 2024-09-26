import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const educationSchema = new Schema({
  institution: { type: String },
  degree: { type: String },
  yearOfGraduation: { type: String },
});

const experienceSchema = new Schema({
  jobTitle: { type: String },
  employer: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
});

const projectSchema = new Schema({
  title: { type: String },
  skills: [{ type: String }],
  endDate: { type: Date },
  description: { type: String },
  url: { type: String },
  repository: { type: String },
});

const profileSchema = new Schema({
  profilePic: { type: String },
  fullName: { type: String },
  bio: { type: String },
  contact: { type: String },
  designation: { type: String },
  address: { type: String },
  skills: [{ type: String }],
  profileLinks: {
    linkedIn: { type: String },
    github: { type: String },
    other: {
      platform: { type: String },
      url: { type: String },
    },
  },
});
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ["admin", "employer", "jobSeeker"],
    default: "jobSeeker",
  },
  isVerified: { type: Boolean, default: false },
  inviteCodeUsed: { type: Schema.Types.ObjectId, ref: "InviteCode" },

  // Reference to profile schema
  profile: { type: Schema.Types.ObjectId, ref: "Profile" },

  // Array of references to project schema
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],

  // Array of references to experience schema
  experience: [{ type: Schema.Types.ObjectId, ref: "Experience" }],

  // Array of references to education schema
  education: [{ type: Schema.Types.ObjectId, ref: "Education" }],

  // Bookmarked jobs relation
  bookmarkedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],

  createdAt: { type: Date, default: Date.now },
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
export const Profile = model("Profile", profileSchema);
export const Project = model("Project", projectSchema);
export const Experience = model("Experience", experienceSchema);
export const Education = model("Education", educationSchema);
export const User = model("User", userSchema);
