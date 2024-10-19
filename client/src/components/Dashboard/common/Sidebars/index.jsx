import { Suspense, lazy, memo } from "react";
import SettingsSidebar from "./SettingsSidebar";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";

const Filters = lazy(() => import("../../Filters"));

const Sidebars = () => {
  const { pathname } = useLocation();

  const { user } = useAuth();

  const renderSidebar = () => {
    if (user?.role === "jobSeeker" && pathname === "/dashboard/jobSeeker") {
      return <Filters />;
    } else if (
      pathname.startsWith("/dashboard/recruiter") ||
      pathname.startsWith("/dashboard/settings")
    ) {
      return <SettingsSidebar />;
    }
    return null;
  };

  return (
    <Suspense fallback={`Loading....`}>
      <Card
        className={`absolute lg:sticky bottom-0 inset-x-2 lg:w-56 h-fit lg:min-h-full my-2 lg:h-full max-h-full py-2 lg:p-0 lg:ml-2 rounded-3xl z-50 overflow-auto`}
      >
        <CardContent className="p-0 min-h-full h-full mx-1">
          {renderSidebar()}
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default memo(Sidebars);
