import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import { fetchJobs } from "@/services/JobServices";

import CardSkeleton from "./CardSkeleton";

const JobListings = () => {
  const { data } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll lg:grid-cols-3 xl:grid-cols-5 gap-3 px-4">
      {data
        ? data?.map((job) => <JobCard key={job.id} job={job} />)
        : Array.from({ length: 10 }, (_, index) => (
            <CardSkeleton key={index} />
          ))}
    </div>
  );
};

export default JobListings;
