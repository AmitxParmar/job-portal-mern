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

const PostAJobButton = () => {
  const form = useForm();
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
    mutation.mutate(jobData);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="border w-fit lg:w-fit text-center mx-auto rounded-full px-1.5 lg:px-4 font-bold lg:gap-2 font-grotesk lg:scale-110 border-black transition-all lg:border-b py-2 lg:whitespace-nowrap"
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
            form={form}
            onSubmit={handleJobSubmit}
            onCancel={() => setOpen(false)} // close the dialog onCancel
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostAJobButton;
