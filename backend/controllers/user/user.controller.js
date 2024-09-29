import { User } from "../../models/User.js";
import { createError } from "../../utils/error.js";

// Get User Profile
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-password")
      .populate("projects")
      .populate("experience")
      .populate("education");
    console.log(user);
    if (!user) return next(createError(404, "User not found!"));

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update User Profile
export const updateUserAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found!"));

    const updatedAuthData = {
      email: req.body.email || user.email,
      role: req.body.role || user.role,
      isVerified: req.body.isVerified || user.isVerified,
      inviteCodeUsed: req.body.inviteCodeUsed || user.inviteCodeUsed,
    };

    // Update user auth fields
    Object.assign(user, updatedAuthData);
    const updatedUser = await user.save();

    // Remove sensitive information before sending response
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// Update User Profile
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return next(createError(404, "User not found!"));

    const updatedProfileData = {
      profilePic: req.body.profilePic || user.profilePic,
      fullName: req.body.fullName || user.fullName,
      bio: req.body.bio || user.bio,
      contact: req.body.contact || user.contact,
      contactEmail: req.body.contactEmail || user.contactEmail,
      designation: req.body.designation || user.designation,
      address: req.body.address || user.address,
      skills: req.body.skills || user.skills,
      profileLinks: req.body.profileLinks || user.profileLinks,
      company: req.body.company || user.company,
    };

    // Update user profile fields
    Object.assign(user, updatedProfileData);
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
