import { Badge } from "@/components/ui/badge";
import Container from "./Container";
import Loader from "./Loader";
import PropTypes from "prop-types";
import moment from "moment";

const Resume = ({ user, isLoading }) => {
  if (isLoading)
    return (
      <div
        className={`min-w-96 border-none border-0 my-0 bg-background px-6 w-96`}
      >
        <Loader />
      </div>
    );

  const { fullName, bio, skills, projects, experience, education, profilePic } =
    user;

  return (
    <Container
      className={`min-w-96 border-none border-0 my-0 bg-background px-6 w-96`}
    >
      <div className="">
        <img
          src={profilePic || "https://via.placeholder.com/150"}
          alt="profile"
          className="rounded-full h-32 w-32 mx-auto bg-black"
        />
        <p className="text-center text-xl font-bold">{fullName}</p>
      </div>
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Bio</h2>
        <p className="text-gray-700 mt-2">{bio}</p>
      </div>

      {/* <!-- Skills Section --> */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className=" items-center flex flex-row justify-stretch flex-wrap gap-1">
          {skills
            ?.join(", ")
            .split(", ")
            .map((skill, index) => (
              <li key={index}>
                <Badge className="w-fit">{skill}</Badge>
              </li>
            ))}
        </ul>
      </div>

      {/* <!-- Portfolio Links Section --> */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <ul className="mt-2 text-sm space-y-2">
          {projects?.map((project, index) => (
            <li key={index}>
              <div className="flex flex-row flex-wrap">
                <h3 className="font-semibold">{project?.title}</h3>
                <p className="text-gray-500">{project?.skills.join(", ")}</p>
              </div>
              <p className="">{moment(project?.endDate).format("MMM YYYY")}</p>
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
      </div>

      {/* <!-- Experience Section --> */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <ul className="mt-2 text-sm space-y-2">
          {experience?.map((exp, index) => (
            <li key={index}>
              <div className="flex flex-row flex-wrap">
                <p className="font-semibold">{exp?.employer}</p>
                <h3 className="font-semibold">{exp?.jobTitle}</h3>
              </div>
              <p className="">
                {moment(exp?.startDate).format("MMM YYYY")} -{" "}
                {moment(exp?.endDate).format("MMM YYYY")}
              </p>
              <p
                className="bullet_list"
                dangerouslySetInnerHTML={{ __html: exp?.description }}
              ></p>
            </li>
          ))}
        </ul>
      </div>

      {/* <!-- Education Section --> */}
      <div>
        <h2 className="text-xl font-semibold">Education</h2>
        {education?.map((edu, index) => (
          <div key={index} className="mt-2">
            <h3 className="font-semibold">{edu?.institution}</h3>
            <p className="text-gray-600">
              {edu?.degree} ({edu?.yearOfGraduation})
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

Resume.propTypes = {
  isLoading: PropTypes.bool,
  user: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
        endDate: PropTypes.string.isRequired,
        url: PropTypes.string, // Made optional
      })
    ).isRequired,
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        jobTitle: PropTypes.string.isRequired,
        employer: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    education: PropTypes.arrayOf(
      PropTypes.shape({
        institution: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        yearOfGraduation: PropTypes.string.isRequired,
      })
    ).isRequired,
    profilePic: PropTypes.string, // Added profilePic to PropTypes
  }).isRequired,
};

export default Resume;
