import { Education, User } from "../../models/User.js";

export const getEducations = async (req, res) => {
  const { id } = req.user;
  try {
    const education = await Education.find({ _id: { $in: id.education } });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch education records" });
  }
};

export const addEducation = async (req, res) => {
  const educationData = req.body;

  try {
    // Create a new education record
    const newEducation = new Education(educationData);
    await newEducation.save();

    // Add education reference to the user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { education: newEducation._id } },
      { new: true }
    ).populate("education");

    res.status(201).json(user.education);
  } catch (error) {
    res.status(500).json({ error: "Failed to add education record" });
  }
};

export const updateEducation = async (req, res) => {
  const { educationId } = req.params;
  const updatedData = req.body;

  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      educationId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedEducation) {
      return res.status(404).json({ error: "Education record not found" });
    }

    res.status(200).json(updatedEducation);
  } catch (error) {
    res.status(500).json({ error: "Failed to update education record" });
  }
};

export const removeEducation = async (req, res) => {
  const { eduId } = req.params;

  try {
    await Education.findByIdAndDelete(eduId);

    // Remove education reference from user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { education: eduId } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove education record" });
  }
};
