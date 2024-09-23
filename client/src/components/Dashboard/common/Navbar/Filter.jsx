import { useState } from "react";
import { useLocation } from "react-router-dom";
import { City } from "country-state-city";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import SearchDropdown from "@/components/SearchDropdown";
import { MapPin, Search, ChevronDown, Briefcase } from "lucide-react";

const HeaderFilter = ({ userRole }) => {
  const { pathname } = useLocation(); // Get pathname from useLocation
  const [filters, setFilters] = useState({
    minSalary: 0,
    maxSalary: 1000000,
  });

  const handleSalaryChange = (value) => {
    setFilters({ ...filters, minSalary: value[0], maxSalary: value[1] });
  };

  return (
    <div>
      {pathname === "/dashboard" && userRole !== "employer" && (
        <div className="bg-foreground lg:min-h-24 lg:flex hidden lg:flex-row lg:justify-between px-4 items-center">
          <div className="grid items-center">
            <Search className="text-white h-10 w-10 rounded-full border border-white p-1.5" />
            <Input
              placeholder={`eg. Full-stack Developer`}
              className={`w-fit text-background border-none focus-visible:ring-0`}
            />
            <ChevronDown className="inline text-white h-4 w-4" />
          </div>
          <Separator orientation="vertical" className="h-1/2" />
          <SearchDropdown
            items={City.getCitiesOfCountry("IN")}
            placeholder={`eg. Ahmedabad`}
            icon={
              <MapPin className="text-white h-10 w-10 rounded-full border border-white p-1.5" />
            }
            onSelect={(e) => console.log(e, "item selected")}
            className={``}
          />
          <Separator orientation="vertical" className="h-1/2" />
          <SearchDropdown
            items={[
              { id: "12", name: "Junior" },
              { id: "23", name: "Senior" },
              { id: "34", name: "Principal" },
            ]}
            placeholder={`eg. Junior`}
            icon={<Briefcase />}
            className={``}
            onSelect={(e) => console.log(e)}
          />
          <Separator orientation="vertical" className="h-1/2" />
          <SearchDropdown
            items={City.getCitiesOfCountry("IN")}
            placeholder={`eg. Per Month`}
            icon={<Search />}
            className={``}
            onSelect={(e) => console.log(e)}
          />
          <Separator orientation="vertical" className="h-1/2" />
          <div className="w-auto">
            <Label>Salary Range</Label>
            <Slider
              min={0}
              max={100000}
              step={1000}
              value={[filters.minSalary, filters.maxSalary]}
              onValueChange={handleSalaryChange}
            />
            <div className="flex justify-between text-sm mt-1">
              <span>Rs.{filters.minSalary}</span>
              <span>Rs.{filters.maxSalary}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderFilter;
