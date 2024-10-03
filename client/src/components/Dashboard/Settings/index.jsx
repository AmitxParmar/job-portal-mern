import { Outlet } from "react-router-dom";
import Resume from "../common/Resume";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { user, error, isLoading } = useAuth();

  console.log("user fetched Settings.jsx", user);

  if (error) return <div className="text-5xl text-red-500">Error:{error}</div>;

  return (
    <div className="flex flex-row flex-1 max-h-[calc(100vh-8vh)] py-4 overflow-y-hidden">
      <Outlet context={{ user, isLoading }} />
      <Resume isLoading={isLoading} user={user} />
    </div>
  );
};

export default Settings;
