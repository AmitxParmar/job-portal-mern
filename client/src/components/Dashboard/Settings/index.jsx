import { useQuery } from "@tanstack/react-query";
import Resume from "../common/Resume";
import { Outlet } from "react-router-dom";
import { fetchUserById } from "@/services/userService";

const Settings = () => {
  const userId = "66ccb1ecb5e4de35acdbb80d";
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;

  console.log(user);
  return (
    <div className="flex flex-row justify-center h-full py-4 px-5">
      <Outlet context={{ user }} />
      <Resume user={user} />
    </div>
  );
};

export default Settings;
