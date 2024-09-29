import PropTypes from "prop-types"; // Import PropTypes
import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles, fallbackPath }) => {
  const role = "employer";

  if (allowedRoles.includes(role)) {
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
