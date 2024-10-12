import { Badge } from "@/components/ui/badge";
import Container from "./Container";
import Loader from "./Loader";
import PropTypes from "prop-types";
import { memo } from "react";
import moment from "moment";
import { cn } from "@/lib/utils";
import {
  CircleUserRoundIcon,
  BriefcaseBusiness,
  GitBranch,
  FolderOpen,
  GraduationCap,
} from "lucide-react";

const Resume = ({ user, isLoading, className }) => {
  if (isLoading) {
    return (
      <div
        className={`min-w-96 border-none border-0 my-0 bg-background px-6 w-96`}
      >
        <Loader />
      </div>
    );
  } else if (user) {
    const {
      fullName,
      bio,
      skills,
      projects,
      experience,
      education,
      profilePic,
      designation,
    } = user;
    return (
      <Container
        className={cn(
          `min-w-96 border-none font-inter border-0 my-0 bg-background max-h-full py-12 px-10 w-96`,
          className
        )}
      >
        {/* Basic Info */}
        <section className="pb-4">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="profile"
            className="rounded-full h-20 w-20 mx-auto bg-black"
          />
          <p className="text-center text-xl font-bold">{fullName}</p>
          <p>{designation}</p>
        </section>

        {/* Profile Section */}
        <section className="pb-4">
          <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
            <CircleUserRoundIcon className="h-5 w-5 mr-2" />
            <span>Profile</span>
          </h2>
          <p className="text-center text-sm mt-2">{bio}</p>
        </section>

        {/* <!-- Skills Section --> */}
        <section className="pb-4">
          <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
            <GitBranch className="h-5 w-5 mr-2" />
            Skills
          </h2>
          <ul className="mt-2 items-center flex flex-row justify-stretch flex-wrap gap-1">
            {skills
              ?.join(", ")
              .split(", ")
              .map((skill, index) => (
                <li key={index}>
                  <Badge className="w-fit">{skill}</Badge>
                </li>
              ))}
          </ul>
        </section>

        {/* <!-- Projects --> */}
        <section className="pb-4">
          <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
            <FolderOpen className="h-5 w-5 fill-black stroke-white mr-2" />
            Projects
          </h2>
          <ul className="mt-2 max-w-96 relative text-sm space-y-2">
            {projects?.map((project, index) => (
              <li key={index}>
                <div className="flex flex-row">
                  <div className="flex flex-row ">
                    <h3 className="font-semibold text-nowrap mr-1">
                      {project?.title},
                      <span className="font-normal text-gray-500 text-wrap text-sm italic ">
                        {" "}
                        {project?.skills.join(", ")}
                      </span>
                    </h3>
                  </div>
                  <p className="right-0 pl-6 text-nowrap float-right">
                    {moment(project?.endDate).format("MMM YYYY")}
                  </p>
                </div>
                <p
                  className="bullet_list"
                  dangerouslySetInnerHTML={{ __html: project?.description }}
                ></p>
                <a
                  href={project?.url}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  View Project
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* <!-- Experience Section --> */}
        <section className="pb-4">
          <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
            <BriefcaseBusiness className="h-5 w-5 mr-2" />
            Experience
          </h2>
          <ul className="mt-2 relative text-sm space-y-2">
            {experience?.map((exp, index) => (
              <li key={index}>
                <div className="flex flex-row flex-wrap">
                  <p className="font-semibold">{exp?.employer}</p>
                  <h3 className="italic">{exp?.jobTitle}</h3>

                  <p className="absolute right-0">
                    {moment(exp?.startDate).format("MMM YYYY")} -{" "}
                    {moment(exp?.endDate).format("MMM YYYY")}
                  </p>
                </div>
                <p
                  className="bullet_list"
                  dangerouslySetInnerHTML={{ __html: exp?.description }}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* <!-- Education Section --> */}
        <section className="pb-4">
          <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
            <GraduationCap className="h-5 w-5 mr-2" />
            Education
          </h2>
          {education?.map((edu, index) => (
            <div key={index} className="relative text-sm flex flex-row mt-2">
              <p className="font-semibold  mr-2">{edu?.degree},</p>
              <h3 className="italic"> {edu?.institution}</h3>
              <p className="absolute right-0">{edu?.yearOfGraduation}</p>
            </div>
          ))}
        </section>
      </Container>
    );
  } else {
    return (
      <div
        className={`min-w-96 border-none border-0 my-0 min-h-full p-3  item-center rounded-3xl bg-background px-6 w-96`}
      >
        <p className="text-center text-xl font-bold">Select User to render</p>
      </div>
    );
  }
};

Resume.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  user: PropTypes.shape({
    profilePic: PropTypes.string, // Added profilePic to PropTypes
    designation: PropTypes.string,
    fullName: PropTypes.string,
    bio: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.string),
        endDate: PropTypes.string,
        url: PropTypes.string, // Made optional
      })
    ),
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        yoe: PropTypes.string,
        jobTitle: PropTypes.string,
        employer: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
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
};

export default memo(Resume);
