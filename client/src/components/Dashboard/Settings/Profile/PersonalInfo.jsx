import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit, Camera, Edit3, Check, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const PersonalInfo = ({ profile }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profile?.image) {
      setPreviewUrl(profile.image);
    }
  }, [profile?.image]);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between px-5 items-baseline">
        <h3 className="text-3xl py-2 font-grotesk border-b border-r-8 px-4 border-black">
          Profile Information
        </h3>
        <Separator className="w-auto" />
      </div>
      <div className="border h-full p-4 m-4 rounded-xl flex flex-row">
        <div className="flex gap-4 items-center justify-start py-4 w-1/2 flex-row">
          <img
            src={previewUrl ?? "https://via.placeholder.com/150"}
            alt="profile"
            className="w-28 p-2 h-28 rounded-full"
          />
          <div className="flex p-4 flex-col">
            <span className="text-xl font-bold">John Doe</span>
            <span className="text-primary/50 text-md">Job Seeker</span>
            <span className="text-lg">Software Engineer</span>
            <span className="text-lg">San Francisco, CA</span>
            <span className="text-lg">email@email.com</span>
          </div>
        </div>
        <div className="flex w-1/2 items-center p-4 flex-row-reverse">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-primary/5"
              >
                <Edit className="inline-flex justify-end" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl shadow-xl w-full h-full pb-0 overflow-auto max-w-[800px]">
              <DialogHeader className="px-5 md:px-7 lg:px-9 py-5 pb-5 md:py-7">
                <DialogTitle className="sticky top-0 text-2xl h-8 z-2 bg-white">
                  Edit Personal Details
                </DialogTitle>
              </DialogHeader>
              <Separator />
              <DialogDescription className="space-y-6">
                <div className="grid w-full grid-cols-1 my-3 items-center md:grid-cols-[1fr_auto] h-auto md:gap-6 xl:gap-8">
                  <div className="order-2 md:order-1 flex flex-col justify-around items-center h-full">
                    <div className="w-full">
                      <label className="font-semibold px-2">Full name</label>
                      <Input placeholder="Full Name" className="h-12" />
                    </div>
                    <div className="w-full">
                      <label className="font-semibold px-2">Job Title</label>
                      <Input placeholder="Job Title" className="h-12" />
                    </div>
                  </div>

                  <div className="order-1 mb-4 flex justify-center md:order-2 relative md:mb-0 md:pt-2">
                    <Button
                      name="profilePic"
                      variant="ghost"
                      className="border flex flex-col w-30 h-30 p-2 rounded-full z-2"
                      onClick={handleButtonClick}
                    >
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <Camera size={150} className="p-10" />
                      )}
                      <Edit3
                        size={50}
                        className="rounded-full bg-muted border p-3 absolute bottom-0 align-middle flex right-0"
                      />
                      <Input
                        name="profilePic"
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="w-full">
                    <label className="font-semibold px-2">Email</label>
                    <Input placeholder="Email" className="h-12" />
                  </div>
                  <div className="w-full">
                    <label className="font-semibold px-2">Phone</label>
                    <Input placeholder="Phone" className="h-12" />
                  </div>
                  <div className="col-span-2">
                    <label className="font-semibold px-2">Address</label>
                    <Input placeholder="Address" className="h-12" />
                  </div>
                </div>
                <div>
                  <h4 className="text-foreground text-2xl leading-none bg-white h-8 sticky top-0 z-1 my-2 font-semibold">
                    Links
                  </h4>
                  <Separator />
                  <div className="w-full my-3">
                    <label className="font-semibold px-2">LinkedIn</label>
                    <Input placeholder="LinkedIn" className="h-12" />
                  </div>
                  <div className="w-full my-3">
                    <label className="font-semibold px-2">Github</label>
                    <Input placeholder="Github" className="h-12" />
                  </div>
                  <div className="w-full my-3">
                    <label className="font-semibold px-2">Other</label>
                    <Input placeholder="Other" className="h-12" />
                  </div>
                </div>
              </DialogDescription>
              <DialogFooter className="sticky h-14 items-center bg-background bottom-0 grid grid-cols-[auto_min-content]">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="text-lg flex flex-row justify-center rounded-full gap-2 h-12 font-medium"
                  >
                    <X />
                    <Separator orientation="vertical" />
                    <span>Cancel</span>
                  </Button>
                </DialogClose>
                <Button className="text-lg flex flex-row justify-center rounded-full gap-2 h-12 font-medium">
                  <Check />
                  <Separator orientation="vertical" />
                  <span>Save</span>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

PersonalInfo.propTypes = {
  profile: PropTypes.shape({
    image: PropTypes.string,
  }),
};

export default PersonalInfo;
