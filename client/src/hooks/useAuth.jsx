import { loginUser, registerUser } from "@/services/authServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchUserById } from "@/services/userServices";
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
  });

  /*   const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      setUserId(data.user._id);
      localStorage.setItem("userId", data.user._id);
      queryClient.setQueryData(["user", data.user._id], data.user);
    },
  });

  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
      setUserId(data.user._id);
      localStorage.setItem("userId", data.user._id);
      queryClient.setQueryData(["user", data.user._id], data.user);
    },
  }); */

  /*   const logout = () => {
    logoutUser(); // Assume this function handles any server-side logout
    setUserId(null);
    localStorage.removeItem("userId");
    queryClient.clear();
  }; */

  return {
    user,
    isLoading,
    error,
    isLoggedIn: !!userId,
    /*    login: loginMutation.mutate,
    register: registerMutation.mutate, */
    /* logout, */
  };
};
