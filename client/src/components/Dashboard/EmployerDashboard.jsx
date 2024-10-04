/* import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; */

import {
  Bell,
  Briefcase,
  FileText,
  LogOut,
  PlusCircle,
  Search,
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
import React from "react";
import Resume from "./common/Resume";

const EmployerDashboard = () => {
  /*   const {
    data: jobs,

    isLoading,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => fetchJobs(), // Pass a function to fetchJobs
  }); */
  // Mock data based on the provided schemas
  const recruiter = {
    fullName: "Jane Smith",
    email: "jane.smith@techrecruit.com",
    company: {
      name: "TechRecruit Inc.",
      logo: "/placeholder.svg?height=40&width=40",
    },
  };

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: { city: "San Francisco", country: "USA" },
      applicants: [
        { id: 1, fullName: "John Doe", status: "applied" },
        { id: 2, fullName: "Alice Johnson", status: "reviewing" },
      ],
      status: "open",
      postedAt: new Date("2023-05-01"),
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignStudio",
      location: { city: "New York", country: "USA" },
      applicants: [{ id: 3, fullName: "Bob Williams", status: "interview" }],
      status: "open",
      postedAt: new Date("2023-05-05"),
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: { city: "London", country: "UK" },
      applicants: [],
      status: "closed",
      postedAt: new Date("2023-04-15"),
    },
  ];
  const recentApplications = [
    {
      id: 1,
      applicant: { fullName: "John Doe" },
      job: { title: "Senior Frontend Developer" },
      status: "applied",
      appliedAt: new Date("2023-05-10"),
    },
    {
      id: 2,
      applicant: { fullName: "Alice Johnson" },
      job: { title: "UX Designer" },
      status: "reviewing",
      appliedAt: new Date("2023-05-08"),
    },
    {
      id: 3,
      applicant: { fullName: "Bob Williams" },
      job: { title: "DevOps Engineer" },
      status: "interview",
      appliedAt: new Date("2023-05-06"),
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jobs.filter((job) => job.status === "open").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Applications
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jobs.reduce((sum, job) => sum + job.applicants.length, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Interviews Scheduled
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  recentApplications.filter((app) => app.status === "interview")
                    .length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New Applications
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  recentApplications.filter((app) => app.status === "applied")
                    .length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Postings</CardTitle>
              <CardDescription>
                Overview of your latest job listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {jobs.map((job) => (
                  <li
                    key={job.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {job.company} - {job.location.city},{" "}
                        {job.location.country}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.applicants.length} applicant(s)
                      </p>
                    </div>
                    <Badge
                      variant={job.status === "open" ? "default" : "secondary"}
                    >
                      {job.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest candidate applications</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentApplications.map((app) => (
                  <li
                    key={app.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{app.applicant.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        {app.job.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Applied: {app.appliedAt.toLocaleDateString()}
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

        <div className="mt-8 flex flex-wrap gap-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Post New Job
          </Button>
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" /> View All Candidates
          </Button>
          <Button variant="outline">
            <Briefcase className="mr-2 h-4 w-4" /> Manage Job Postings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
