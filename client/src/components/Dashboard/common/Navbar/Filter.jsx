import { useState } from "react";
import { useLocation } from "react-router-dom";
import { City } from "country-state-city";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import SearchDropdown from "@/components/SearchDropdown";
import { MapPin, Search, ChevronDown, Briefcase } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";

const HeaderFilter = ({ userRole }) => {
  const { filters, setFilter, clearFilters } = useFilters();
  const { pathname } = useLocation(); // Get pathname from useLocation

  return (
    pathname === "/dashboard" &&
    userRole !== "employer" && (
      <div className="bg-foreground lg:min-h-24 lg:flex hidden lg:flex-row lg:justify-between px-4 items-center">
        <div className="grid grid-flow-col-dense items-center">
          <Search className="text-white h-10 w-10 rounded-full border border-white p-1.5" />
          <Input
            placeholder={`eg. Full-stack Developer`}
            className={`w-fit text-background bg-transparent placeholder:text-background/50 placeholder:font-semibold placeholder:text-lg border-none focus-visible:ring-0`}
            onChange={(e) => setFilter({ ...filters, title: e.target.value })}
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
          _onSelect={(city) =>
            setFilter({ ...filters, location: city.toLowerCase() })
          }
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
          icon={
            <Briefcase className="text-white h-10 w-10 rounded-full border border-white p-1.5" />
          }
          className={``}
          _onSelect={(e) =>
            setFilter({ ...filters, experience: e.target.value })
          }
        />
        <Separator orientation="vertical" className="h-1/2" />
        <SearchDropdown
          items={[
            { id: "12", name: "Hourly" },
            { id: "23", name: "Monthly" },
            { id: "34", name: "Yearly" },
          ]}
          placeholder={`eg. Per Month`}
          icon={<Search />}
          className={``}
          _onSelect={(e) => console.log(e)}
        />
        <Separator orientation="vertical" className="h-1/2" />
        <div className="text-white">
          <Label>Salary Range</Label>
          <Slider
            min={0}
            max={1000000}
            step={100000}
            value={[filters.salaryMin || 0, filters.salaryMax || 1000000]}
            onValueChange={(value) =>
              setFilter({
                ...filters,
                salaryMin: value[0],
                salaryMax: value[1],
              })
            }
          />
          <div className="flex justify-between text-sm mt-1">
            <span>Rs.{filters.minSalary}</span>
            <span>Rs.{filters.maxSalary}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default HeaderFilter;
