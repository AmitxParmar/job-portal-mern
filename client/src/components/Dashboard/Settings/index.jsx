import { Outlet } from "react-router-dom";
import Resume from "../common/Resume";
import { fetchUserById } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";

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

  if (error) return <div className="text-5xl text-red-500">Error:{error}</div>;

  return (
    <div className="flex flex-row justify-center h-full py-4">
      <Outlet context={{ user, isLoading }} />
      {!isLoading && <Resume user={user} />}
    </div>
  );
};

export default Settings;
