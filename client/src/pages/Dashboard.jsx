import EmployerDashboard from "@/components/Dashboard/EmployerDashboard";
import JobListings from "@/components/Dashboard/JobListings";
import PropTypes from "prop-types";

const Dashboard = ({ role }) => {
  return (
    <>
      {role === "jobSeeker" ? (
        <JobListings />
      ) : (
        role === "employer" && <EmployerDashboard />
      )}
    </>
  );
};

Dashboard.propTypes = {
  role: PropTypes.oneOf(["jobSeeker", "employer"]).isRequired,
};

export default Dashboard;
