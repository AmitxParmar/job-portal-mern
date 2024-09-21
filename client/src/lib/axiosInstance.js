// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api", // Your base API URL
  /*  timeout: 10000, */ // Optional: Set a timeout (in milliseconds)
  headers: {
    "Content-Type": "application/json", // Default content type
    // Add any other custom headers here
  },
});

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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
