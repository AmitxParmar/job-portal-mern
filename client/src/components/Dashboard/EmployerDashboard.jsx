import { Briefcase, ChartLine, FileText, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { getRecruiterDashboard } from "@/services/applicationServices";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

import Resume from "./common/Resume";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const EmployerDashboard = () => {
  const { user } = useAuth();
  const { data, error, status } = useQuery({
    queryKey: ["recruiter-dashboard"],
    queryFn: getRecruiterDashboard,
    retry: 1,
    cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
    staleTime: 1000 * 60 * 100, // Data is fresh for 2 minutes
  });

  if (status === "pending") {
    return (
      <div className=" bg-gray-100 bg-blend-saturation overflow-hidden max-h-full h-[calc(100vh-8vh)]">
        <main className="mx-auto h-full px-4 flex flex-row justify-between sm:px-6 lg:px-8 py-8 gap-8">
          <div className="max-h-full h-full w-full">
            <div className="grid  grid-cols-1 gap-6 font-grotesk md:grid-cols-2 lg:grid-cols-4">
              <Skeleton className={"h-56 rounded-3xl bg-black/20"} />
              <Skeleton className={"h-56 rounded-3xl bg-black/20"} />
              <Skeleton className={"h-56 rounded-3xl bg-black/20"} />
              <Skeleton className={"h-56 rounded-3xl bg-black/20"} />
            </div>

            <div className="mt-8 max-h-[600px] h-full grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Skeleton className="bg-black/20 rounded-3xl h-[550px] " />
              <Skeleton className="bg-black/20 rounded-3xl h-[550px] " />
            </div>
          </div>
          <div className="row-span-2">
            <Skeleton className="h-full w-80 rounded-3xl bg-black/20" />
          </div>
        </main>
      </div>
    );
  } else if (status === "success") {
    const {
      activeJobsCount,
      totalApplications,
      totalInterviews,
      newApplications,
      recentJobs,
      recentApplications,
    } = data;
    console.log(data);
    return (
      <div className=" bg-gray-100 bg-blend-saturation overflow-hidden max-h-full h-[calc(100vh-8vh)]">
        <main className="mx-auto h-full px-4 flex flex-row justify-between sm:px-6 lg:px-8 py-8 gap-8">
          <div className="max-h-full h-full w-full">
            <div className="grid h-fit grid-cols-1 gap-6 font-grotesk md:grid-cols-2 lg:grid-cols-4">
              <Card className="shadow-3xl bg-orange-500 h-40 font-bold rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <ChartLine className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                  <Briefcase className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-md font-medium">
                    Active Jobs
                  </CardTitle>
                  <div className="text-3xl font-bold">{activeJobsCount}</div>
                </CardContent>
              </Card>
              <Card className="shadow-3xl bg-purple-600/20 h-40 font-bold rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <ChartLine className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                  <FileText className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-md font-medium">
                    Total Applications
                  </CardTitle>
                  <div className="text-2xl font-bold">{totalApplications}</div>
                </CardContent>
              </Card>
              <Card className="shadow-3xl bg-foreground h-40 text-secondary font-bold rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <ChartLine className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                  <Users className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-md font-medium">
                    Interviews
                  </CardTitle>
                  <div className="text-2xl font-bold">{totalInterviews}</div>
                </CardContent>
              </Card>
              <Card className="shadow-3xl bg-cyan-400 h-40 font-bold rounded-3xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <ChartLine className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                  <FileText className="h-10 w-10 overflow-visible bg-background/20 p-2 rounded-full" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-md font-medium">
                    New Applications
                  </CardTitle>
                  <div className="text-2xl font-bold">{newApplications}</div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 max-h-[600px] h-full grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle>Recent Job Postings</CardTitle>
                  <CardDescription>
                    Overview of your latest job listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-flow-row-dense gap-2">
                    {recentJobs?.map((job) => (
                      <li
                        key={job._id}
                        className="flex bg-muted rounded-3xl py-4 px-6 border items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {job.company.name} - {job.location.city},{" "}
                            {job.location.country}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {job.applicants.length} applicant(s)
                          </p>
                        </div>
                        <Badge variant="default">Open</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>
                    Latest candidate applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid grid-flow-row-dense gap-2">
                    {recentApplications.map((app) => (
                      <li
                        key={app._id}
                        className="flex bg-muted rounded-3xl py-4 px-6 border items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">
                            {app.applicant.fullName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {app.job.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Applied:{" "}
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            app.status === "applied"
                              ? "default"
                              : app.status === "reviewing"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {app.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="row-span-2">
            <Resume user={user} className={"w-full max-w-96"} />
          </div>
        </main>
      </div>
    );
  } else if (status === "error") {
    toast.error("Error:", {
      description: error.message,
    });
  }
};

export default EmployerDashboard;
