import Container from "@/components/Dashboard/common/Container";
import AdminNav from "./AdminNav";
import { useLocation } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar";
import Filters from "../../Filters";

const Sidebars = ({ userRole }) => {
  const { pathname } = useLocation();
  console.log("sidebar logged!!!!!!!!!");
  return (
    <>
      {pathname.startsWith("/settings") ? (
        <SettingsSidebar />
      ) : (
        <Container className={`sticky left-0 bg-card`}>
          {userRole === "jobSeeker" ? (
            <Filters />
          ) : (
            userRole === "employer" && <AdminNav />
          )}
        </Container>
      )}
    </>
  );
};

export default Sidebars;
