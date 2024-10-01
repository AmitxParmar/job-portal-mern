import { Outlet } from "react-router-dom";
import Resume from "../common/Resume";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { user, error, isLoading } = useAuth();

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
