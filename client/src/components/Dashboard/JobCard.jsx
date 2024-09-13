import { Button } from "@headlessui/react";
import { Bookmark } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const JobCard = ({ name }) => {
  const jobData1 = {
    _id: "64e5cd73a9b51c1234567890",
    employer: "64e5bcd5a9b51c1234567890", // ObjectId of the employer (user)
    title: "Software Engineer",
    description:
      "Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.Develop and maintain web applications using modern JavaScript frameworks.",
    location: {
      _id: "64e5d123a9b51c1234567890", // Unique ID for location
      city: "San Francisco",
      state: "CA",
      country: "USA",
    },
    salaryRange: {
      min: 90000,
      max: 120000,
      frequency: "yearly",
    },
    tags: [
      "JavaScript",
      "React",
      "Node.js",
      "React",
      "Node.js",
      "React",
      "Node.js",
      "React",
      "Node.js",
      "React",
      "Node.js",
    ],
    socials: {
      linkedin: "https://linkedin.com/company/example",
      twitter: "https://twitter.com/example",
      website: "https://example.com",
    },
    skillsRequired: ["JavaScript", "React", "Node.js", "Git"],
    postedAt: "2024-09-01T12:34:56.789Z",
    applicants: ["64e5c3b8a9b51c1234567890", "64e5c4d1a9b51c1234567891"], // Array of applicant ObjectIds
    status: "open",
  };

  return (
    <>
      <div className="p-2 mx-auto border-l-8 border border-black max-h-[360px] hover:border hover:border-r-8 hover:shadow-xl transition-all rounded-3xl w-[90%] sm:w-64 md:w-72 lg:w-80 min-h-[350px] justify-around space-y-2 bg-white flex flex-col m-2">
        <div className="bg-orange-100 border h-4/5 min-h-[80%] max-h-[80%] rounded-2xl p-4 w-full flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm rounded-full bg-white text-center align-center py-2 px-3 font-bold text-black">
              20 May, 2023
            </p>
            <Button
              size="icon"
              className="bg-white rounded-full p-3 hover:bg-purple-500/30"
            >
              <Bookmark size={20} fill="black" />
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">Amazon</p>
            <h3 className="text-3xl font-medium font-grotesk">{name}</h3>
          </div>

          <div className="flex py-1 h-1/2 justify-stretch overflow-hidden flex-row flex-wrap gap-1 font-grotesk font-bold">
            <span className="px-3 font-semibold bg-background py-2 border border-black h-fit shadow-sm rounded-full text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap">
              JavaScript
            </span>
            <span className="px-3 font-semibold bg-background py-2 border border-black h-fit shadow-sm rounded-full text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap">
              Senior Work
            </span>
            <span className="px-3 font-semibold bg-background py-2 border border-black h-fit shadow-sm rounded-full text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap">
              Project Work
            </span>
            <span className="px-3 font-semibold bg-background py-2 border border-black h-fit shadow-sm rounded-full text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap">
              Distant
            </span>
            <span className="px-3 font-semibold bg-background py-2 border border-black h-fit shadow-sm rounded-full text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap">
              Distant
            </span>
            <span className="px-3 font-semibold bg-background py-2 border border-black h-fit shadow-sm rounded-full text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap">
              Distant
            </span>
            <span className="px-3 font-semibold bg-background py-2 border border-black h-fit shadow-sm rounded-full text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap">
              Distant
            </span>
            <span className="px-3 font-semibold bg-background py-2 border border-black h-fit shadow-sm rounded-full text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap">
              Distant
            </span>
          </div>
        </div>
        <div className="px-4 items-center flex flex-row justify-between">
          <div className="grid grid-rows-2">
            <div className=" font-bold text-gray-700">$250/hr</div>
            <div className="text-gray-500">San Francisco, CA</div>
          </div>

          <div className="max-h-fit max-w-fit font-semibold px-4 transition-all duration-300 bg-black text-white p-2 rounded-full hover:bg-purple-500/30 hover:text-black">
            <Drawer className="min-h-screen max-w-screen">
              <DrawerTrigger asChild>
                <Button variant="outline">Details</Button>
              </DrawerTrigger>
              <DrawerContent className="h-[calc(100vh-10vh)] max-w-screen">
                <DrawerHeader className={`w-fit`}>
                  <DrawerTitle>{jobData1.title}</DrawerTitle>
                  <DrawerDescription>{jobData1.employer}</DrawerDescription>
                  <div className="grid grid-flow-col space-x-2 w-max overflow-auto">
                    {jobData1.tags.map((tag) => (
                      <span
                        key={tag}
                        className="w-fit gap-2 rounded-full px-2 py-1 border border-gray-500 scrollbar-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </DrawerHeader>
                <div className="overflow-y-auto leading-9 scrollbar-thin scrollbar-thumb-rounded-full mx-auto text-center scrollbar-thumb-gray-400 p-4 font-semibold text-gray-600 ">
                  {jobData1.description}
                </div>
                <DrawerFooter>
                  <Button
                    className={`bg-purple-500/30 rounded-md px-8 py-2 font-semibold border border-black`}
                  >
                    Apply
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className={`rounded-md px-8 py-2 font-semibold border border-black`}
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
