import ApplicantsDrawer from "./ApplicationDrawer";
import { Button } from "@/components/ui/button";
import CardSkeleton from "../../common/JobCard/CardSkeleton";
import JobCard from "../../common/JobCard";
import { getRecruiterJobs } from "@/services/JobServices";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Users } from "lucide-react";
import ToolTip from "@/components/ui/tooltip";
import { PencilIcon } from "lucide-react";

const JobOpenings = () => {
  const [openStates, setOpenStates] = useState({});
  const { user } = useAuth();
  const { data, error, status } = useQuery({
    queryKey: ["recruiter-jobs"],
    queryFn: getRecruiterJobs,
    retry: 1,
    cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
    staleTime: 1000 * 60 * 2, // Data is fresh for 2 minutes
  });
  const isBookmarked = (jobId) => {
    return (
      user?.bookmarkedJobs?.some(
        (bookmarkedJob) => bookmarkedJob?._id === jobId
      ) || false
    );
  };

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
  } else if (status === "error") {
    return <div className="text-red-500 text-5xl">{error?.message}</div>;
  } else if (status === "success")
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none  overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {data?.jobs?.length > 0 ? (
          data?.jobs?.map((job) => (
            <>
              <JobCard
                key={job?._id}
                job={job}
                isBookmarked={isBookmarked(job)}
              >
                <div className="grid w-fit  grid-cols-2 gap-1">
                  <div className="relative group">
                    <ToolTip message="View Applicants">
                      <Button
                        size="icon"
                        className="hover:invert border-primary font-semibold rounded-full"
                        variant={
                          job?.applicants?.length === 0
                            ? "destructive"
                            : "outline"
                        }
                        onClick={() => handleSetOpen(job._id, true)}
                        disabled={job?.applicants?.length === 0}
                      >
                        <Users size={20} />
                      </Button>
                    </ToolTip>
                  </div>
                  <div className="group">
                    <ToolTip message="Edit Job">
                      <Button
                        size="icon"
                        className="hover:invert border-primary font-semibold rounded-full"
                        /* onClick={() => handleSetOpen(job._id, true)} */
                      >
                        <PencilIcon size={20} />
                      </Button>
                    </ToolTip>
                  </div>
                </div>
              </JobCard>
              <ApplicantsDrawer
                open={openStates[job?._id] || false}
                setOpen={(isOpen) => handleSetOpen(job?._id, isOpen)}
                job={job}
                isBookmarked={user?.bookmarkedJobs?.some(
                  (bookmarkedJob) => bookmarkedJob?._id === job?._id
                )}
              />
            </>
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
