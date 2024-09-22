import axiosInstance from "@/lib/axiosInstance";

// Base API URL
const BASE_URL = "/auth";

// User Registration
export const registerUser = async (userData) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/register`, userData);
  return data;
};

// User Login
export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/login`, credentials);
  return data;
};

// Forget Password
export const forgetPassword = async (email, newPassword) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/forget-password`, {
    email,
    newPassword,
  });
  return data;
};
