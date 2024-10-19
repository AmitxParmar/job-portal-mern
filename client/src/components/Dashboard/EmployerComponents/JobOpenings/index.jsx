import ApplicantsDrawer from "../common/ApplicationDrawer";
import { Button } from "@/components/ui/button";
import CardSkeleton from "../../common/JobCard/CardSkeleton";
import JobCard from "../../common/JobCard";
import { getRecruiterJobs, updateJob } from "@/services/JobServices";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Users, PencilIcon } from "lucide-react";
import JobForm from "../JobForm";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

const JobOpenings = () => {
  const [openStates, setOpenStates] = useState({});
  const [editingJob, setEditingJob] = useState(null);
  const { user } = useAuth();

  const { data, error, status, refetch } = useQuery({
    queryKey: ["recruiter-jobs"],
    queryFn: getRecruiterJobs,
    retry: 1,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 2,
  });

  const { mutate: editJob } = useMutation({
    mutationKey: ["update-job"],
    mutationFn: ({ id, jobData }) => updateJob(id, jobData),
    onSuccess: (data) => {
      toast.success("Success!", {
        description: data.message,
      });
      refetch(); // Refetch the jobs after successful update
      setEditingJob(null); // Close the dialog
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed Updating A Job Posting",
      });
    },
  });

  const form = useForm();

  const onSubmit = (jobData) => {
    editJob({ id: editingJob._id, jobData });
  };

  const onCancel = () => {
    setEditingJob(null);
  };

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

  const handleEditClick = (job) => {
    setEditingJob(job);
    form.reset(job); // Pre-fill the form with job data
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
      <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none mb-24 lg:mb-0 overflow-y-scroll mx-auto lg:grid-cols-3 xl:grid-cols-5 lg:gap-3">
        {data?.jobs?.length > 0 ? (
          data?.jobs?.map((job) => (
            <div key={job?._id}>
              <JobCard job={job} isBookmarked={isBookmarked(job)}>
                <div className="grid w-fit grid-cols-2 gap-1">
                  <Button
                    title="View Applicants"
                    size="icon"
                    className="hover:invert border-primary font-semibold rounded-full"
                    variant={
                      job?.applicants?.length === 0 ? "destructive" : "outline"
                    }
                    onClick={() => handleSetOpen(job._id, true)}
                    disabled={job?.applicants?.length === 0}
                  >
                    <Users size={20} />
                  </Button>

                  <Button
                    title="Edit Job Details"
                    onClick={() => handleEditClick(job)}
                    size="icon"
                    className="hover:invert border-primary font-semibold rounded-full"
                  >
                    <PencilIcon size={20} />
                  </Button>

                  <Dialog
                    className=""
                    open={!!editingJob}
                    onOpenChange={() => setEditingJob(null)}
                  >
                    <DialogContent className="max-h-screen py-6 overflow-auto min-w-max">
                      <JobForm
                        companies={user?.companies}
                        form={form}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </JobCard>
              <ApplicantsDrawer
                open={openStates[job?._id] || false}
                setOpen={(isOpen) => handleSetOpen(job?._id, isOpen)}
                job={job}
                isBookmarked={isBookmarked(job._id)}
              />
            </div>
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
