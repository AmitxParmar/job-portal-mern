import { Fragment, Suspense } from "react";
import JobCard from "../common/JobCard";
import CardSkeleton from "../common/JobCard/CardSkeleton";
import JobDetails from "./JobDetails";
import Loader from "../common/Loader";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";
import { useFilters } from "@/hooks/useFilters";

const UserJobListings = () => {
  const { jobQuery } = useFilters();
  const { user } = useAuth();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = jobQuery;

  const isBookmarked = (jobId) => {
    return (
      user?.bookmarkedJobs?.some(
        (bookmarkedJob) => bookmarkedJob?._id === jobId
      ) || false
    );
  };

  return status === "pending" ? (
    <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2  scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {Array.from({ length: 10 }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  ) : status === "error" ? (
    <div className="text-red-500 text-5xl">{error?.message}</div>
  ) : (
    <Suspense fallback={<Loader />}>
      <div className="mb-24 lg:mb-0">
        <div className="grid mt-2 grid-cols-1 max-h-full md:grid-cols-2 scroll-smooth  pl-2 scrollbar-none h-[100vh-20vh] overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {data?.pages?.length > 0 ? (
            data?.pages?.map((page, i) => (
              <Fragment key={i}>
                {page?.jobs?.map((job) => (
                  <JobCard
                    isBookmarked={isBookmarked(job._id)}
                    key={job._id}
                    job={job}
                  >
                    <JobDetails
                      job={job}
                      isBookmarked={isBookmarked(job._id)}
                    />
                  </JobCard>
                ))}
              </Fragment>
            ))
          ) : (
            <div className="text-center absolute inset-x-0 inset-y-2/4 text-gray-500 font-grotesk text-xl">
              No Jobs Found....try clearing filters.
            </div>
          )}
        </div>
        <div className="w-full flex text-primary items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </Button>
        </div>
        <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      </div>
    </Suspense>
  );
};

export default UserJobListings;
