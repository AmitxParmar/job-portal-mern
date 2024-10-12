import { Bell, BellDotIcon, LucideSettings } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

import HeaderFilter from "./HeaderFilter";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const notification = false;
  console.log("user navbar parsed", user, isAuthenticated);

  return (
    <div className="flex font-grotesk  flex-col">
      <header className="hidden lg:flex sticky top-0 justify-between items-center bg-black text-white p-4 z-50">
        {/* Left Section (Navigation) */}
        <div className="flex items-center space-x-6">
          <Link
            to="/dashboard"
            className="font-xl font-grotesk text-muted border py-2 px-6 bg-foreground rounded-xl font-black tracking-wider w-fit border-x-red-400 border-y-cyan-400 hover:invert cursor-pointer"
          >
            HIRECROWD
          </Link>
          {user?.role === "jobSeeker" && (
            <nav className="space-x-4 font-semibold font-grotesk">
              <Link to="/dashboard" className="">
                Find job
              </Link>
            </nav>
          )}
        </div>

        {/* Right Section (User Profile, Settings) */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="grid grid-flow-col-dense items-center h-fit text-sm">
                <MapPin size={20} className="mr-2" />
                {user?.address}
              </div>
              <Button size="icon" className="rounded-full border border-white">
                <LucideSettings size={20} />
              </Button>
              <Button size="icon" className="rounded-full border border-white">
                {notification ? <BellDotIcon size={20} /> : <Bell size={20} />}
              </Button>
              <Link to={`/dashboard/settings`}>
                <Avatar>
                  <AvatarImage src={user?.profilePic} alt={user?.fullName} />
                  <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
                </Avatar>
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
        <HeaderFilter />
      </div>
    </div>
  );
};

export default memo(Navbar);
