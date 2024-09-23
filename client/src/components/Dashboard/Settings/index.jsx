import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { fetchUserById } from "@/services/userServices";
import Resume from "../common/Resume";
import useUserStore from "@/store/useUserStore";

const Settings = () => {
  const setUser = useUserStore((state) => state.setUser);

  const userId = "66ccb1ecb5e4de35acdbb80d";
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    onSuccess: (data) => {
      setUser(data); // Add data to zustand after fetched
    },
  });

  if (isLoading)
    return (
      <div className="flex flex-row justify-center h-full py-4 px-5">
        Loading...
      </div>
    );
  if (error) return <div>Error fetching user data</div>;

  console.log(user);
  return (
    <div className="flex flex-row justify-center h-full py-4 px-5">
      <Outlet />
      <Resume user={user} />
    </div>
  );
};

export default Settings;
