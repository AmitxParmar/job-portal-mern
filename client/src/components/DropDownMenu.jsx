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

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const DropDownMenu = ({
  options = frameworks,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  onSelect,
  itemsPerPage = 50,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [search, setSearch] = useState("");

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const ItemRenderer = useCallback(
    ({ item }) => (
      <CommandItem
        key={item.value}
        value={item.value}
        onSelect={(currentValue) => {
          setValue(currentValue === value ? "" : currentValue);
          setOpen(false);
          onSelect && onSelect(currentValue);
        }}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === item.value ? "opacity-100" : "opacity-0"
          )}
        />
        {item.label}
      </CommandItem>
    ),
    [value, onSelect]
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
            ? options.find((option) => option.value === value)?.label
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

export default DropDownMenu;
