import axiosInstance from "@/lib/axiosInstance";

// Base API URL
const BASE_URL = "/user";

// Fetch all users
export const fetchUsers = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}`);
  return data;
};

// Fetch single user by ID
export const fetchUserById = async (userId) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${userId}`);
  return data;
};

// Update user by ID
export const updateUser = async (userId, userData) => {
  const { data } = await axiosInstance.put(`${BASE_URL}/${userId}`, userData);
  return data;
};

// Delete user by ID
export const deleteUser = async (userId) => {
  const { data } = await axiosInstance.delete(`${BASE_URL}/${userId}`);
  return data;
};

export const changePassword = async (userId, passwords) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/${userId}/change-password`,
    passwords // current and newPasword
  );
  return data;
};

// Fetch user profile
export const fetchUserProfile = async (userId) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${userId}/profile`);
  return data;
};

// Update user profile
/* export const updateUserProfile = async (userId, profileData) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/${userId}/profile`,
    profileData
  );
  return data;
};
 */
// Add education
export const addEducation = async (userId, educationData) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/${userId}/education`,
    educationData
  );
  return data;
};

// Update education
export const updateEducation = async (userId, eduId, educationData) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/${userId}/education/${eduId}`,
    educationData
  );
  return data;
};

// Remove education
export const removeEducation = async (userId, eduId) => {
  const { data } = await axiosInstance.delete(
    `${BASE_URL}/${userId}/education/${eduId}`
  );
  return data;
};

// Add experience
export const addExperience = async (userId, experienceData) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/${userId}/experience`,
    experienceData
  );
  return data;
};

// Update experience
export const updateExperience = async (userId, expId, experienceData) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/${userId}/experience/${expId}`,
    experienceData
  );
  return data;
};

// Remove experience
export const removeExperience = async (userId, expId) => {
  const { data } = await axiosInstance.delete(
    `${BASE_URL}/${userId}/experience/${expId}`
  );
  return data;
};

// Add project
export const addProject = async (userId, projectData) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/${userId}/projects`,
    projectData
  );
  return data;
};

// Update project
export const updateProject = async (userId, projectId, projectData) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/${userId}/projects/${projectId}`,
    projectData
  );
  return data;
};

// Remove project
export const removeProject = async (userId, projectId) => {
  const { data } = await axiosInstance.delete(
    `${BASE_URL}/${userId}/projects/${projectId}`
  );
  return data;
};
