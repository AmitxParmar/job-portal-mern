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
import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Virtuoso } from "react-virtuoso";
import PropTypes from "prop-types";

const frameworks = [
  { name: "next.js", label: "Next.js" },
  { name: "sveltekit", label: "SvelteKit" },
  { name: "nuxt.js", label: "Nuxt.js" },
  { name: "remix", label: "Remix" },
  { name: "astro", label: "Astro" },
];

const DropDownMenu = ({
  options = frameworks,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  // Filter options based on search

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  const ItemRenderer = useCallback(
    ({ item }) => (
      <CommandItem
        key={item.name}
        value={item.name}
        onSelect={(currentValue) => {
          setValue(currentValue === value ? "" : currentValue);
          setOpen(false);
          onSelect && onSelect(currentValue);
        }}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === item.name ? "opacity-100" : "opacity-0"
          )}
        />
        {item.label}
      </CommandItem>
    ),
    [onSelect, value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find(
                (option) => option.name.toLowerCase() === value.toLowerCase()
              )
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              <Virtuoso
                style={{ height: "300px" }}
                totalCount={filteredOptions.length}
                itemContent={(index) => (
                  <ItemRenderer item={filteredOptions[index]} />
                )}
                overscan={200}
              />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

DropDownMenu.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  emptyMessage: PropTypes.string,
  onSelect: PropTypes.func,
  itemsPerPage: PropTypes.number,
};

export default DropDownMenu;
