import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const PersonalInfo = () => {
  return (
    <>
      <div className=" flex w-full flex-row justify-between px-5 items-baseline">
        <h3 className="text-3xl py-2 font-grotesk border-b border-r-8 px-4 border-black">
          Profile Information
        </h3>
        <Separator className="w-auto" />
      </div>
      <div className="border h-full p-4 m-4 rounded-xl flex flex-row">
        <div className="flex gap-5 items-center justify-start py-4 w-1/2  flex-row">
          <img
            src="https://via.placeholder.com/150"
            alt="profile"
            className="w-28 p-2 h-28 rounded-full"
          />
          <div className="flex p-4 flex-col">
            <p className="text-xl font-bold">John Doe</p>
            <p className="text-primary/50 text-md">Job Seeker</p>
            <p className="text-lg">Software Engineer</p>
            <p className="text-lg">San Francisco, CA</p>
            <p className="text-lg">email@email.com</p>
          </div>
        </div>
        <div className="flex w-1/2 items-center p-4 flex-row-reverse">
          <Dialog>
            <DialogTrigger>
              {" "}
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary/5 "
              >
                <Edit className="inline-flex justify-end" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile Information?</DialogTitle>
                <DialogDescription>
                  <form className="grid grid-cols-2 h-full gap-4">
                    <Input placeholder="Firstname" />
                    <Input placeholder="Lastname" />
                    <Input className="col-span-2" placeholder="Email" />
                    <Input className="h-[200%] col-span-2" placeholder="Bio" />
                    <Input placeholder="Firstname" />
                    <Input placeholder="Lastname" />
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
