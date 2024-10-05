import { Suspense, lazy } from "react";

import { Button } from "@/components/ui/button";
import CardSkeleton from "../../common/JobCard/CardSkeleton";
import Loader from "../../common/Loader";
import { getRecruiterJobs } from "@/services/JobServices";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const JobCard = lazy(() => import("../../common/JobCard"));

const JobOpenings = () => {
  const { user } = useAuth();
  const { data, error, status } = useQuery({
    queryKey: ["recruiter-jobs"],
    queryFn: getRecruiterJobs,
    // Pass a function to fetchJobs
  });
  console.log(data);
  return status === "pending" ? (
    <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {Array.from({ length: 10 }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  ) : status === "error" ? (
    <div className="text-red-500 text-5xl">{error?.message}</div>
  ) : (
    <Suspense fallback={<Loader />}>
      <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {data.jobs?.length > 0 ? (
          data?.jobs?.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isBookmarked={user?.bookmarkedJobs?.some(
                (bookmarkedJob) => bookmarkedJob?._id === job?._id
              )}
            >
              <Button>Applicants</Button>
            </JobCard>
          ))
        ) : (
          <div className="text-center absolute inset-x-0 inset-y-2/4 text-gray-500 font-grotesk text-xl">
            No Jobs Found
          </div>
        )}
      </div>
    </Suspense>
  );
};

export default JobOpenings;
