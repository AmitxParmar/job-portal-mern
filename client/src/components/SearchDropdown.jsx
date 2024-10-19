import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { memo, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";

const SearchDropdown = ({ placeholder, items, _onSelect, icon }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredItems = useMemo(
    () =>
      items
        .filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, 20),
    [items, searchValue]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={`w-full justify-start p-0 min-w-full text-secondary group hover:bg-transparent hover:text-secondary/50 text-lg font-grotesk flex items-center`}
        >
          <span className="mr-3">{icon}</span>
          <span className="text-background/50">
            {(searchValue && <span>{searchValue}</span>) ||
              (placeholder && <span>{placeholder}</span>)}
          </span>
          <ChevronDown className="ml-auto h-4 w-4" />
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
                  key={`${item.name}_${item.stateCode}_${item.countryCode}`}
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      countryCode: PropTypes.string.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
      stateCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  _onSelect: PropTypes.func.isRequired,
  icon: PropTypes.element,
};

export default memo(SearchDropdown);
