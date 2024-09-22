import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
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
  profile: {
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
    projects: [
      {
        title: { type: String },
        skills: [{ type: String }],
        endDate: { type: Date },
        description: { type: String },
        url: { type: String },
        repository: { type: String },
      },
    ],
    experience: [
      {
        jobTitle: { type: String },
        employer: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        yearOfGraduation: { type: String },
      },
    ],
  },
  bookmarkedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }], // Added bookmarkedJobs field
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

export default model("User", userSchema);
