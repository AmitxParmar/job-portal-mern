import { Outlet, useLocation } from "react-router-dom";
import Filters from "@/components/Dashboard/Filters";
import JobCard from "@/components/Dashboard/JobCard";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { profileMenu } from "@/constants";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
/* import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
 */
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
    "Data Scientist",
    "UX Designer",
    "Backend Developer",
    "UX Designer",
    "Backend Developer",
    "Software Engineer",
    "Product Manager",
  ];

  return (
    <DashboardLayout>
      {pathname === "/dashboard" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2  scrollbar-none scroll-smooth overflow-hidden lg:grid-cols-3 xl:grid-cols-5 gap-1">
            {jobs.map((item) => (
              <JobCard key={item} name={item} />
            ))}
          </div>
        </>
      ) : (
        <Sidebar>
          <Outlet /> This will render nested profile routes
        </Sidebar>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
