import { User, Project } from "../../models/User.js";

// Add a new project
export const addProject = async (req, res) => {
  const { userId } = req.params;
  const projectData = req.body;

  try {
    // Create a new project
    const newProject = new Projects(projectData);
    await newProject.save();

    // Add project reference to the user
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { projects: newProject._id } },
      { new: true }
    ).populate("projects");

    res.status(201).json(user.projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to add project" });
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const updatedData = req.body;

  try {
    const updatedProject = await Projects.findByIdAndUpdate(
      projectId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update project" });
  }
};

// Remove a project
export const removeProject = async (req, res) => {
  const { userId, projectId } = req.params;

  try {
    await Projects.findByIdAndDelete(projectId);

    // Remove project reference from user
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { projects: projectId } },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove project" });
  }
};
