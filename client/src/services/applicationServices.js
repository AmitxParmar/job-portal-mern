import axiosInstance from "@/lib/axiosInstance";

// Get all applications by a user (for job seekers)
export const getUserApplications = async () => {
  const { data } = await axiosInstance.get(`/applications/user`);
  return data;
};

export const applyForJob = async (jobId) => {
  const { data } = await axiosInstance.post(`/applications/${jobId}/apply`, {
    jobId,
  });
  return data;
};
/* ==================================== */

// for recruiters
export const getJobApplications = async (jobId) => {
  const { data } = await axiosInstance.get(
    `/applications/job/${jobId}/applications`
  );
  return data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const { data } = await axiosInstance.put(
    `/applications/application/${applicationId}/status`,
    { status }
  );
  return data;
};
