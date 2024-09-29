import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import PersonalInfoForm from "./PersonalInfoForm";
import PropTypes from "prop-types";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { updateUserProfile } from "@/services/userServices";
import { useForm } from "react-hook-form";

const PersonalInfo = ({ user, isLoading }) => {
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
      linkedin: user?.profileLinks?.linkedIn ?? "",
      github: user?.profileLinks?.github ?? "",
      other: user?.profileLinks?.other ?? "",
    },
    values: {
      fullName: user?.fullName ?? "",
      bio: user?.bio ?? "",
      designation: user?.designation ?? "",
      contact: user?.contact ?? "",
      contactEmail: user?.contactEmail ?? "",
      address: user?.address ?? "",
      linkedin: user?.profileLinks?.linkedIn ?? "",
      github: user?.profileLinks?.github ?? "",
      other: user?.profileLinks?.other ?? "",
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
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ userId, data }) => updateUserProfile(userId, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["user", user._id]);
    },
  });
  const onSubmit = (data) => {
    mutate(
      { userId: user._id, data },
      {
        onSuccess: (s) => console.log("success", s),
      }
    );
    console.log(data);
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between px-5 items-baseline">
        <h3 className="text-3xl py-2 font-grotesk border-b border-r-8 px-4 border-black">
          Profile Information
        </h3>
        <Separator className="w-auto" />
      </div>
      <div className="border w-full h-full p-4 m-4 rounded-xl flex flex-row">
        {!isLoading ? (
          <PersonalInfoForm
            form={form}
            onSubmit={onSubmit}
            previewUrl={previewUrl}
            handleButtonClick={handleButtonClick}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />
        ) : (
          <Skeleton className={`min-h-full min-w-full`} />
        )}
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
    skills: PropTypes.arrayOf(PropTypes.string),
    profileLinks: PropTypes.shape({
      linkedIn: PropTypes.string,
      github: PropTypes.string,
      other: PropTypes.shape({
        platform: PropTypes.string,
        url: PropTypes.string,
      }),
    }),
  }),
  isLoading: PropTypes.bool.isRequired,
};

export default PersonalInfo;
