import { Outlet, useLocation } from "react-router-dom";
import JobCard from "@/components/Dashboard/JobCard";
import Container from "@/components/Dashboard/Container";
import DashboardSidebar from "@/components/Dashboard/Sidebars/DashboardSidebar";
import ProfileSidebar from "@/components/Dashboard/Sidebars/ProfileSidebar";

const Dashboard = () => {
  const { pathname } = useLocation();

  const jobs = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
  ];

  return (
    <>
      {pathname === "/dashboard" ? (
        <div className="flex flex-row h-[calc(100vh-18vh)]">
          <DashboardSidebar />
          <div className="grid grid-cols-1 md:grid-cols-2 scroll-smooth py-2 scrollbar-none overflow-y-scroll lg:grid-cols-3 xl:grid-cols-5 gap-3 px-4">
            {jobs.map((item) => (
              <JobCard key={item + Math.random() * 10000} name={item} />
            ))}
          </div>
        </div>
      ) : pathname.startsWith("/dashboard/") ? ( // Updated to use ternary operator for clarity
        <div className="flex flex-row h-full max-h-[calc(100vh-11vh)]">
          <ProfileSidebar />
          <Container className={`ml-3 max-h-full w-full`}>
            <Outlet />
          </Container>
          <Container className={`ml-3 mr-6 w-56 max-h-full`}></Container>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
