import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginUser, registerUser, logoutUser } from "@/services/authServices";
import { fetchCurrentUser } from "@/services/userServices";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axiosInstance";

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
  const navigate = useNavigate();

  const clearAuthState = () => {
    setIsAuthenticated(false);
    queryClient.clear();
    axiosInstance.defaults.headers.common["Authorization"] = "";
  };

  const {
    isLoading,
    error,
    data,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    enabled: isAuthenticated,
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (error) => {
      console.log("currentUser fetching error", error);
      clearAuthState();
      toast.error("Session expired. Please log in again.");
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (error) => {
      setIsAuthenticated(false);
    },
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
      axiosInstance.defaults.headers.common["Authorization"] = "";
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Even if logout fails on the server, clear local state
      setIsAuthenticated(false);
      queryClient.clear();
      axiosInstance.defaults.headers.common["Authorization"] = "";
      navigate("/login");
    },
  });
  const logout = () => {
    if (isAuthenticated) {
      logoutMutation.mutate();
    }
  };
  return {
    user: data?.user,
    isLoading,
    error,
    isAuthenticated,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    refetchUser,
  };
};

export default useAuthStore;
