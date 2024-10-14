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
        className={`sticky border-none font-inter border-0 ml-4 left-0 bg-card w-56`}
      >
        {renderSidebar()}
      </Container>
    </Suspense>
  );
};

export default memo(Sidebars);
