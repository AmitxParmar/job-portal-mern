import CardSkeleton from "./CardSkeleton";
import Loader from "../common/Loader";
import { Suspense } from "react";
import { lazy } from "react";
import { useFilters } from "@/hooks/useFilters";

const JobCard = lazy(() => import("./JobCard"));

const JobListings = () => {
  const { jobQuery } = useFilters();
  const { data, isError, error, isLoading } = jobQuery;

  console.log(data, isError, error, isLoading);
  if (isError)
    return <div className="text-red-500 text-5xl">{error?.message}</div>;
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
    <Suspense fallback={<Loader />}>
      <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {data?.jobs?.length > 0 ? (
          data?.jobs?.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <div className="text-center absolute inset-x-0 inset-y-2/4 text-gray-500 font-grotesk text-xl">
            No Jobs Found
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default JobListings;
