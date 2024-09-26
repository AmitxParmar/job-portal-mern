import Resume from "../common/Resume";

import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { fetchUserById } from "@/services/userServices";

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

  console.log("user fetched Settings.jsx", user);

  if (isLoading)
    return (
      <div className="flex flex-row justify-center h-full py-4 px-5">
        Loading...
      </div>
    );
  if (error) return <div>Error fetching user data</div>;

  return (
    <div className="flex flex-row justify-center h-full py-4">
      {!isLoading && <Outlet context={{ user }} />}
      <Resume user={user} />
    </div>
  );
};

export default Settings;
