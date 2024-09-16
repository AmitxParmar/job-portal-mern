import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "employer", "jobSeeker"],
    default: "jobSeeker",
  },
  isVerified: { type: Boolean, default: false },
  inviteCodeUsed: { type: Schema.Types.ObjectId, ref: "InviteCode" },
  profile: {
    profilePic: { type: String },
    fullname: { type: String, required: true },
    bio: { type: String },
    contact: { type: String },
    designation: { type: String },
    address: { type: String },
    skills: [{ type: String }],
    resumeUrl: { type: String },
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
        title: { type: String, required: true },
        subtitle: { type: String },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    experience: [
      {
        jobTitle: { type: String, required: true },
        employer: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        yearOfGraduation: { type: String, required: true },
      },
    ],
  },
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
