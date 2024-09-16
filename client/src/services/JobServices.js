import axios from "axios";

const BASE_URL = "/api/jobs";

// Fetch all jobs
export const fetchJobs = async () => {
  const { data } = await axios.get(`${BASE_URL}`);
  return data;
};

// Fetch single job by ID
export const fetchJobById = async (jobId) => {
  const { data } = await axios.get(`${BASE_URL}/${jobId}`);
  return data;
};

// Create new job
export const createJob = async (jobData) => {
  const { data } = await axios.post(`${BASE_URL}`, jobData);
  return data;
};

// Update job by ID
export const updateJob = async (jobId, jobData) => {
  const { data } = await axios.put(`${BASE_URL}/${jobId}`, jobData);
  return data;
};

// Delete job by ID
export const deleteJob = async (jobId) => {
  const { data } = await axios.delete(`${BASE_URL}/${jobId}`);
  return data;
};
