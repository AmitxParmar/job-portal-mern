import { Suspense, lazy, memo } from "react";

import Container from "@/components/Dashboard/common/Container";
import SettingsSidebar from "./SettingsSidebar";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Filters = lazy(() => import("../../Filters"));

const Sidebars = () => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const isJobSeeker = user?.role === "jobSeeker";
  const isRecruiter = user?.role === "recruiter";
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <Suspense fallback={`loading....`}>
      <Container
        className={`sticky border-none font-inter border-0 ml-4 left-0 bg-card w-56`}
      >
        {isDashboard || isRecruiter === "recruiter" ? (
          <SettingsSidebar />
        ) : isJobSeeker === "jobSeeker" ? (
          <Filters />
        ) : null}
      </Container>
    </Suspense>
  );
};

export default memo(Sidebars);
