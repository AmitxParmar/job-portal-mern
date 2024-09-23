import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import { fetchJobs } from "@/services/JobServices";

import CardSkeleton from "./CardSkeleton";

const JobListings = () => {
  const { data, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => fetchJobs(), // Pass a function to fetchJobs
  });
  console.log("JobListing", data);

  if (isError) return <div className="text-red-500 text-5xl">{error}</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {data
        ? data?.map((job) => <JobCard key={job.id} job={job} />)
        : Array.from({ length: 10 }, (_, index) => (
            <CardSkeleton key={index} />
          ))}
    </div>
  );
};

export default JobListings;
