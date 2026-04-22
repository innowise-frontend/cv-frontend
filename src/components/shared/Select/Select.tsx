import { useState } from "react";
import {
  Select as UISelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { cn } from "@root/lib";
import { SelectProps } from "./types";

export const Select = ({ options, onValueChange }: SelectProps) => {
  const [active, setAvtive] = useState<number>(options[0].value);

  const handleValueChange = (value: number) => {
    setAvtive(value);
    onValueChange(value);
  };

  return (
    <UISelect defaultValue={options[0].value}>
      <SelectTrigger className="w-[60px] border-none shadow-none text-xs bg-gray-8 dark:bg-gray-2">
        <SelectValue className="cursor-pointer" />
      </SelectTrigger>
      <SelectContent
        align="start"
        className="bg-gray-8 dark:bg-gray-2 min-w-0 rounded-[8px] text-gray-5 dark:text-gray-3"
      >
        <SelectGroup className="text-gray dark:text-gray-8">
          {options.map(({ label, value }) => {
            return (
              <SelectItem
                key={value}
                value={value}
                className={cn(
                  active === value && "bg-gray-7 rounded-[8px] text-red dark:bg-gray-3",
                  "text-xs cursor-pointer",
                )}
                onClick={() => handleValueChange(value)}
              >
                {label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </UISelect>
  );
};
