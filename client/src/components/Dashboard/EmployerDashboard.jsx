import CardSkeleton from "./JobListings/CardSkeleton";
import JobCard from "./JobListings/JobCard";
import { useQuery } from "@tanstack/react-query";

import { fetchJobs } from "@/services/JobServices";

const EmployerDashboard = () => {
  const {
    data: jobs,

    isLoading,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => fetchJobs(), // Pass a function to fetchJobs
  });
  return (
    /*  <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll lg:grid-cols-3 xl:grid-cols-5 gap-3 px-4 w-screen"> */
    <div className="h-fit scrollbar-thin max-w-[764px] overflow-x-hidden overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {jobs && jobs.map((job) => <JobCard key={job._id} job={job} />)}
        {isLoading
          ? Array.from({ length: 10 }, (_, index) => (
              <CardSkeleton key={index} />
            ))
          : null}
      </div>
    </div>
    /*  </div> */
  );
};

export default EmployerDashboard;
