import PropTypes from "prop-types";
import Container from "@/components/Dashboard/common/Container";
import { useLocation } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar";
import Filters from "../../Filters";

const Sidebars = ({ userRole }) => {
  const { pathname } = useLocation();

  return (
    <>
      <Container className={`sticky ml-4 left-0 bg-card w-56`}>
        {pathname.startsWith("/settings") || userRole === "employer" ? (
          <SettingsSidebar />
        ) : userRole === "jobSeeker" ? (
          <Filters />
        ) : null}
      </Container>
    </>
  );
};

Sidebars.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Sidebars;
