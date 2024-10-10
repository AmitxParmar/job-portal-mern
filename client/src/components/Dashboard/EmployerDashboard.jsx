import {
  Briefcase,
  ChartLine,
  FileText,
  PlusCircle,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRecruiterDashboard } from "@/services/applicationServices";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import CardSkeleton from "./common/JobCard/CardSkeleton";
import Resume from "./common/Resume";
import { useAuth } from "@/hooks/useAuth";

const EmployerDashboard = () => {
  // Mock data based on the provided schemas
  const { user } = useAuth();
  const { data, isLoading, error, status } = useQuery({
    queryKey: ["recruiter-dashboard"],
    queryFn: getRecruiterDashboard,
    retry: 1,
    cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
    staleTime: 1000 * 60 * 100, // Data is fresh for 2 minutes
  });

  if (isLoading) {
    return (
      <div className="min-w-full w-full px-8 py-4 flex flex-col gap-4">
        <div className="grid grid-cols-7">
          <Skeleton className={"w-56 h-56 bg-black/30 rounded-3xl"} />
          <Skeleton className={"w-56 h-56 bg-black/30 rounded-3xl"} />
          <Skeleton className={"w-56 h-56 bg-black/30 rounded-3xl"} />
          <Skeleton className={"w-56 h-56 bg-black/30 rounded-3xl"} />
        </div>
        <div className="cols-span-4 gap-x-80 grid grid-cols-4">
          <CardSkeleton
            className={"h-80 min-w-[450px] min-h-[600px] max-h-screen"}
          />
          <CardSkeleton
            className={"h-80 min-w-[450px] min-h-[600px] max-h-screen"}
          />
        </div>
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
          <div className="hidden max-h-full h-full w-full">
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
                  <ul className="space-y-4">
                    {recentJobs?.map((job) => (
                      <li
                        key={job._id}
                        className="flex items-center justify-between"
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
                  <ul className="space-y-4">
                    {recentApplications.map((app) => (
                      <li
                        key={app._id}
                        className="flex items-center justify-between"
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
            <Resume user={user} className={"w-full"} />
          </div>
          {/*  <div className="mt-8 flex flex-wrap gap-4">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Post New Job
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" /> View All Candidates
            </Button>
            <Button variant="outline">
              <Briefcase className="mr-2 h-4 w-4" /> Manage Job Postings
            </Button>
          </div> */}
        </main>
      </div>
    );
  }
};

export default EmployerDashboard;
