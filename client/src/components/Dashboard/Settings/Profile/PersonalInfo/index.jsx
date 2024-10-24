import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import PersonalInfoForm from "./PersonalInfoForm";
import PropTypes from "prop-types";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { updateUserProfile } from "@/services/userServices";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

const PersonalInfo = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const form = useForm({
    defaultValues: {
      fullName: user?.fullName ?? "",
      bio: user?.bio ?? "",
      designation: user?.designation ?? "",
      contact: user?.contact ?? "",
      contactEmail: user?.contactEmail ?? "",
      address: user?.address ?? "",
      skills: user?.skills ?? "",
      profileLinks: {
        linkedIn: user?.profileLinks?.linkedIn ?? "",
        github: user?.profileLinks?.github ?? "",
      },
    },
    values: {
      fullName: user?.fullName ?? "",
      bio: user?.bio ?? "",
      designation: user?.designation ?? "",
      contact: user?.contact ?? "",
      contactEmail: user?.contactEmail ?? "",
      address: user?.address ?? "",
      skills: user?.skills ?? "",
      profileLinks: {
        linkedIn: user?.profileLinks?.linkedIn ?? "",
        github: user?.profileLinks?.github ?? "",
      },
    },
  });

  useEffect(() => {
    if (user?.profilePic) {
      setPreviewUrl(user.profilePic);
    }
  }, [user?.profilePic]);

  const handleFileChange = (event) => {
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
    fileInputRef.current?.click();
  };

  const { mutate: updateProfile } = useMutation({
    mutationFn: ({ data }) => updateUserProfile(data),
    onSuccess: (data) => {
      // Set currentUser cache with updated user data
      queryClient.setQueryData(["currentUser"], (oldData) => ({
        ...oldData,
        user: data.updatedUser,
      }));
    },
  });

  const onSubmit = (data) => {
    updateProfile(
      { data },
      {
        onSuccess: () =>
          toast.success("Success!", {
            description: `Profile data updated Successfully!`,
          }),
        onError: (error) =>
          toast.success("Error!", {
            description: `${error.message}`,
          }),
      }
    );
  };

  return (
    <>
      <div className="flex flex-row justify-between py-0 lg:py-8 px-5 items-baseline">
        <h3 className="text-3xl py-2 font-grotesk border-b border-r-8 px-4 border-black">
          Profile Information
        </h3>
        <Separator className="w-auto" />
      </div>
      <div className="border w-full h-full lg:p-4 my-4 rounded-xl flex flex-row">
        <PersonalInfoForm
          form={form}
          onSubmit={onSubmit}
          previewUrl={previewUrl}
          handleButtonClick={handleButtonClick}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
        />
      </div>
    </>
  );
};

PersonalInfo.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    email: PropTypes.string,
    profilePic: PropTypes.string,
    fullName: PropTypes.string,
    bio: PropTypes.string,
    contact: PropTypes.string,
    contactEmail: PropTypes.string,
    designation: PropTypes.string,
    address: PropTypes.string,
    //NOTE: change schema to only string instead of array
    skills: PropTypes.arrayOf(PropTypes.string),
    profileLinks: PropTypes.shape({
      linkedIn: PropTypes.string,
      github: PropTypes.string,
    }),
  }),
  isLoading: PropTypes.bool,
};

export default PersonalInfo;
