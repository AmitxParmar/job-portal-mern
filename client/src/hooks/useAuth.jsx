import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginUser, registerUser, logoutUser } from "@/services/authServices";
import { fetchCurrentUser } from "@/services/userServices";

// Zustand store for persisting auth state
const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

// React Query hook for auth operations
export const useAuth = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  const {
    isLoading,
    error,
    data,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (error) => {
      console.log("currentUser fetching error", error);
      setIsAuthenticated(false);
      toast.error("Session expired. Please log in again.");
    },
    cacheTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setIsAuthenticated(true);
      toast.success("Successfully logged in!");
    },
    onError: (error) => toast.error(`Login Error: ${error.message}`),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success(
        "Successfully registered! Check your email to verify your account."
      );
    },
    onError: (error) => toast.error(`Registration Error: ${error.message}`),
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.clear();
      toast.success("Successfully logged out!");
    },
    onError: (error) => toast.error(`Logout Error: ${error.message}`),
  });

  return {
    user: data?.user,
    isLoading,
    error,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    refetchUser,
  };
};

export default useAuthStore;
