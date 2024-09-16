import React from "react";
import Container from "./Container";

const Resume = () => {
  return (
    <Container className={`min-w-96 w-96`}>
      <div className="my-5">
        <img
          src="https://via.placeholder.com/150"
          alt="profile"
          className="rounded-full h-32 w-32 mx-auto bg-black"
        />
        <p className="text-center text-xl font-bold">John Doe</p>
      </div>
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Bio</h2>
        <p className="text-gray-700 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          vitae pulvinar eros.
        </p>
      </div>

      {/* <!-- Skills Section --> */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className="mt-2 space-y-2">
          <li className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full inline-block">
            JavaScript
          </li>
          <li className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full inline-block">
            React
          </li>
          <li className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full inline-block">
            Node.js
          </li>
        </ul>
      </div>

      {/* <!-- Resume Section --> */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Resume</h2>
        <a
          href="https://example.com/resume"
          target="_blank"
          className="text-blue-500 underline"
        >
          View Resume
        </a>
      </div>

      {/* <!-- Portfolio Links Section --> */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Portfolio Links</h2>
        <ul className="mt-2 space-y-2">
          <li>
            <a
              href="https://example.com/portfolio1"
              target="_blank"
              className="text-blue-500 underline"
            >
              Portfolio 1
            </a>
          </li>
          <li>
            <a
              href="https://example.com/portfolio2"
              target="_blank"
              className="text-blue-500 underline"
            >
              Portfolio 2
            </a>
          </li>
        </ul>
      </div>

      {/* <!-- Experience Section --> */}
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="mt-2">
          <h3 className="font-semibold">Company A</h3>
          <p className="text-gray-600">
            Software Engineer (Jan 2020 - Dec 2021)
          </p>
          <p className="text-gray-700">
            Worked on building full-stack web applications using React and
            Node.js.
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Company B</h3>
          <p className="text-gray-600">
            Frontend Developer (Feb 2018 - Dec 2019)
          </p>
          <p className="text-gray-700">
            Focused on creating responsive UI components using React and
            Tailwind CSS.
          </p>
        </div>
      </div>

      {/* <!-- Education Section --> */}
      <div>
        <h2 className="text-xl font-semibold">Education</h2>
        <div className="mt-2">
          <h3 className="font-semibold">University X</h3>
          <p className="text-gray-600">Bachelor's in Computer Science (2022)</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">University Y</h3>
          <p className="text-gray-600">
            Master's in Software Engineering (2024)
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Resume;
