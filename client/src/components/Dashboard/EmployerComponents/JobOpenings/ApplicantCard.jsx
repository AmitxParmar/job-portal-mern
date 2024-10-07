import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { CalendarIcon } from "lucide-react";
import PropTypes from "prop-types";
import moment from "moment";

const ApplicantCard = ({ application }) => {
  const { applicant, status, appliedAt } = application;

  const statusColors = {
    applied: "bg-applied",
    reviewing: "bg-reviewing",
    interviewing: "bg-interview",
    hired: "bg-hired",
    rejected: "bg-rejected",
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage
                src={applicant.profilePic}
                alt={applicant.fullName}
              />
              <AvatarFallback>
                {applicant.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{applicant.fullName}</CardTitle>
              <CardDescription>{applicant.address}</CardDescription>
            </div>
          </div>
          <Badge className={`${statusColors[status]} text-white`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
            <span>{applicant?.yoe}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span>{moment(appliedAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {applicant.skills
            ?.join(", ")
            .split(", ")
            .map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
        </div>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedApplicant(applicant)}
            >
              View Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{selectedApplicant?.name}</DialogTitle>
              <DialogDescription>
                {selectedApplicant?.appliedFor} at {selectedApplicant?.company}
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="profile" className="mt-4">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="coverLetter">Cover Letter</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={selectedApplicant?.avatar}
                        alt={selectedApplicant?.name}
                      />
                      <AvatarFallback>
                        {selectedApplicant?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {selectedApplicant?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedApplicant?.appliedFor}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedApplicant?.location}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">
                        {selectedApplicant?.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm">
                        {selectedApplicant?.phone}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant?.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="resume">
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Resume preview not available. Click the button below to
                    download the resume.
                  </p>
                  <Button>
                    <Download className="mr-2 h-4 w-4" /> Download Resume
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="coverLetter">
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {selectedApplicant?.coverLetter}
                </p>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog> */}
      </CardContent>
    </Card>
  );
};

ApplicantCard.propTypes = {
  application: PropTypes.shape({
    appliedAt: PropTypes.string,
    status: PropTypes.string,
    applicant: PropTypes.shape({
      profilePic: PropTypes.string, // Added profilePic to PropTypes
      fullName: PropTypes.string,
      yoe: PropTypes.string,
      bio: PropTypes.string,
      contact: PropTypes.string,
      contactEmail: PropTypes.string,
      designation: PropTypes.string,
      address: PropTypes.string,
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
  }),
};

export default ApplicantCard;
