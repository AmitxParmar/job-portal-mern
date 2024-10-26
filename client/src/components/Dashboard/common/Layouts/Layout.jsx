import { Outlet } from "react-router-dom";
import Sidebars from "../Sidebars";

const Layout = () => {
  return (
    <div className="flex flex-row flex-1 max-h-[calc(100vh-8vh)] min-h-[calc(100vh-8vh)] max-w-screen lg:w-full xl:px-4 xl:mt-4">
      <Sidebars />
      <main className="flex-1 overflow-auto lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
