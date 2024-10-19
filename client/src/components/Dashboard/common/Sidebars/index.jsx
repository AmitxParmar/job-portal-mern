import { Suspense, lazy, memo } from "react";
import SettingsSidebar from "./SettingsSidebar";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Filters = lazy(() => import("../../Filters"));
import { SlidersVertical } from "lucide-react";

const Sidebars = () => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { user } = useAuth();

  const renderSidebar = () => {
    if (user?.role === "jobSeeker" && pathname === "/dashboard/jobSeeker") {
      return isMobile ? (
        <Dialog>
          <DialogTrigger className="flex hover:bg-muted rounded-3xl px-2 py-2 flex-row items-center gap-2 bg-muted/30">
            <SlidersVertical
              size={40}
              className="bg-cyan-300/30 rounded-full p-2"
            />
            Filters
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Filters</DialogTitle>
            <Filters />
          </DialogContent>
        </Dialog>
      ) : (
        <div className="p-4">
          <Filters />
        </div>
      );
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
        className={`fixed lg:sticky bottom-0 inset-x-2 lg:w-56 h-fit lg:min-h-full my-2 lg:h-full max-h-full py-0.5 lg:p-0 lg:ml-2 rounded-3xl z-50 overflow-auto`}
      >
        <CardContent className="p-0 min-h-full h-full mx-1">
          {renderSidebar()}
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default memo(Sidebars);
