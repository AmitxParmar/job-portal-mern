import Resume from "../common/Resume";
import ProfileSidebar from "../Sidebars/SettingsSidebar";
import { Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <div className="flex flex-row justify-center h-[calc(100vh-13px)] py-4 px-5">
      <ProfileSidebar />
      <Outlet />
      <Resume />
    </div>
  );
};

export default Settings;
