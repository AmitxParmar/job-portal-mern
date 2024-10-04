import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "../common/Container";
import { Input } from "@/components/ui/input";
import Loader from "../common/Loader";
import { Search } from "lucide-react";
import { getUserApplications } from "@/services/applicationServices";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

/* const applications = [
  {
    id: 1,
    logo: "/placeholder.svg?height=40&width=40",
    company: "TechCorp",
    applyFor: "Software Engineer",
    jobType: "Full-time",
    status: "Applied",
    apply: "2023-10-01",
    description:
      "We are seeking a skilled Software Engineer to join our team...",
  },
  {
    id: 2,
    logo: "/placeholder.svg?height=40&width=40",
    company: "DesignStudio",
    applyFor: "Product Manager",
    jobType: "Full-time",
    status: "Interviewing",
    apply: "2023-09-15",
    description:
      "DesignStudio is looking for an experienced Product Manager...",
  },
  {
    id: 3,
    logo: "/placeholder.svg?height=40&width=40",
    company: "DataTech",
    applyFor: "Data Scientist",
    jobType: "Contract",
    status: "Rejected",
    apply: "2023-08-20",
    description:
      "Join our data science team to work on cutting-edge projects...",
  },
  {
    id: 4,
    logo: "/placeholder.svg?height=40&width=40",
    company: "UXPro",
    applyFor: "UX Designer",
    jobType: "Part-time",
    status: "Reviewing",
    apply: "2023-10-05",
    description:
      "We're looking for a creative UX Designer to help shape our products...",
  },
  {
    id: 5,
    logo: "/placeholder.svg?height=40&width=40",
    company: "CloudOps",
    applyFor: "DevOps Engineer",
    jobType: "Full-time",
    status: "Applied",
    apply: "2023-09-30",
    description:
      "Join our DevOps team to build and maintain our cloud infrastructure...",
  },
  {
    id: 6,
    logo: "/placeholder.svg?height=40&width=40",
    company: "WebFront",
    applyFor: "Frontend Developer",
    jobType: "Internship",
    status: "Hired",
    apply: "2023-10-10",
    description:
      "Exciting opportunity for a Frontend Developer intern to work on real projects...",
  },
  {
    id: 7,
    logo: "/placeholder.svg?height=40&width=40",
    company: "BackendTech",
    applyFor: "Backend Developer",
    jobType: "Full-time",
    status: "Interviewing",
    apply: "2023-09-25",
    description:
      "We're hiring a Backend Developer to work on our scalable systems...",
  },
]; */

const statusClasses = {
  applied: "bg-applied",
  reviewing: "bg-reviewing",
  interviewing: "bg-interview",
  hired: "bg-hired",
  rejected: "bg-rejected",
};

export default function AppliedJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);

  const {
    data: appliedJobs,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["applied-jobs"],
    queryFn: getUserApplications,
    enabled: true,
  });

  isError && toast(error.message);
  console.log("applied jobs", appliedJobs);

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <Container
        className={`max-w-screen-2xl bg-background px-8 font-semibold w-screen mx-6 py-12 `}
      >
        <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>
        <div className="text-center py-12">
          <p className="text-xl font-semibold text-gray-600">{error.message}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container
      className={`max-w-screen-2xl bg-background px-8 font-semibold capitalize w-screen mx-6 py-12 `}
    >
      <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search jobs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="reviewing">Reviewing</SelectItem>
            <SelectItem value="interviewing">Interviewing</SelectItem>
            <SelectItem value="hired">Hired</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        {appliedJobs.length === 0 ? (
          <div className="text-center  py-12">
            <p className="text-xl font-semibold text-gray-600">
              No applications found
            </p>
            <p className="text-sm w-full text-gray-500 mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <TableCaption>A list of your recently applied jobs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Apply Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appliedJobs?.map((application) => {
                const job = application?.job;
                return (
                  <TableRow key={application._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={job?.company?.logo}
                          alt={job?.company?.name}
                          className="w-10 h-10 overflow-hidden rounded-full"
                        />
                        <span>{job?.company?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>{job?.jobType}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          statusClasses[application?.status.toLowerCase()]
                        } text-white`}
                      >
                        {application?.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(application?.appliedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedJob(application)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>{job?.title}</DialogTitle>
                            <DialogDescription>
                              {job?.company?.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">
                              Job Description
                            </h4>
                            <p className="text-sm text-gray-500">
                              {job?.description}
                            </p>
                          </div>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">
                              Application Details
                            </h4>
                            <p className="text-sm text-gray-500">
                              Status: {application?.status}
                            </p>
                            <p className="text-sm text-gray-500">
                              Applied on:{" "}
                              {new Date(
                                application?.appliedAt
                              ).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              Job Type: {job?.jobType}
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </>
        )}
      </Table>
    </Container>
  );
}
