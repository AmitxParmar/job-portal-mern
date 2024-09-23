import { profileMenu } from "@/constants";
import { Link } from "react-router-dom";
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
import JobPostForm from "../../EmployerComponents/JobPostForm";
import { useState } from "react";

const AdminNav = () => {
  const [open, setOpen] = useState(false); // Use state to manage dialog open/close

  const handleJobSubmit = (data) => {
    console.log("Job submitted:", data);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="overflow-hidden rounded-xl flex flex-col space-y-2 py-6 mt-4 px-1">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="border w-full text-center mx-auto rounded-full px-4 font-bold border-black transition-all border-b py-2 whitespace-nowrap"
            onClick={() => setOpen(true)} // Open dialog on button click
          >
            Post a Job
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
                setOpen(false); // Close dialog on successful submit
              }}
              onCancel={() => setOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
      {profileMenu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`border w-full text-center mx-auto rounded-full px-4 text-black border-black transition-all border-b bg-white py-2 whitespace-nowrap relative ${
            location.pathname === item.path
              ? "border-black invert scale-15"
              : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default AdminNav;
