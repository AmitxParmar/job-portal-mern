import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "employer", "jobSeeker"],
    default: "jobSeeker",
  },
  isVerified: { type: Boolean, default: false },
  inviteCodeUsed: { type: Schema.Types.ObjectId, ref: "InviteCode" }, // Tracks the invite code used
  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resumeUrl: { type: String },
    portfolioLinks: [{ type: String }],
    experience: [
      {
        company: String,
        position: String,
        duration: String,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        yearOfGraduation: String,
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
