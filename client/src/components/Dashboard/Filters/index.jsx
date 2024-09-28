import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFilters } from "@/hooks/useFilters";

const Filters = () => {
  const { filters, setFilter, clearFilters } = useFilters();

  const handleSkillChange = (skill) => {
    const updatedSkills = filters?.skills?.includes(skill)
      ? filters?.skills.filters((s) => s !== skill)
      : [...filters.skills, skill];
    setFilter({ ...filters, skills: updatedSkills });
  };

  const handleStatusChange = (value) => {
    setFilter({ ...filters, status: value });
  };

  const handleDateChange = (date, type) => {
    console.log("date", type, date);
    setFilter({ ...filters, [type]: date });
  };

  const handleApplyFilters = () => {};

  function onFilterChange() {
    //debounce and send to the state manager to the central store.
  }

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      <div className="space-y-4">
        <div>
          <Label>Skills Required</Label>
          <div className="space-y-2">
            {["React", "Node.js", "Python", "Java", "JavaScript"].map(
              (skill) => (
                <div key={skill} className="flex items-center">
                  <Checkbox
                    id={skill}
                    checked={filters?.skills?.includes(skill)}
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

        <Button onClick={() => clearFilters()} className="w-full">
          Clear Filters
        </Button>
        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
      </div>
    </>
  );
};

export default Filters;
