import JobPostForm from "./JobPostForm";
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

const PostAJobButton = () => {
  const [open, setOpen] = useState(false); // Use state to manage dialog open/close
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createJob, // Specify mutation function
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["jobs"]);
    },
  });

  const handleJobSubmit = (jobData) => {
    console.log("Job submitted:", jobData);
    mutation.mutate(jobData);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="border w-full text-center mx-auto rounded-full px-4 font-bold gap-2 font-grotesk scale-110 border-black transition-all border-b py-2 whitespace-nowrap"
          onClick={() => setOpen(true)} // Open dialog on button click
        >
          <Plus />
          <span>Post a Job</span>
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
          <JobPostForm
            onSubmit={(data) => {
              handleJobSubmit(data);
              setOpen(false);
            }}
            onCancel={() => setOpen(false)} // close the dialog onCancel
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostAJobButton;
