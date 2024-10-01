import { Bookmark, BookmarkIcon, Clock, MapPin } from "lucide-react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { memo } from "react";
import moment from "moment";
import { toggleBookmarkJob } from "@/services/userServices";

const JobCard = ({
  job: {
    _id,
    employer,
    title,
    description,
    location,
    salaryRange,
    frequency,
    skillsRequired,

    postedAt,
    combinedField,
  },
  isBookmarked,
}) => {
  const queryClient = useQueryClient();
  const status = "close";
  const formatSalary = (value) => {
    if (value >= 10000000) {
      return `${Math.floor(value / 10000000)}Cr`;
    } else if (value >= 100000) {
      return `${Math.floor(value / 100000)}L`;
    } else {
      return `${value.toLocaleString("en-IN")}₹`;
    }
  };

  const { mutate } = useMutation({
    mutationFn: (jobId) => toggleBookmarkJob(jobId),
  });
  const handleBookmark = (jobId) =>
    mutate(jobId, {
      onSuccess: (s) => {
        console.log(s);
        queryClient.invalidateQueries(["user"]);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  return (
    <>
      <div className="p-2 mx-auto font-grotesk border-l-8 border border-input bg-white max-h-[360px] hover:border hover:border-r-8 hover:shadow-lg transition-all rounded-3xl w-[90%] sm:w-64 md:w-72 lg:w-80 min-h-[350px] justify-around group space-y-2 bg-muted flex flex-col m-2">
        <div
          className={`${
            status === "open" ? "bg-cyan-200" : "bg-slate-500"
          } border h-4/5 min-h-[80%] max-h-[80%] rounded-2xl p-4 w-full flex flex-col relative justify-between"`}
        >
          <div
            className={`${
              status === "open" ? "hidden " : "block "
            } absolute -rotate-45 inset-y-1/3 font-grotesk group-hover:hidden text-7xl bg-black transition-all rounded-xl px-4 py-2 text-red-600 font-semibold`}
          >
            Closed!!
          </div>
          <div className="flex flex-row justify-between items-center">
            <span className="text-sm rounded-full bg-white/70 border-border shadow-xl text-center align-center w-fit flex flex-row items-center py-2 px-3 font-bold text-black">
              <span>
                <Clock className="w-4 h-4 align-baseline mr-2" />
              </span>
              <span>{moment(postedAt).fromNow()}</span>
            </span>
            <Button
              onClick={() => handleBookmark(_id)}
              size="icon"
              className="bg-white text-black rounded-full p-1.5 "
            >
              <Bookmark fill={isBookmarked ? "black" : "white"} />
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-gray-500">{employer._id}</p>
            <h3 className="text-3xl font-medium font-grotesk tracking-normal leading-none">
              {title}
            </h3>
          </div>

          <div className="flex h-1/2 justify-stretch overflow-hidden flex-row flex-wrap gap-1 py-4 font-grotesk font-bold">
            {skillsRequired &&
              Object.values(combinedField)?.map((skill) => (
                <Badge
                  key={skill}
                  className="px-3 !font-grotesk font-bold  py-2 border border-black h-fit shadow-sm rounded-full tracking-wider leading-none text-xs max-w-[40%] truncate overflow-hidden whitespace-nowrap"
                >
                  {skill}
                </Badge>
              ))}
          </div>
        </div>
        <div className="px-4 items-center flex flex-row justify-between">
          <div className="grid grid-flow-row leading-none truncate">
            <div className="font-bold h-fit text-gray-700">
              {formatSalary(salaryRange?.min)} -{" "}
              {formatSalary(salaryRange?.max)} / {frequency}
            </div>
            <div className="text-gray-400 h-fit font-bold  text-sm">
              {location?.city}, {location?.state}
            </div>
          </div>

          <div className="">
            <Drawer className="min-h-screen max-w-screen">
              <DrawerTrigger asChild>
                <Button
                  className="max-h-fit hover:invert border-primary max-w-fit font-semibold rounded-full "
                  variant="outline"
                >
                  Details
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[calc(100vh-10vh)] px-4 lg:px-28 max-w-screen bg-muted">
                <DrawerHeader className={`w-full px-6 lg:px-20`}>
                  <DrawerHeader className="grid grid-cols-2 w-full">
                    <div className="grid grid-flow-row-dense justify-start">
                      <DrawerTitle className="text-4xl">{title}</DrawerTitle>
                      <div className="flex">
                        <div className="mr-4 p-1">
                          <img
                            src="/google.png"
                            alt="Company Logo"
                            className="h-20 w-20"
                          />
                        </div>
                        <div className="grid grid-row-2 items-center">
                          <div className="flex text-lg items-center">
                            <span className="text-blue-600 font-bold">
                              {"Google"}
                            </span>
                            {"  -  "}
                            <span>
                              <MapPin />{" "}
                            </span>
                            <span>
                              {location?.city},{location?.state}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {skillsRequired?.map((skill) => (
                              <Badge
                                key={skill}
                                className=" rounded-full text-xs"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid justify-end gap-1 lg:gap-5 grid-flow-col-dense">
                      <Button className="w-fit px-6 text-lg font-grotesk fonr-semibold h-12">
                        Apply Now
                      </Button>
                      <Button size="icon" className="h-12 w-12">
                        <BookmarkIcon />
                      </Button>
                    </div>
                  </DrawerHeader>
                </DrawerHeader>
                <DrawerDescription
                  className="overflow-y-auto text-md text-black scrollbar-thin scrollbar-thumb-rounded-full w-full mx-auto scrollbar-thumb-gray-400 p-4 bullet_list"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
                <DrawerFooter>
                  <Button
                    className={`rounded-md px-8 py-2 font-semibold border border-black`}
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
  isBookmarked: PropTypes.bool.isRequired,
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    employer: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
    }).isRequired,
    salaryRange: PropTypes.shape({
      min: PropTypes.string.isRequired,
      max: PropTypes.string.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    frequency: PropTypes.string.isRequired,
    skillsRequired: PropTypes.arrayOf(PropTypes.string),

    status: PropTypes.string,
    postedAt: PropTypes.string.isRequired,
    combinedField: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default memo(JobCard);
