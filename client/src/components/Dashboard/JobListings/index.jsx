import { Fragment, Suspense, lazy } from "react";

import { Button } from "@/components/ui/button";
import CardSkeleton from "./CardSkeleton";
import Loader from "../common/Loader";
import { useAuth } from "@/hooks/useAuth";
import { useFilters } from "@/hooks/useFilters";

const JobCard = lazy(() => import("./JobCard"));

const JobListings = () => {
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
        {data?.pages?.length > 0 ? (
          data?.pages?.map((page, i) => (
            <Fragment key={i}>
              {page?.jobs?.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  isBookmarked={user?.bookmarkedJobs?.some(
                    (bookmarkedJob) => bookmarkedJob._id === job._id
                  )}
                />
              ))}
            </Fragment>
          ))
        ) : (
          <div className="text-center absolute inset-x-0 inset-y-2/4 text-gray-500 font-grotesk text-xl">
            No Jobs Found
          </div>
        )}
      </div>
      <div>
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
    </Suspense>
  );
};

export default JobListings;
