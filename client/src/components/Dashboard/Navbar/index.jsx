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

import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import { LuggageIcon } from "lucide-react";
import { Calendar } from "lucide-react";
import { Calculator } from "lucide-react";
import DropDownMenu from "@/components/DropDownMenu";
const Navbar = () => {
  const notification = false;
  return (
    <>
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
          <Button className="rounded-full h-10 w-10 border border-white">
            <LucideSettings size={200} />
          </Button>
          <Button className="rounded-full border border-white h-10 w-10">
            {notification ? <BellDotIcon size={20} /> : <Bell size={20} />}
          </Button>
        </div>
      </header>
      <Separator className="bg-gray-500" />
      <div className="text-white bg-black h-[600px] items-center align-center justify-between flex flex-row px-12">
        <DropDownMenu />
        <Separator orientation="vertical" className="h-[60%]" />
        <DropDownMenu />
        <Separator orientation="vertical" className="h-[60%]" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Separator orientation="vertical" className="h-[60%]" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Separator orientation="vertical" className="h-[60%]" />
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className={`max-w-[250px] w-[60%]`}
        />
      </div>
    </>
  );
};

export default Navbar;
