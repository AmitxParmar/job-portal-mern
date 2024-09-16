import Filters from "@/components/Dashboard/Filters";
import Container from "@/components/Dashboard/common/Container";
import AdminNav from "./AdminNav";

const DashboardSidebar = () => {
  const role = "employer";
  return <Container>{role === "admin" ? <Filters /> : <AdminNav />}</Container>;
};

export default DashboardSidebar;
