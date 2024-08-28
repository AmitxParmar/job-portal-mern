import User from "../models/User.js";
import { createError } from "../utils/error.js";

// Get User Profile
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return next(createError(404, "User not found!"));

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update User Profile
export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const updatedData = {
      bio: req.body.bio || user.profile.bio,
      skills: req.body.skills || user.profile.skills,
      resumeUrl: req.body.resumeUrl || user.profile.resumeUrl,
      portfolioLinks: req.body.portfolioLinks || user.profile.portfolioLinks,
      experience: req.body.experience || user.profile.experience,
      education: req.body.education || user.profile.education,
    };

    user.profile = { ...user.profile, ...updatedData };
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Delete User Account
export const deleteUserAccount = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    res.status(200).json({ message: "User account deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// Change User Password
export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const { currentPassword, newPassword } = req.body;

    // Check if the current password is correct
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch)
      return next(createError(400, "Current password is incorrect"));

    // Set the new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};
