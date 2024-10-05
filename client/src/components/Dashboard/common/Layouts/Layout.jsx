import { Outlet } from "react-router-dom";
import Sidebars from "../Sidebars";

const Layout = ({ role }) => {
  return (
    <div className="flex flex-row flex-1 max-h-[calc(100vh-8vh)] min-h-[calc(100vh-8vh)]">
      <Sidebars role={role} />
      <main className="flex-1 overflow-auto px-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
