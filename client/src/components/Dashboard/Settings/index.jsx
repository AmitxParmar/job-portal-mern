import Loader from "../common/Loader";
import { Outlet } from "react-router-dom";
import Resume from "../common/Resume";
import { memo } from "react";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { user, isLoading, error } = useAuth();

  console.log("user fetched Settings.jsx", user);

  if (error) return <div className="text-5xl text-red-500">Error:{error}</div>;

  return (
    <div className="flex flex-row flex-1 max-h-[calc(100vh-8vh)] min-h-[calc(100vh-8vh)] py-4 overflow-y-hidden">
      {isLoading ? (
        <div className="h-screen flex w-screen items-center justify-center">
          <Loader color="#000000" size={100} />
        </div>
      ) : (
        <>
          <Outlet context={{ user }} />
          <Resume isLoading={isLoading} user={user} />
        </>
      )}
    </div>
  );
};

export default memo(Settings);
