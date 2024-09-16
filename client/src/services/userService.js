import axios from "axios";

// Base API URL
const BASE_URL = "/api/user";

// Fetch all users
export const fetchUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}`);
  return data;
};

// Fetch single user by ID
export const fetchUserById = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/get-user/${userId}`);
  return data;
};

// Update user by ID
export const updateUser = async (userId, userData) => {
  const { data } = await axios.put(
    `${BASE_URL}/update-user/${userId}`,
    userData
  );
  return data;
};

// Delete user by ID
export const deleteUser = async (userId) => {
  const { data } = await axios.delete(`${BASE_URL}/delete/${userId}`);
  return data;
};

export const changePassword = async (userId, passwords) => {
  const { data } = await axios.put(
    `${BASE_URL}/change-password/${userId}`,
    passwords // current and newPasword
  );
  return data;
};
