import { refreshToken } from "@/services/authServices";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Your base API URL
  /*  timeout: 10000, */ // Optional: Set a timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Default content type
    // Add any other custom headers here
  },
  withCredentials: true, // This allows the browser to send cookies with cross-origin requests
});
console.log(import.meta.env.VITE_API_URL);
// Optional: Add interceptors for request/response
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or modify the request here
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
        await refreshToken(); // Refresh token endpoint
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
