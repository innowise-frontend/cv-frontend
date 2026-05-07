import { Select as SelectBase } from "@base-ui/react/select";
import { useCallback, useId, useState } from "react";
import { Label } from "@root/components/ui/label.tsx";
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
  error,
  placeholder,
  className,
  popupClassName,
  itemClassName,
  disablePortal = false,
  side = "bottom",
  align = "start",
  disabled = false,
  value,
  sideShift = "shift",
  onValueChange,
}: SelectProps) => {
  const triggerId = useId();
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null);
  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerNode(node);
  }, []);
  const dialogContainer = containerNode?.closest("dialog") ?? undefined;

  const labelFor = (val?: string | number) =>
    list.find((item) => item.value === val)?.label ?? placeholder;

  const handleSelectValue = (next: string | null) => {
    if (disabled) return;
    if (next !== null) onValueChange?.(next);
  };

  const popup = (
    <SelectBase.Positioner
      side={side}
      align={align}
      alignItemWithTrigger={false}
      sideOffset={4}
      positionMethod="fixed"
      collisionAvoidance={{ side: sideShift, align: "none" }}
      className="z-50"
    >
      <SelectBase.Popup
        className={cn(
          "z-50 w-(--anchor-width) min-w-36 border border-gray-5 bg-gray-8 shadow-none ring-0 text-gray-2 dark:bg-gray-2 dark:text-gray-5",
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
  );

  return (
    <div ref={setContainerRef} className={cn("relative w-full", className)}>
      {label && value && (
        <Label
          htmlFor={triggerId}
          className={cn(
            "pointer-events-none absolute z-10 left-2.5 -top-4 px-1 text-xs text-gray-3 dark:text-gray-5",
            error && "text-red",
          )}
        >
          {label}
        </Label>
      )}

      <SelectRoot
        value={value as string}
        modal={false}
        disabled={disabled}
        onValueChange={handleSelectValue}
      >
        <SelectTrigger
          id={triggerId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${triggerId}-error` : undefined}
          className={cn(
            "h-12 w-full px-3 py-3 text-base leading-6 border-gray-5 shadow-none outline-none data-[size=default]:h-12",
            "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none",
            "text-gray-2 dark:text-white disabled:bg-gray-6 dark:disabled:bg-gray-3",
            error &&
              "border-red focus-visible:border-red dark:border-red dark:focus-visible:border-red",
          )}
        >
          <SelectValue placeholder={placeholder}>{labelFor(value as string)}</SelectValue>
        </SelectTrigger>

        {disablePortal ? (
          popup
        ) : (
          <SelectBase.Portal container={dialogContainer}>{popup}</SelectBase.Portal>
        )}
      </SelectRoot>

      <p
        id={`${triggerId}-error`}
        className={cn("pl-2 mt-1 text-left text-xs text-red h-3", !error && "invisible")}
      >
        {error || " "}
      </p>
    </div>
  );
};
