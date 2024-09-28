import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ChevronDown } from "lucide-react";

const SearchDropdown = ({ placeholder, items, _onSelect, icon }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .slice(0, 10); // Limit to first 100 matches for performance

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`text-secondary group hover:bg-transparent hover:text-secondary/50 text-lg font-grotesk`}
        >
          <span className="mr-4">{icon}</span>
          <span className="items-baseline group-hover:text-secondary/50">
            {(searchValue && <span>{searchValue}</span>) ||
              (placeholder && (
                <span className="text-background/50">{placeholder}</span>
              ))}
          </span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList className="max-h-[200px] overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredItems.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    _onSelect(item.name);
                    setSearchValue(item.name); // Set the selected item name as the search value
                    setOpen(false);
                  }}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Define prop types
SearchDropdown.propTypes = {
  placeholder: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  _onSelect: PropTypes.func.isRequired,
  icon: PropTypes.element,
};

export default SearchDropdown;
