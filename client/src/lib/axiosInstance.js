import { refreshToken } from "@/services/authServices";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL, // Your base API URL
  /*  timeout: 10000, */ // Optional: Set a timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Default content type
    // Add any other custom headers here
  },
  withCredentials: true, // This allows the browser to send cookies with cross-origin requests
});

// Optional: Add interceptors for request/response
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or modify the request here
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    if (config.url && config.url.startsWith("/api/")) {
      config.url = config.url.replace("/api/", "/");
    }
    (error) => {
      return Promise.reject(error);
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance?.interceptors?.response?.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;

    // Check if error status is 401 and if it's the first attempt
    if (error?.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true; // Prevent infinite loop

      try {
        /*   const { accessToken } = await refreshToken(); // Refresh token endpoint
        originalRequest.headers.Authorization = `Bearer ${accessToken}`; // Update the Authorization header with the new token */
        return axiosInstance(originalRequest); // Retry original request
      } catch (err) {
        console.error("Token refresh failed:", err);
        // Redirect to login or handle session expiration
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
