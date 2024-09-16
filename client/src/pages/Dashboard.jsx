import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/Dashboard/Sidebars/DashboardSidebar";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-row justify-around h-[calc(100vh-18vh)]">
        <DashboardSidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
