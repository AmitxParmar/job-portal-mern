import {
  Briefcase,
  CalendarDays,
  ChevronDown,
  MapPin,
  Search,
} from "lucide-react";
import { lazy, memo } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "../Loader";
import PropTypes from "prop-types";
import { Slider } from "@/components/ui/slider";
import { Suspense } from "react";
import { cities } from "@/constants/constants";
import { useFilters } from "@/hooks/useFilters";
import { useLocation } from "react-router-dom";

const SearchDropdown = lazy(() =>
  import("../../../../components/SearchDropdown")
);

const DropdownList = lazy(() => import("../DropdownList"));

const HeaderFilter = ({ role }) => {
  const { filters, setFilter } = useFilters();
  const { pathname } = useLocation(); // Get pathname from useLocation

  return (
    pathname === "/dashboard" &&
    role !== "employer" && (
      <Suspense
        fallback={<Loader className={`transition-all duration-1000`} />}
      >
        <div className="bg-foreground px-4 lg:min-h-24 lg:grid hidden lg:grid-flow-col items-center">
          {/*  */}
          <div className="grid grid-flow-col-dense items-center">
            <Search className="text-white h-10 w-10 rounded-full border border-white p-1.5" />
            <Input
              placeholder={`eg. Full-stack Developer`}
              className={`w-full text-background bg-transparent placeholder:text-background/50 placeholder:font-semibold placeholder:text-lg border-none focus-visible:ring-0`}
              onChange={(e) => setFilter({ ...filters, title: e.target.value })}
            />
            <ChevronDown className="inline text-white h-4 w-4" />
          </div>
          {/* Cities Filter */}
          <SearchDropdown
            items={cities}
            placeholder={`eg. Ahmedabad`}
            icon={
              <MapPin className="text-white h-10 w-10 rounded-full border border-white p-1.5" />
            }
            _onSelect={(city) =>
              setFilter({ ...filters, location: city.toLowerCase() })
            }
            className={``}
          />
          <DropdownList
            items={["full time", "part time", "internship"]}
            placeholder={`eg. Junior`}
            name={`jobType`}
            icon={
              <Briefcase className="text-white bg-black h-10 w-10 rounded-full border border-white p-1.5" />
            }
            className={`bg-transparent border-0 text-background/50 text-lg`}
            _onSelect={(experience) => setFilter({ ...filters, experience })}
          />
          <DropdownList
            name={`frequency`}
            items={["hourly", "monthly", "yearly"]}
            placeholder={`eg. Per Month`}
            icon={
              <CalendarDays className="text-white bg-black h-10 w-10 rounded-full border border-white p-1.5" />
            }
            className={`bg-transparent border-0 text-background/50 text-lg`}
            _onSelect={(frequency) => setFilter({ ...filters, frequency })}
          />
          <div className="w-full text-white">
            <Label>Salary Range</Label>
            <Slider
              className=""
              min={0}
              max={1000000}
              step={1000}
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
              <span>Rs.{filters.salaryMin || 0}</span>
              <span>Rs.{filters.salaryMax || 1000000}</span>
            </div>
          </div>
        </div>
      </Suspense>
    )
  );
};

HeaderFilter.propTypes = {
  role: PropTypes.oneOf(["employer", "jobSeeker"]).isRequired,
};

export default memo(HeaderFilter);
