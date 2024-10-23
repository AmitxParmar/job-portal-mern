import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Role Based Route Component
const RoleBasedRoute = ({ allowedRole, children }) => {
  const { user } = useAuth();

  if (user?.role !== allowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

RoleBasedRoute.propTypes = {
  allowedRole: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default RoleBasedRoute;
