import { Bell, BellDotIcon, LucideSettings } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import HeaderFilter from "./HeaderFilter";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const Navbar = ({ userRole, isAuth }) => {
  const notification = false;

  return (
    <div className="flex flex-col">
      <header className="hidden lg:flex sticky top-0 justify-between items-center bg-black text-white p-4 z-50">
        {/* Left Section (Navigation) */}
        <div className="flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="font-xl font-grotesk text-muted border py-2 px-6 bg-foreground rounded-xl font-black tracking-wider w-fit border-x-red-400 border-y-cyan-400 hover:invert cursor-pointer"
          >
            HIRECROWD
          </Link>
          {userRole === "jobSeeker" && (
            <nav className="space-x-4 font-semibold font-grotesk">
              <Link to="/dashboard" className="">
                Find job
              </Link>
            </nav>
          )}
        </div>

        {/* Right Section (User Profile, Settings) */}
        <div className="flex items-center space-x-4">
          {isAuth ? (
            <>
              <div className="text-sm">New York, NY</div>
              <Button size="icon" className="rounded-full border border-white">
                <LucideSettings size={20} />
              </Button>
              <Button size="icon" className="rounded-full border border-white">
                {notification ? <BellDotIcon size={20} /> : <Bell size={20} />}
              </Button>
              <Link to={`/settings`}>
                <div className="h-10 w-10 rounded-full bg-gray-600"></div>
              </Link>
            </>
          ) : (
            <div className="flex flex-row gap-3 font-grotesk">
              <Link
                to="/login"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "font-semibold text-base tracking-wide"
                )}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "font-semibold tracking-wide bg-transparent"
                )}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </header>
      <Separator className="bg-gray-600" />
      <div className="sticky top-[64px] z-40 bg-foreground">
        <HeaderFilter userRole={userRole} />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  userRole: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,
};
export default Navbar;
