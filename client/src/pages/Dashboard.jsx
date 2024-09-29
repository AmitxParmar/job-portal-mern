import JobListings from "@/components/Dashboard/JobListings";
import EmployerDashboard from "@/components/Dashboard/EmployerDashboard";
import PropTypes from "prop-types";

const Dashboard = ({ role }) => {
  return (
    <>
      <div className={``}>
        {role === "jobSeeker" ? (
          <JobListings />
        ) : (
          role === "employer" && <EmployerDashboard />
        )}
      </div>
    </>
  );
};

Dashboard.propTypes = {
  role: PropTypes.oneOf(["jobSeeker", "employer"]).isRequired,
};

export default Dashboard;
