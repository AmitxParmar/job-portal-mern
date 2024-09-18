import Filters from "@/components/Dashboard/Filters";
import Container from "@/components/Dashboard/common/Container";
import AdminNav from "./AdminNav";

const DashboardSidebar = () => {
  const role = "jobSeeker";
  return (
    <Container className={`sticky left-0`}>
      {role === "jobSeeker" ? <Filters /> : <AdminNav />}
    </Container>
  );
};

export default DashboardSidebar;
