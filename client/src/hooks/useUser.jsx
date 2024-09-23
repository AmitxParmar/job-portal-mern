import { fetchUserById } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";

const useUser = (userId) => {
  return useQuery(["get-user", userId], () => fetchUserById(userId), {
    enabled: !!userId, // Prevent the query from running if there is no userId
    retry: 1, // Retry failed requests once
    staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
  });
};

export default useUser;
