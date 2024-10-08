import { Outlet, useParams } from "react-router-dom";

import Loader from "@/components/Dashboard/common/Loader";
import PropTypes from "prop-types";
import { Suspense } from "react";

const Dashboard = ({ role }) => {
  const { role: routeRole } = useParams();

  if (role !== routeRole) {
    console.warn(
      `User with role ${role} attempted to access ${routeRole} dashboard`
    );
    // You might want to redirect to an error page or show an access denied message here
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-full min-w-full">
          <Loader />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

Dashboard.propTypes = {
  role: PropTypes.oneOf(["jobSeeker", "recruiter"]).isRequired,
};

export default Dashboard;
