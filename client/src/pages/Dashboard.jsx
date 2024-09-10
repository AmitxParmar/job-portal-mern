import { Outlet, useLocation } from "react-router-dom";
import Filters from "@/components/Dashboard/Filters";
import JobCard from "@/components/Dashboard/JobCard";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Dashboard = () => {
  const { pathname } = useLocation();

  const jobs = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
  ];

  return (
    <div className="max-w-[1980px] transition-all duration-300 ease-in-out mx-auto flex flex-col max-h-screen scrollbar-thin bg-purple-50 min-h-screen">
      {/* Header */}
      <Navbar />
      {/* Main Content */}
      <div className="flex justify-around flex-1 overflow-y-hidden">
        {/* Left Sidebar */}
        <Sidebar classNames={pathname === "/dashboard/profile" ? "w-1/4" : ""}>
          {pathname === "/dashboard" && <Filters />}
        </Sidebar>

        {/* Center Content */}
        <main className="w-full">
          {/* Conditional Rendering for Dashboard and Profile */}
          {pathname === "/dashboard" ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-max pb-20 scrollbar-none pt-12 lg:px-6 scroll-smooth overflow-y-scroll lg:grid-cols-5 h-full">
                {jobs.map((item) => (
                  <JobCard key={item} name={item} />
                ))}
              </div>
            </>
          ) : (
            <Outlet /> // This will render nested profile routes
          )}
        </main>

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

export default Dashboard;
