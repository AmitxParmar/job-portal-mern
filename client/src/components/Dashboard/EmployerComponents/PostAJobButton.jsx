import JobForm from "./JobForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJob } from "@/services/JobServices";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const PostAJobButton = () => {
  const form = useForm();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // mutation initialization
  const mutation = useMutation({
    mutationFn: createJob, // Specify mutation function
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["jobs"]);
    },
  });

  // Submit job @{params} jobData
  const handleJobSubmit = (jobData) => {
    mutation.mutate(jobData, {
      onSuccess: (data) =>
        toast.success("Successfully posted!", {
          description: data?.message,
        }),
      onError: (error) =>
        toast.error("Failed posting!", {
          description: error.message,
        }),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          title="Post a job"
          className="border w-fit lg:w-fit text-center lg:mx-auto rounded-full px-1.5 lg:px-4 font-bold lg:gap-2 font-grotesk lg:scale-110 border-black transition-all lg:border-b py-2 lg:whitespace-nowrap"
          onClick={() => setOpen(true)} // Open dialog on button click
        >
          <Plus />
          <span className="hidden lg:block">Post a Job</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-screen-xl max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
          <DialogDescription>
            Fill out the form below to post a new job listing.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <JobForm
            companies={user?.companies}
            form={form}
            onSubmit={handleJobSubmit} // pass the function to receive in data
            onCancel={() => setOpen(false)} // close the dialog onCancel
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostAJobButton;
