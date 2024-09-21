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

const AdminNav = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation();
  const handleJobSubmit = (data) => {
    console.log("Job submitted:", data);
    mutation.mutate({
      mutationFn: () => createJob(data),
      onSuccess: () => {
        queryClient;
      },
    });
    // Here you would typically send this data to your backend
  };
  return (
    <div className="overflow-hidden rounded-xl  flex flex-col space-y-2 py-6 mt-4 px-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="border w-full text-center mx-auto rounded-full px-4 font-bold border-black transition-all border-b py-2 whitespace-nowrap">
            Post a Job
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Post a New Job</DialogTitle>
            <DialogDescription>
              Fill out the form below to post a new job listing.
            </DialogDescription>
          </DialogHeader>
          <JobPostForm onSubmit={handleJobSubmit} onCancel={() => {}} />
        </DialogContent>
      </Dialog>
      {profileMenu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`border w-full text-center mx-auto  rounded-full px-4 text-black border-black transition-all border-b  bg-white py-2 whitespace-nowrap relative ${
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
  /* <Button
        varient="outline"
        onClick={() => navigate("/dashboard")}
        className="group transition-all flex flex-row items-center place-items-center text-center duration-500 hover:scale-105 rounded-full hover:bg-white px-4 py-2 justify-center border w-full hover:invert "
      >
        <ArrowLeft
          className="transition-all duration-500 ease-in-out group-hover:-translate-x-2"
          size={30}
        />
        <span className="ml-2 group">Back</span>
      </Button> 
       <div className="my-5">
        <img
          src="https://via.placeholder.com/150"
          alt="profile"
          className="rounded-full h-32 w-32 mx-auto bg-black"
        />
        <p className="text-center text-xl font-bold">John Doe</p>
      </div> */
};

export default AdminNav;
