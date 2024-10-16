import { Suspense, lazy, memo } from "react";
import Container from "@/components/Dashboard/common/Container";
import SettingsSidebar from "./SettingsSidebar";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Filters = lazy(() => import("../../Filters"));

const Sidebars = () => {
  const { pathname } = useLocation();

  const { user } = useAuth();

  const renderSidebar = () => {
    if (user?.role === "jobSeeker" && pathname === "/dashboard/jobSeeker") {
      return <Filters />;
    } else if (
      pathname.startsWith("/dashboard/recruiter") ||
      pathname.startsWith("/dashboard/settings")
    ) {
      return <SettingsSidebar />;
    }
    return null;
  };

  return (
    <Suspense fallback={`Loading....`}>
      <Container
        className={`absolute my-1 mx-1 bottom-0 lg:sticky border-none font-inter border-0 lg:ml-4 inset-x-0 bg-card w-screen  overflow-auto p-0.5 px-0 lg:p-4 lg:w-56`}
      >
        {renderSidebar()}
      </Container>
    </Suspense>
  );
};

export default memo(Sidebars);
