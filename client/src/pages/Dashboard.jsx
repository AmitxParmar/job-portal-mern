import JobListings from "@/components/Dashboard/JobListings";
import EmployerDashboard from "@/components/Dashboard/EmployerDashboard";
import PropTypes from "prop-types";

const Dashboard = ({ userRole }) => {
  return (
    <>
      <div className={``}>
        {userRole === "jobSeeker" ? (
          <JobListings />
        ) : (
          userRole === "employer" && <EmployerDashboard />
        )}
      </div>
    </>
  );
};

Dashboard.propTypes = {
  userRole: PropTypes.oneOf(["jobSeeker", "employer"]).isRequired,
};

export default Dashboard;
