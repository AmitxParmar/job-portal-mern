import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { BellDotIcon } from "lucide-react";
import { LucideSettings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { City } from "country-state-city";
import { Slider } from "@/components/ui/slider";

import DropDownMenu from "@/components/DropDownMenu";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const notification = false;
  console.log(City.getCitiesOfCountry("IN"), "cities");
  return (
    <>
      <header className="flex sticky justify-between items-center bg-black text-white p-4">
        {/*  Left Section (Navigation) */}
        <div className="flex items-center space-x-6">
          <div className="text-lg font-bold">Job Portal</div>
          <nav className="space-x-4">
            <Link to="/dashboard">Find job</Link>
          </nav>
        </div>

        {/*  <!-- Right Section (User Profile, Settings) --> */}
        <div className="flex items-center space-x-4">
          <div className="text-sm">New York, NY</div>
          {/* <!-- Profile Icon --> */}
          <Button className="rounded-full h-10 w-10 border border-white">
            <LucideSettings size={200} />
          </Button>
          <Button className="rounded-full border border-white h-10 w-10">
            {notification ? <BellDotIcon size={50} /> : <Bell size={20} />}
          </Button>
          <Link to={`/dashboard/profile`}>
            <div className="h-10 w-10 rounded-full bg-gray-600"></div>
          </Link>
        </div>
      </header>
      <Separator className="bg-gray-500" />
      {pathname === "/dashboard" && (
        <div className="text-white bg-black lg:min-h-24 items-center align-center justify-between flex flex-row px-12">
          <DropDownMenu />
          <Separator orientation="vertical" className="h-[60%]" />
          <DropDownMenu options={City.getCitiesOfCountry("IN")} />
          <Separator orientation="vertical" className="h-1/2" />
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-1/2" />
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" className="h-1/2" />
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            className={`max-w-64 w-1/2`}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
