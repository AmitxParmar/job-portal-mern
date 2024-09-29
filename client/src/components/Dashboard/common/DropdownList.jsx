import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PropTypes from "prop-types";

const DropdownList = ({
  items,
  name,
  _onSelect,
  className,
  icon,
  placeholder,
}) => {
  return (
    <div className="flex">
      <span>{icon}</span>
      <Select onValueChange={(value) => _onSelect(value)}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{name}</SelectLabel>
            {items.map((item, index) => (
              <SelectItem key={index} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

DropdownList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  _onSelect: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
};

export default DropdownList;
