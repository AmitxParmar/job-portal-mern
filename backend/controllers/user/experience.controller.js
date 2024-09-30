import { Experience, User } from "../../models/User.js";

export const addExperience = async (req, res) => {
  const { userId } = req.params;
  const experienceData = req.body;
  console.log("userExperience", req.body);
  try {
    // Create a new experience
    const newExperience = new Experience(experienceData);
    await newExperience.save();

    // Add experience reference to the user
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { experience: newExperience._id } },
      { new: true }
    ).populate("experience");

    res.status(201).json(user.experience);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add experience" });
  }
};

export const updateExperience = async (req, res) => {
  const { experienceId } = req.params;
  const updatedData = req.body;

  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      experienceId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(500).json({ error: "Failed to update experience" });
  }
};

export const removeExperience = async (req, res) => {
  const { userId, experienceId } = req.params;

  try {
    await Experience.findByIdAndDelete(experienceId);

    // Remove experience reference from user
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { experience: experienceId } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove experience" });
  }
};
