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
  const { data } = await axiosInstance.get(`${BASE_URL}/get-user/${userId}`);
  return data;
};

// Update user by ID
export const updateUser = async (userId, userData) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/update-user/${userId}`,
    userData
  );
  return data;
};

// Delete user by ID
export const deleteUser = async (userId) => {
  const { data } = await axiosInstance.delete(`${BASE_URL}/delete/${userId}`);
  return data;
};

export const changePassword = async (userId, passwords) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/change-password/${userId}`,
    passwords // current and newPasword
  );
  return data;
};
// Fetch user password reset link caution:NOT SAFE
export const passwordReset = async (email, newPassword) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/forget-password`, {
    email,
    newPassword,
  });
  return data;
};
