import Resume from "../common/Resume";
import { Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <div className="flex flex-row justify-center h-full py-4 px-5">
      <Outlet />
      <Resume />
    </div>
  );
};

export default Settings;
