import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import PersonalInfoForm from "./PersonalInfoForm";
import { Camera } from "lucide-react";

const PersonalInfo = ({ user }) => {
  const { profile } = user;
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const form = useForm({
    defaultValues: {
      fullName: profile?.fullName || "",
      jobTitle: profile?.jobTitle || "",
      email: profile?.contactEmail || "",
      phone: profile?.contact || "",
      address: profile?.address || "",
      linkedin: profile?.profileLinks?.linkedin || "",
      github: profile?.profileLinks?.github || "",
      other: profile?.profileLinks?.other || "",
    },
  });

  useEffect(() => {
    if (profile?.profilePic) {
      setPreviewUrl(profile.profilePic);
    }
  }, [profile?.profilePic]);

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

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between px-5 items-baseline">
        <h3 className="text-3xl py-2 font-grotesk border-b border-r-8 px-4 border-black">
          Profile Information
        </h3>
        <Separator className="w-auto" />
      </div>
      <div className="border w-fulls h-full p-4 m-4 rounded-xl flex flex-row">
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
    profile: PropTypes.shape({
      profilePic: PropTypes.string,
      fullName: PropTypes.string,
      bio: PropTypes.string,
      contact: PropTypes.string,
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
      projects: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          skills: PropTypes.arrayOf(PropTypes.string),
          endDate: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string,
          ]), // Allowing both Date and String
          description: PropTypes.string,
          url: PropTypes.string,
          repository: PropTypes.string,
        })
      ),
      experience: PropTypes.arrayOf(
        PropTypes.shape({
          jobTitle: PropTypes.string,
          employer: PropTypes.string,
          startDate: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string,
          ]), // Allowing both Date and String
          endDate: PropTypes.oneOfType([
            PropTypes.instanceOf(Date),
            PropTypes.string,
          ]), // Allowing both Date and String
          description: PropTypes.string,
        })
      ),
      education: PropTypes.arrayOf(
        PropTypes.shape({
          institution: PropTypes.string,
          degree: PropTypes.string,
          yearOfGraduation: PropTypes.string,
        })
      ),
    }),
  }),
};

export default PersonalInfo;
