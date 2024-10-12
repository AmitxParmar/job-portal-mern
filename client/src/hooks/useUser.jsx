import { fetchUserById } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";

const useUser = (userId) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
    retry: 1, // Retry failed requests once
    staleTime: 5 * 60 * 1000,
  });
};

export default useUser;
