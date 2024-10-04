import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import BookmarkButton from "./BookmarkButton";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import PropTypes from "prop-types";
import { applyForJob } from "@/services/applicationServices";
import moment from "moment";
import { toast } from "sonner";

const JobDetails = ({ job, isBookmarked }) => {
  const queryClient = useQueryClient();
  const { _id, title, description, location, postedAt, combinedField } = job;

  const { mutate: apply } = useMutation({
    mutationFn: (jobId) => applyForJob(jobId),
  });

  // handle job apply
  const handleApplyForJob = () => {
    console.log("handleJobApply");
    apply(_id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["jobs"]);
        toast.success("Success!", {
          description: "You've applied for this job!",
          style: {
            border: "blue",
            background: "black",
          },
        });
      },
      onError: (error) => {
        queryClient.invalidateQueries(["jobs"]);
        toast.error("Error!", {
          description: error.message,
        });
      },
    }); // get the user id from backend itself
  };

  return (
    <Drawer className="min-h-screen p-0 m-0 max-w-screen">
      <DrawerTrigger asChild>
        <Button
          className="max-h-fit hover:invert border-primary max-w-fit font-semibold rounded-full"
          variant="outline"
        >
          Details
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100vh-10vh)] px-4 lg:px-28 max-w-screen bg-muted">
        <DrawerHeader
          className={`w-full  bg-transparent font-grotesk p-0 px-1 my-2 lg:px-20`}
        >
          <div className="grid lg:grid-cols-2 w-full">
            <div className="grid order-2 lg:order-1 grid-flow-row-dense justify-start">
              <DrawerTitle className="text-2xl mt-4 lg:text-4xl">
                {title}
              </DrawerTitle>
              <div className="flex  lg:flex-row items-center">
                <div className="mr-4 p-1">
                  <img
                    src="/google.png"
                    alt="Company Logo"
                    className="lg:h-20 lg:w-20"
                  />
                  <div className="text-blue-600 text-center font-bold">
                    {"Google"}
                  </div>
                </div>
                <div className="lg:grid space-y-1 lg:grid-row-2 lg:items-center w-fit">
                  <Badge
                    className={`text-xs lg:text-sm capitalize rounded-full px-2 py-1 bg-white/70 border shadow-xl text-center align-center w-fit flex flex-row items-center lg:py-2 lg:px-3 font-bold text-blacks`}
                  >
                    <span>
                      <MapPin className="w-4 h-4 mr-2" />
                    </span>
                    <span>
                      {location?.city},{location?.state}
                    </span>
                  </Badge>

                  <div className="flex capitalize flex-wrap gap-1 w-fit">
                    <Badge className="text-xs rounded-full px-2 py-1 bg-white/70 border shadow-xl text-center align-center w-fit flex flex-row  items-center lg:py-2 lg:px-3 font-bold text-black">
                      <span>
                        <Clock className="w-4 h-4 align-baseline mr-2" />
                      </span>
                      <span>{moment(postedAt).fromNow()}</span>
                    </Badge>
                    {Object.values(combinedField)?.map((skill) => (
                      <Badge key={skill} className="rounded-full text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid mt-4 order-1 lg:order-2 justify-end gap-1 lg:gap-5 grid-flow-col-dense">
              <Button
                onClick={() => handleApplyForJob()}
                className="w-fit lg:px-6 text-sm lg:text-lg font-grotesk fonr-semibold lg:h-12"
              >
                Apply Now
              </Button>
              <div className="rounded-sm border h-fit bg-background">
                <BookmarkButton jobId={_id} isBookmarked={isBookmarked} />
              </div>
            </div>
          </div>
        </DrawerHeader>
        <DrawerDescription
          className="overflow-y-auto text-md text-black scrollbar-thin scrollbar-thumb-rounded-full w-full font-medium font-grotesk mx-auto scrollbar-thumb-gray-400 bullet_list"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/*  <DrawerFooter>
          <Button
            onClick={() => handleApplyForJob(_id)}
            className={`rounded-md px-8 py-2 font-semibold border border-black`}
          >
            (Apply)
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className={`rounded-md px-8 py-2 font-semibold border border-black`}
            >
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

JobDetails.propTypes = {
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
    applicants: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    frequency: PropTypes.string.isRequired,
    skillsRequired: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    postedAt: PropTypes.string.isRequired,
    combinedField: PropTypes.shape({}).isRequired,
  }).isRequired,
};
export default JobDetails;
