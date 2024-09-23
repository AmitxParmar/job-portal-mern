import { Bell, BellDotIcon, LucideSettings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import HeaderFilter from "./Filter";
import PropTypes from "prop-types";

const Navbar = ({ userRole }) => {
  const notification = false;

  return (
    <div className="sticky inset-x-0 inset-0 h-fit">
      <header className="hidden lg:flex sticky top-0 justify-between items-center bg-black text-white p-4">
        {/*  Left Section (Navigation) */}
        <div className="flex items-center space-x-6">
          <div className="font-xl font-grotesk text-muted border py-2 px-6 bg-foreground rounded-xl font-black tracking-wider w-fit border-x-red-400 border-y-cyan-400 hover:invert cursor-pointer">
            HIRECROWD
          </div>
          <nav className="space-x-4 font-semibold font-grotesk">
            <Link to="/dashboard" className="">
              Find job
            </Link>
          </nav>
        </div>

        {/*  <!-- Right Section (User Profile, Settings) --> */}
        <div className="flex items-center space-x-4">
          <div className="text-sm">New York, NY</div>
          {/* <!-- Profile Icon --> */}
          <Button size="icon" className="rounded-full border border-white">
            <LucideSettings size={20} />
          </Button>
          <Button size="icon" className="rounded-full border border-white">
            {notification ? <BellDotIcon size={20} /> : <Bell size={20} />}
          </Button>
          <Link to={`/settings`}>
            <div className="h-10 w-10 rounded-full bg-gray-600"></div>
          </Link>
        </div>
      </header>
      <Separator className="bg-gray-600" />
      <HeaderFilter userRole={userRole} />
    </div>
  );
};
Navbar.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default Navbar;
