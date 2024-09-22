import User from "../models/User.js";
import { createError } from "../utils/error.js";

// Get User Profile
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return next(createError(404, "User not found!"));

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update User Profile
export const getAllJobSeekers = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query; // Get pagination parameters from query
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  try {
    const users = await User.find({ role: "jobSeeker" })
      .skip(skip)
      .limit(Number(limit))
      .select("-password"); // Exclude password from the response

    const totalUsers = await User.countDocuments({ role: "jobSeeker" }); // Count total job-seekers
    const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages

    res.status(200).json({
      users,
      totalPages,
      currentPage: Number(page),
      totalUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id); //NOTE: temporary query, change it to user later
    if (!user) return next(createError(404, "User not found!"));

    const updatedData = {
      profile: {
        profilePic: req.body.profilePic || user.profile.profilePic,
        fullName: req.body.fullName || user.profile.fullName,
        bio: req.body.bio || user.profile.bio,
        contact: req.body.contact || user.profile.contact,
        designation: req.body.designation || user.profile.designation,
        address: req.body.address || user.profile.address,
        skills: req.body.skills || user.profile.skills,
        profileLinks: {
          linkedIn:
            req.body.profileLinks?.linkedIn ||
            user.profile.profileLinks.linkedIn,
          github:
            req.body.profileLinks?.github || user.profile.profileLinks.github,
          other: {
            platform:
              req.body.profileLinks?.other?.platform ||
              user.profile.profileLinks.other.platform,
            url:
              req.body.profileLinks?.other?.url ||
              user.profile.profileLinks.other.url,
          },
        },
        projects: req.body.projects || user.profile.projects,
        experience: req.body.experience || user.profile.experience,
        education: req.body.education || user.profile.education,
      },
    };

    user.profile = { ...user.profile, ...updatedData.profile };
    const updatedUser = await user.save();

    // Remove sensitive information before sending response
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json(userWithoutPassword);
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
