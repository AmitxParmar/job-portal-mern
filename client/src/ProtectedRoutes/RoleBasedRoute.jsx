import PropTypes from "prop-types"; // Import PropTypes
import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles, fallbackPath }) => {
  const userRole = "jobSeeker";

  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  } else {
    return <Navigate to={fallbackPath} replace />;
  }
};

RoleBasedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // Validate allowedRoles as an array of strings
  fallbackPath: PropTypes.string.isRequired, // Validate fallbackPath as a string
};

export default RoleBasedRoute;
