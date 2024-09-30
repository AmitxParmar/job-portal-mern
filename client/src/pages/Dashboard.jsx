import { Suspense, lazy } from "react";

import PropTypes from "prop-types";

const EmployerDashboard = lazy(() =>
  import("@/components/Dashboard/EmployerDashboard")
);
const JobListings = lazy(() => import("@/components/Dashboard/JobListings"));

const Dashboard = ({ role }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {role === "jobSeeker" ? (
        <JobListings />
      ) : (
        role === "employer" && <EmployerDashboard />
      )}
    </Suspense>
  );
};

Dashboard.propTypes = {
  role: PropTypes.oneOf(["jobSeeker", "employer"]).isRequired,
};

export default Dashboard;
