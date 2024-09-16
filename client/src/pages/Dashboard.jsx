import { Outlet, useLocation } from "react-router-dom";
import JobCard from "@/components/Dashboard/JobListings/JobCard";
import Container from "@/components/Dashboard/common/Container";
import DashboardSidebar from "@/components/Dashboard/Sidebars/DashboardSidebar";
import ProfileSidebar from "@/components/Dashboard/Sidebars/ProfileSidebar";
import Settings from "@/components/Dashboard/Settings";

const Dashboard = () => {
  const { pathname } = useLocation();

  return (
    <>
      {/*  {pathname === "/dashboard" ? ( */}
      <div className="flex flex-row justify-around h-[calc(100vh-18vh)]">
        <DashboardSidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
