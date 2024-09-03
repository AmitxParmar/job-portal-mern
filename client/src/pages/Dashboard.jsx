import Filters from "@/components/Dashboard/Filters";

import JobCard from "@/components/Dashboard/JobCard";
import Navbar from "@/components/Dashboard/Navbar";

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
      <div className="flex flex-1 overflow-y-hidden">
        {/* <!-- Left Sidebar (Filters) --> */}
        <Filters />
        {/* <!-- Center Content (Job Cards) --> */}
        <main className="">
          <h1 className="text-5xl p-6 font-bold">Recommended Jobs</h1>
          {/* <!-- Job Cards Grid --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-max px-6 py-24 scrollbar-none overflow-y-scroll lg:grid-cols-5 h-full gap-2">
            {jobs.map((item) => (
              <JobCard key={item} name={item} />
            ))}
          </div>
        </main>

        {/*  <!-- Right Sidebar (Optional) -->
    <aside className="w-1/5 bg-white p-4 border-l hidden lg:block">
      <!-- Additional actions or info -->
    </aside> */}
      </div>
    </div>
  );
};

export default Dashboard;
