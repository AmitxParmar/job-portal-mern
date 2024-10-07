import { Suspense, lazy } from "react";

import Container from "@/components/Dashboard/common/Container";
import PropTypes from "prop-types";
import SettingsSidebar from "./SettingsSidebar";
import { useLocation } from "react-router-dom";

const Filters = lazy(() => import("../../Filters"));

const Sidebars = ({ role }) => {
  const { pathname } = useLocation();

  return (
    <Suspense fallback={`loading:...`}>
      <Container
        className={`sticky border-none border-0 ml-4 left-0 bg-card w-56`}
      >
        {pathname.startsWith("/settings") || role === "recruiter" ? (
          <SettingsSidebar role={role} />
        ) : role === "jobSeeker" ? (
          <Filters />
        ) : null}
      </Container>
    </Suspense>
  );
};

Sidebars.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Sidebars;
