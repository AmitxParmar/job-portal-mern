import { Outlet, useLocation } from "react-router-dom";
import Filters from "@/components/Dashboard/Filters";
import JobCard from "@/components/Dashboard/JobCard";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
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
  ];

  return (
    <div className="max-w-[1980px] mx-auto flex flex-col max-h-screen scrollbar-thin bg-purple-50 min-h-screen">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="flex justify-around flex-1 overflow-y-hidden">
        {/* Left Sidebar */ console.log(location.pathname)}
        <Sidebar>{location.pathname === "/dashboard" && <Filters />}</Sidebar>

        {/* Center Content */}
        <main className="w-full">
          {/* Conditional Rendering for Dashboard and Profile */}
          {location.pathname === "/dashboard" ? (
            <>
              <h1 className="text-3xl p-6 font-bold">Recommended Jobs</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-max pb-20 scrollbar-none overflow-y-scroll lg:grid-cols-4 h-full">
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
        <aside className="w-1/6 relative right-0 bg-white p-4 border-l hidden lg:block">
          {/* Additional actions or info */}
          <div className="grid grid-cols-1 gap-4">
            <img
              src="/images/job.png"
              alt="job"
              className="rounded-full h-32 w-32 mx-auto bg-black"
            />
            <Link
              to="/dashboard/profile"
              className="bg-purple-500/50 text-center py-2 rounded-md"
            >
              Edit Profile
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
