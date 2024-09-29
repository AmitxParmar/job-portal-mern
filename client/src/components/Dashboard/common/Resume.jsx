import { Badge } from "@/components/ui/badge";
import Container from "./Container";
import PropTypes from "prop-types";

const Resume = ({ user }) => {
  const { fullName, bio, skills, projects, experience, education } = user;

  return (
    <Container className={`min-w-96 bg-background px-6 w-96`}>
      <div className="my-5">
        <img
          src="https://via.placeholder.com/150"
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
        <ul className="mt-2 space-y-2">
          {skills.map((skill, index) => (
            <Badge key={index} className=" px-3 py-1 rounded-full inline-block">
              {skill}
            </Badge>
          ))}
        </ul>
      </div>

      {/* <!-- Portfolio Links Section --> */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <ul className="mt-2 space-y-2">
          {projects?.map((project, index) => (
            <li key={index}>
              <h3 className="font-semibold">{project?.title}</h3>
              <p className="text-gray-600">{project?.description}</p>
              <p className="text-gray-500">
                Skills: {project?.skills.join(", ")}
              </p>
              <p className="text-gray-500">
                End Date: {new Date(project?.endDate).toLocaleDateString()}
              </p>
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
        {experience?.map((exp, index) => (
          <div key={index} className="mt-2">
            <h3 className="font-semibold">
              {exp?.jobTitle} at {exp?.employer}
            </h3>
            <p className="text-gray-600">
              {new Date(exp?.startDate).toLocaleDateString()} -{" "}
              {new Date(exp?.endDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* <!-- Education Section --> */}
      <div>
        <h2 className="text-xl font-semibold">Education</h2>
        {education?.map((edu, index) => (
          <div key={index} className="mt-2">
            <h3 className="font-semibold">{edu.institution}</h3>
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
  }).isRequired,
};

export default Resume;
