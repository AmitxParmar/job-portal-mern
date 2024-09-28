import { Outlet } from "react-router-dom";
import Sidebars from "../Sidebars";

const Layout = ({ userRole, children }) => {
  return (
    <div className="flex flex-row flex-1  max-h-[calc(100vh-18vh)]">
      <Sidebars userRole={userRole} />
      <main className="flex-1 overflow-auto h-[100vh-18vh] px-2">
        {children}
      </main>
    </div>
  );
};

export default Layout;
