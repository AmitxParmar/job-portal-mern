import { loginUser, registerUser } from "@/services/authServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useState } from "react";

import { fetchUserById } from "@/services/userServices";

export const useAuth = () => {
  const [userId, setUserId] = useState("66ccb1ecb5e4de35acdbb80d"); // Hard coded user ID
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
    onSuccess: (data) => {
      console.log("user fetched", data);
      toast.success("User data fetched", {
        description: JSON.stringify(data),
      });
      queryClient.setQueryData(["user", userId], data); // Cache the user data
    },
    onError: () => toast.error("error user fetching"),
  });
  console.log(user);
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
