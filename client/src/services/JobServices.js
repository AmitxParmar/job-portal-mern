import axiosInstance from "@/lib/axiosInstance";

const BASE_URL = "/jobs";

// Fetch all jobs
export const fetchJobs = async (filters) => {
  const { data } = await axiosInstance.get(`${BASE_URL}`, {
    params: filters,
  });
  return data;
};

// Fetch single job by ID
export const fetchJobById = async (jobId) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${jobId}`);
  return data;
};
/* ================= FOR ONLY RECRUITER ============================= */
// Create new job
export const createJob = async (jobData) => {
  const { data } = await axiosInstance.post(`${BASE_URL}/create`, jobData);
  return data;
};

// Update job by ID
export const updateJob = async (jobId, jobData) => {
  const { data } = await axiosInstance.put(`${BASE_URL}/${jobId}`, jobData);
  return data;
};

// Delete job by ID
export const deleteJob = async (jobId) => {
  const { data } = await axiosInstance.delete(`${BASE_URL}/${jobId}`);
  return data;
};

export const getRecruiterJobs = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/recruiter/jobs`);
  return data;
};

/* BOTH ROLE */
/* export const bookmarkJob = async (jobId) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/${jobId}/bookmark-job`
  );
  return data;
};
 */
