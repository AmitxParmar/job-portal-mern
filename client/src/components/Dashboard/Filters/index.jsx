import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useState } from "react";

const Filters = () => {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    minSalary: 0,
    maxSalary: 1000000,
    skillsRequired: [],
    status: "all",
    postedAfter: null,
    postedBefore: null,
  });

  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (skill) => {
    const updatedSkills = filters.skillsRequired.includes(skill)
      ? filters.skillsRequired.filter((s) => s !== skill)
      : [...filters.skillsRequired, skill];
    setFilters({ ...filters, skillsRequired: updatedSkills });
  };

  const handleStatusChange = (value) => {
    setFilters({ ...filters, status: value });
  };

  const handleDateChange = (date, type) => {
    setFilters({ ...filters, [type]: date });
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };
  function onFilterChange() {
    //debounce and send to the state manager to the central store.
  }
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            name="title"
            value={filters.title}
            onChange={handleInputChange}
            placeholder="Search job titles"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="City, Country"
          />
        </div>

        <div>
          <Label>Skills Required</Label>
          <div className="space-y-2">
            {["React", "Node.js", "Python", "Java", "JavaScript"].map(
              (skill) => (
                <div key={skill} className="flex items-center">
                  <Checkbox
                    id={skill}
                    checked={filters.skillsRequired.includes(skill)}
                    onCheckedChange={() => handleSkillChange(skill)}
                  />
                  <label htmlFor={skill} className="ml-2 text-sm">
                    {skill}
                  </label>
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <Label>Status</Label>
          <RadioGroup value={filters.status} onValueChange={handleStatusChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="open" id="open" />
              <Label htmlFor="open">Open</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="closed" id="closed" />
              <Label htmlFor="closed">Closed</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Posted After</Label>
          <DatePicker
            selected={filters.postedAfter}
            onSelect={(date) => handleDateChange(date, "postedAfter")}
          />
        </div>

        <div>
          <Label>Posted Before</Label>
          <DatePicker
            selected={filters.postedBefore}
            onSelect={(date) => handleDateChange(date, "postedBefore")}
          />
        </div>

        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
      </div>
    </>
  );
};

export default Filters;
