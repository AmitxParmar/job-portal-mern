import Filters from "@/components/Dashboard/Filters";

import JobCard from "@/components/Dashboard/JobCard";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
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
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
  ];
  return (
    <div className="max-w-[1980px] mx-auto flex flex-col max-h-screen  scrollbar-thin bg-purple-50 ">
      {/* <!-- Header --> */}
      <Navbar />
      {/* <!-- Main Content --> */}
      <div className="flex justify-around flex-1 overflow-y-hidden">
        {/* <!-- Left Sidebar (Filters) --> */}
        <Sidebar>
          <Filters />
        </Sidebar>
        {/* <!-- Center Content (Job Cards) --> */}
        <main className="">
          <h1 className="text-3xl p-6 font-bold">Recommended Jobs</h1>
          {/* <!-- Job Cards Grid --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-max pb-20 scrollbar-none overflow-y-scroll lg:grid-cols-4 h-full">
            {jobs.map((item) => (
              <JobCard key={item} name={item} />
            ))}
          </div>
        </main>

        {/*  <!-- Right Sidebar (Optional) --> */}
        <aside className="w-1/6 relative right-0 bg-white p-4 border-l hidden lg:block">
          {/*    <!-- Additional actions or info --> */}
          <div className="grid grid-cols-1 gap-4">
            <img
              src="/images/job.png"
              alt="job"
              className="rounded-full h-32 w-32 mx-auto bg-black"
            />
            <Button className="bg-purple-500/50">Edit Profile</Button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
