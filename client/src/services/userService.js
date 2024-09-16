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
  const { data } = await axios.get(`${BASE_URL}/${userId}`);
  return data;
};

// Create new user
export const createUser = async (userData) => {
  const { data } = await axios.post(`${BASE_URL}`, userData);
  return data;
};

// Update user by ID
export const updateUser = async (userId, userData) => {
  const { data } = await axios.put(`${BASE_URL}/${userId}`, userData);
  return data;
};

// Delete user by ID
export const deleteUser = async (userId) => {
  const { data } = await axios.delete(`${BASE_URL}/${userId}`);
  return data;
};
