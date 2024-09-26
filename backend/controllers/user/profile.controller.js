import { User, Profile } from "../../models/User.js";

export const createOrUpdateProfile = async (req, res) => {
  const { userId } = req.params;
  const profileData = req.body;

  try {
    // Create a new profile or update an existing one
    const profile = await Profile.findOneAndUpdate(
      { _id: req.user.profile }, // Update based on the user's profile ID
      { $set: profileData },
      { new: true, upsert: true, runValidators: true } // upsert: creates if not exists
    );

    // Update the user's profile reference
    await User.findByIdAndUpdate(userId, { profile: profile._id });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to create or update profile" });
  }
};
