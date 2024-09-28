import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import { fetchJobs } from "@/services/JobServices";
import CardSkeleton from "./CardSkeleton";
import { useFilters } from "@/hooks/useFilters";

const JobListings = () => {
  const { filters } = useFilters(); // Get the filter state
  // Automatically refetches when filters change due to the queryKey dependency
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["jobs", filters], // Including filters as part of the query key
    queryFn: () => fetchJobs(filters),
    keepPreviousData: true, // Keeps the previous data while fetching new data
    staleTime: 5000, // Optional: to avoid too frequent refetching
  });
  console.log(data, isError, error, isLoading);
  if (isError)
    return <div className="text-red-500 text-5xl">{error.message}</div>;
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {Array.from({ length: 10 }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {data?.jobs?.length > 0 ? (
        data?.jobs?.map((job) => <JobCard key={job._id} job={job} />)
      ) : (
        <div className="text-center absolute inset-x-0 inset-y-2/4 text-gray-500 font-grotesk text-xl">
          No jobs found.
        </div>
      )}
    </div>
  );
};

export default JobListings;
