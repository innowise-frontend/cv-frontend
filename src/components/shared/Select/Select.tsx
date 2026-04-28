import { useId } from "react";
import { Label } from "@root/components/ui/label";
import {
  Select as SelectShadcn,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@root/components/ui/select";
import { cn } from "@root/lib/utils";
import type { SelectProps } from "./types.ts";

export const Select = ({
  list,
  placeholder,
  label,
  className,
  value,
  onValueChange,
}: SelectProps) => {
  const triggerId = useId();

  const labelFor = (value?: string | number) =>
    list.find((item) => item.value === value)?.label ?? placeholder;

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <Label
        htmlFor={triggerId}
        className="justify-start pl-3 text-left text-xs font-normal text-gray-3 dark:text-gray-5"
      >
        {label}
      </Label>
      <SelectShadcn
        value={value as string}
        onValueChange={(next) => {
          if (next !== null) onValueChange?.(next);
        }}
      >
        <SelectTrigger id={triggerId} className="w-full border-gray-5 text-gray-2 dark:text-gray-5">
          <SelectValue placeholder={placeholder}>{labelFor(value as string)}</SelectValue>
        </SelectTrigger>
        <SelectContent
          side="bottom"
          align="start"
          className="absolute top-[-5px] left-0 border border-gray-5 bg-gray-8 text-gray-2 shadow-none ring-0 dark:bg-gray-2 dark:text-gray-5"
        >
          <SelectGroup className="p-0">
            {list.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className={cn(
                  "pl-2.5 pr-2.5 text-gray-2 dark:text-gray-5",
                  "data-selected:bg-gray-6 data-selected:text-gray dark:data-selected:bg-gray-4 dark:data-selected:text-gray-8",
                  "[&_svg]:hidden cursor-pointer",
                )}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectShadcn>
    </div>
  );
};