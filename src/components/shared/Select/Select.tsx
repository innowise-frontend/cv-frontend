import { Select as SelectBase } from "@base-ui/react/select";
import { useId } from "react";
import { Label } from "@root/components/ui/label";
import {
  Select as SelectRoot,
  SelectGroup,
  SelectItem,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
} from "@root/components/ui/select";
import { cn } from "@root/lib/utils";
import type { SelectProps } from "./types.ts";

export const Select = ({
  list,
  label,
  placeholder,
  className,
  popupClassName,
  itemClassName,
  side = "bottom",
  align = "start",
  value,
  onValueChange,
}: SelectProps) => {
  const triggerId = useId();

  const labelFor = (val?: string | number) =>
    list.find((item) => item.value === val)?.label ?? placeholder;

  return (
    <div className={cn("relative flex w-full flex-col", className)}>
      <Label
        htmlFor={triggerId}
        className="justify-start pl-3 text-left text-xs font-normal text-gray-3 dark:text-gray-5"
      >
        {label}
      </Label>

      <SelectRoot
        value={value as string}
        modal={false}
        onValueChange={(next) => {
          if (next !== null) onValueChange?.(next);
        }}
      >
        <SelectTrigger
          id={triggerId}
          className="w-full border-gray-5 text-gray-2 data-[size=default]:h-auto px-3 py-3.25 dark:text-gray-5"
        >
          <SelectValue placeholder={placeholder}>{labelFor(value as string)}</SelectValue>
        </SelectTrigger>

        <SelectBase.Portal>
          <SelectBase.Positioner
            side={side}
            align={align}
            alignItemWithTrigger={false}
            sideOffset={4}
            positionMethod="fixed"
            collisionAvoidance={{ side: "shift", align: "none" }}
            className="z-50"
          >
            <SelectBase.Popup
              className={cn(
                "absolute -top-[5px] z-50 w-(--anchor-width) min-w-36 border border-gray-5 bg-gray-8 shadow-none ring-0 text-gray-2 dark:bg-gray-2 dark:text-gray-5",
                "max-h-(--available-height) overflow-x-hidden overflow-y-auto",
                popupClassName,
              )}
            >
              <SelectScrollUpButton />
              <SelectBase.List>
                <SelectGroup className="p-0">
                  {list.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className={cn(
                        "cursor-pointer pl-2.5 pr-2.5 text-gray-2 dark:text-gray-5 [&_svg]:hidden",
                        "data-selected:bg-gray-6 data-selected:text-gray dark:data-selected:bg-gray-4 dark:data-selected:text-gray-8",
                        itemClassName,
                      )}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectBase.List>
              <SelectScrollDownButton />
            </SelectBase.Popup>
          </SelectBase.Positioner>
        </SelectBase.Portal>
      </SelectRoot>
    </div>
  );
};
