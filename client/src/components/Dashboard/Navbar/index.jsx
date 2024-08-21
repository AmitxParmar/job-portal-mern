import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { BellDotIcon } from "lucide-react";
import { LucideSettings } from "lucide-react";

const Navbar = () => {
  const notification = false;
  return (
    <header className="flex sticky justify-between items-center bg-black text-white p-4">
      {/*  Left Section (Navigation) */}
      <div className="flex items-center space-x-6">
        <div className="text-lg font-bold">Job Portal</div>
        <nav className="space-x-4">
          <a href="#" className="hover:text-gray-300">
            Find job
          </a>
          <a href="#" className="hover:text-gray-300">
            Messages
          </a>
          <a href="#" className="hover:text-gray-300">
            Hiring
          </a>
          <a href="#" className="hover:text-gray-300">
            Community
          </a>
          <a href="#" className="hover:text-gray-300">
            FAQ
          </a>
        </nav>
      </div>

      {/*  <!-- Right Section (User Profile, Settings) --> */}
      <div className="flex items-center space-x-4">
        <div className="text-sm">New York, NY</div>
        {/* <!-- Profile Icon --> */}
        <div className="h-10 w-10 rounded-full bg-gray-600"></div>
        <Button className="rounded-full border border-white">
          <LucideSettings size={20} />
        </Button>
        <Button className="rounded-full border border-white">
          {notification ? <BellDotIcon size={20} /> : <Bell size={20} />}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
