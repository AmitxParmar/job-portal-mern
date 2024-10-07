import ApplicantsDrawer from "./ApplicantsDrawer";
import { Button } from "@/components/ui/button";
import CardSkeleton from "../../common/JobCard/CardSkeleton";
import JobCard from "../../common/JobCard";
import { getRecruiterJobs } from "@/services/JobServices";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const JobOpenings = () => {
  const { user } = useAuth();
  const { data, error, status } = useQuery({
    queryKey: ["recruiter-jobs"],
    queryFn: getRecruiterJobs,
  });

  // Create a state object to manage open/close state for each job
  const [openStates, setOpenStates] = useState({});

  const handleSetOpen = (jobId, isOpen) => {
    setOpenStates((prev) => ({ ...prev, [jobId]: isOpen }));
  };

  if (status === "pending") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {Array.from({ length: 10 }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return <div className="text-red-500 text-5xl">{error?.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {data?.jobs?.length > 0 ? (
        data.jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            isBookmarked={user?.bookmarkedJobs?.some(
              (bookmarkedJob) => bookmarkedJob?._id === job?._id
            )}
          >
            <Button
              className="max-h-fit hover:invert border-primary max-w-fit font-semibold rounded-full"
              variant={
                job?.applicants?.length === 0 ? "destructive" : "outline"
              }
              onClick={() => handleSetOpen(job._id, true)}
              disabled={job.applicants.length === 0}
            >
              {job.applicants.length === 0 ? "No Applicants!" : "Applicants"}
            </Button>
            <ApplicantsDrawer
              open={openStates[job._id] || false}
              setOpen={(isOpen) => handleSetOpen(job._id, isOpen)}
              job={job}
              isBookmarked={user?.bookmarkedJobs?.some(
                (bookmarkedJob) => bookmarkedJob?._id === job?._id
              )}
            />
          </JobCard>
        ))
      ) : (
        <div className="text-center absolute inset-x-0 inset-y-2/4 text-gray-500 font-grotesk text-xl">
          No Jobs Found
        </div>
      )}
    </div>
  );
};

export default JobOpenings;
