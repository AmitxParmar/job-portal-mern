import { Suspense, lazy, memo } from "react";

import Container from "@/components/Dashboard/common/Container";
import SettingsSidebar from "./SettingsSidebar";
import { useLocation } from "react-router-dom";

const Filters = lazy(() => import("../../Filters"));

const Sidebars = () => {
  const { pathname } = useLocation();

  return (
    <Suspense fallback={`loading....`}>
      <Container
        className={`sticky border-none font-inter border-0 ml-4 left-0 bg-card w-56`}
      >
        {pathname === "/dashboard/jobSeeker" ? (
          <Filters />
        ) : pathname === "/dashboard/recruiter" ||
          pathname.startsWith("/dashboard/settings") ? (
          <SettingsSidebar />
        ) : null}
      </Container>
    </Suspense>
  );
};

export default memo(Sidebars);
