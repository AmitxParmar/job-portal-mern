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

  if (isLoading)
    return (
      <div className="max-h-[calc(100vh-8vh)] min-h-[calc(100vh-8vh)]">
        <Loader />
      </div>
    );
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
      className={`max-w-screen-2xl bg-background px-8 capitalize w-screen mx-6 py-12 `}
    >
      <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
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
          <div className="text-center py-12">
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
              <TableRow className="bg-muted text-foreground text-lg font-semibold">
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Apply Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-muted/50 border">
              {appliedJobs?.map((application) => {
                const job = application?.job;
                return (
                  <TableRow key={application._id} className="border ">
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
