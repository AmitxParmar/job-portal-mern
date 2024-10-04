import { loginUser, registerUser } from "@/services/authServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchUserById } from "@/services/userServices";
import { toast } from "sonner";
import { useState } from "react";

export const useAuth = () => {
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || "66ccb1ecb5e4de35acdbb80d"
  );
  const queryClient = useQueryClient();

  console.log("Userid", userId);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
    onSuccess: (data) =>
      toast.success("User data fetched", {
        description: JSON.stringify(data),
      }),
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("Successfully Registered!");
      setUserId(data.user._id);
      localStorage.setItem("userId", data.user._id);
      queryClient.setQueryData(["user", data.user._id], data.user);
    },
    onError: (error) =>
      toast.error("Error: Login", {
        description: error.message,
      }),
  });

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      toast.success("Successfully Registered!");
      setUserId(data.user._id);
      localStorage.setItem("userId", data.user._id);
      queryClient.setQueryData(["user", data.user._id], data.user);
    },
    onError: (error) =>
      toast.error("Error:Registering", {
        description: error.message,
      }),
  });

  return {
    user,
    isLoading,
    error,
    isLoggedIn: !!userId,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
  };
};
