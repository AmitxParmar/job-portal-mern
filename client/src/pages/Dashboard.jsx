import { Outlet, useParams } from "react-router-dom";

import Loader from "@/components/Dashboard/common/Loader";
import PropTypes from "prop-types";
import { Suspense } from "react";

const Dashboard = ({ role }) => {
  return (
    <Suspense
      fallback={
        <div className="absolute h-screen w-screen blur flex items-center">
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
