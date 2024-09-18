import PropTypes from "prop-types";
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

const JobCard = ({
  job: {
    employer,
    title,
    description,
    location,
    salary,
    tags,
    frequency,
    skillsRequired,
    applicants,
    status,
    postedAt,
  },
}) => {
  return (
    <>
      <div className="p-2 mx-auto border-l-8 border border-black max-h-[360px] hover:border hover:border-r-8 hover:shadow-xl transition-all rounded-3xl w-[90%] sm:w-64 md:w-72 lg:w-80 min-h-[350px] justify-around space-y-2 bg-muted flex flex-col m-2">
        <div className="bg-cyan-200  border h-4/5 min-h-[80%] max-h-[80%] rounded-2xl p-4 w-full flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <p className="text-sm rounded-full bg-white text-center align-center py-2 px-3 font-bold text-black">
              {postedAt}
            </p>
            <Button
              size="icon"
              className="bg-white rounded-full p-3 hover:invert"
            >
              <Bookmark size={20} fill="black" />
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">{employer}</p>
            <h3 className="text-3xl font-medium font-grotesk">{title}</h3>
          </div>

          <div className="flex py-1 h-1/2 justify-stretch overflow-hidden flex-row flex-wrap gap-1 font-grotesk font-bold">
            {skillsRequired ? (
              skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="px-3 font-semibold bg-background py-2 border border-black h-fit shadow-sm rounded-full text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap"
                >
                  {skill}
                </span>
              ))
            ) : (
              <>Loading</>
            )}
          </div>
        </div>
        <div className="px-4 items-center flex flex-row justify-between">
          <div className="grid grid-rows-2 w-full truncate">
            <div className=" font-bold text-gray-700">
              ${salary.min}-{salary.max}/{frequency}
            </div>
            <div className="text-gray-500">
              {location.city},{location.state},{location.country}
            </div>
          </div>

          <div className="max-h-fit max-w-fit font-semibold px-4 transition-all duration-300 bg-black text-white p-2 rounded-full hover:bg-cyan-200 hover:text-black">
            <Drawer className="min-h-screen max-w-screen">
              <DrawerTrigger asChild>
                <Button variant="outline">Details</Button>
              </DrawerTrigger>
              <DrawerContent className="h-[calc(100vh-10vh)] px-28 max-w-screen bg-muted">
                <DrawerHeader className={`w-fit`}>
                  <DrawerTitle className="text-4xl">{title}</DrawerTitle>
                  <DrawerDescription className="text-xl">
                    {employer}
                  </DrawerDescription>
                  <div className="grid grid-flow-col my-2 space-x-2 w-max overflow-auto">
                    {skillsRequired.map((skill) => (
                      <span
                        key={skill}
                        className="w-fit gap-2 rounded-full px-2 py-1 border border-gray-500 scrollbar-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </DrawerHeader>
                <div className="overflow-y-auto leading-9 scrollbar-thin scrollbar-thumb-rounded-full mx-auto text-center scrollbar-thumb-gray-400  p-4 font-semibold">
                  {description}
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

JobCard.propTypes = {
  job: PropTypes.shape({
    employer: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    salary: PropTypes.shape({
      min: PropTypes.string.isRequired,
      max: PropTypes.string.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    frequency: PropTypes.string.isRequired,
    skillsRequired: PropTypes.arrayOf(PropTypes.string),
    applicants: PropTypes.number,
    status: PropTypes.string,
    postedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default JobCard;
