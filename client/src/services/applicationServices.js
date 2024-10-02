import axiosInstance from "@/lib/axiosInstance";

export const applyForJob = async (jobId) => {
  const { data } = await axiosInstance.post(`/applications/${jobId}/apply`, {
    jobId,
  });
  return data;
};

export const getJobApplications = async (jobId) => {
  const { data } = await axiosInstance.get(
    `/applications/job/${jobId}/applications`
  );
  return data;
};

export const getUserApplications = async () => {
  const { data } = await axiosInstance.get(`/applications/user/applications`);
  return data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const { data } = await axiosInstance.put(
    `/applications/application/${applicationId}/status`,
    { status }
  );
  return data;
};
