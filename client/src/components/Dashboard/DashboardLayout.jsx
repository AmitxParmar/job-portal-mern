import { useLocation, useNavigate } from "react-router-dom";
import Filters from "@/components/Dashboard/Filters";

import Sidebar from "@/components/Dashboard/Sidebar";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { profileMenu } from "@/constants";

const DashboardLayout = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className="xl:max-w-[1980px] transition-all duration-300 ease-in-out mx-auto bg-purple-50">
      {/* Header */}

      {/* Main Content */}
      <div className="grid grid-cols-[250px_1fr]">
        {/* Left Sidebar */}
        <Sidebar
          classNames={`hidden xl:block ${
            pathname === "/dashboard/profile" ? "w-1/5" : ""
          }`}
        >
          {pathname === "/dashboard" ? (
            <Filters />
          ) : pathname.startsWith("/dashboard") ? (
            <ProfileSidebar />
          ) : null}
        </Sidebar>

        {/* Center Content */}

        {/* Conditional Rendering for Dashboard and Profile */}

        <main>{children}</main>

        {/* Right Sidebar */}
        {/*  <Sidebar> */}
        {/*  <aside className="w-1/6 rounded-[1.5rem] relative right-4 border-purple-500/30 border my-3 bg-white p-4 border-l hidden lg:block"> */}
        {/* Additional actions or info */}
        {/*       <div className="grid grid-cols-1 gap-4 items-center">
            <img
              src="/images/job.png"
              alt="job"
              className="rounded-full h-32 w-32 mx-auto bg-black"
            />
            {location.pathname === "/dashboard" ? (
              <Link to="/dashboard/profile" className="mx-auto items-center">
                <Settings
                  size={35}
                  className="rounded-full p-1 bg-purple-500/50 hover:rotate-180 transition hover:scale-125 duration-300 ease-in-out"
                />
              </Link>
            ) : (
              <Link to={"/dashboard"}>Back to dashboard</Link>
            )}
          </div> */}
        {/* </aside> */}
        {/* </Sidebar> */}
      </div>
    </div>
  );
};

export default DashboardLayout;

function ProfileSidebar() {
  const navigate = useNavigate();
  return (
    <div className="">
      <Button
        varient=""
        onClick={() => navigate("/dashboard")}
        className="group transition-all duration-500 hover:scale-105 rounded-full px-4 py-2 border w-full hover:invert "
      >
        <ArrowLeft
          className="transition-all duration-500 ease-in-out group-hover:-translate-x-8"
          size={30}
        />
        <span className="ml-2">Back</span>
      </Button>
      <div className="my-5">
        <img
          src="https://via.placeholder.com/150"
          alt="profile"
          className="rounded-full h-32 w-32 mx-auto bg-black"
        />
        <p className="text-center text-xl font-bold">John Doe</p>
      </div>
      <div className="overflow-hidden rounded-xl  flex flex-col space-y-2 py-6 mt-4 px-1">
        {profileMenu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`border w-full text-center mx-auto border-black rounded-full px-4 py-2 whitespace-nowrap relative ${
              location.pathname === item.path ? "bg-purple-500/30" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
