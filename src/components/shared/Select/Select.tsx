import { Select as SelectBase } from "@base-ui/react/select";
import { useCallback, useId, useState } from "react";
import { selectPlaceholderClassName } from "@components/shared/formFieldStyles";
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
  disablePortal = false,
  side = "bottom",
  align = "start",
  disabled = false,
  value,
  sideShift = "shift",
  onValueChange,
}: SelectProps) => {
  const triggerId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null);
  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerNode(node);
  }, []);
  const dialogContainer = containerNode?.closest("dialog") ?? undefined;

  const hasValue = value !== "" && value !== undefined && value !== null;
  const isLabelFloating = hasValue || isOpen;

  const labelFor = (val?: string | number) =>
    list.find((item) => item.value === val)?.label ?? undefined;

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
          "absolute -top-[5px] z-50 flex w-(--anchor-width) min-w-36 flex-col overflow-hidden border border-b border-gray-5 bg-gray-8 shadow-none ring-0 text-gray-2 dark:bg-gray-2 dark:border-b-gray-5 dark:text-gray-5",
          "max-h-[min(16rem,var(--available-height,24rem))]",
          "placeholder:text-gray-8 dark:placeholder:text-gray-6 disabled:placeholder:text-gray-2 disabled:dark:placeholder:text-gray-6",
          popupClassName,
        )}
      >
        <SelectScrollUpButton />
        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
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
        </div>
        <SelectScrollDownButton />
      </SelectBase.Popup>
    </SelectBase.Positioner>
  );

  return (
    <div ref={setContainerRef} className={cn("relative flex w-full flex-col", className)}>
      <div className="relative">
        <SelectRoot
          value={value as string}
          modal={false}
          disabled={disabled}
          onOpenChange={setIsOpen}
          onValueChange={handleSelectValue}
        >
          <SelectTrigger
            id={triggerId}
            disabled={disabled}
            className={cn(
              "w-full cursor-pointer border-gray-5 text-gray-2 shadow-none outline-none transition-all duration-300",
              "h-12! px-3 py-3 text-base leading-6 dark:text-gray-5 disabled:bg-gray-6 dark:disabled:bg-gray-3",
              selectPlaceholderClassName,
              "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none",
            )}
          >
            <SelectValue
              className={cn("transition-all duration-300", !hasValue && isOpen && "opacity-0")}
              placeholder={placeholder}
            >
              {labelFor(value as string)}
            </SelectValue>
          </SelectTrigger>

          {label && (
            <Label
              htmlFor={triggerId}
              className={cn(
                isLabelFloating
                  ? "-top-0.5 translate-x-2.5 -translate-y-4 text-xs text-gray-3 opacity-100 dark:text-gray-5"
                  : "top-1/2 -translate-y-1/2 translate-x-2.5 text-sm text-gray-6 opacity-0 dark:text-gray-3",
              )}
            >
              {label}
            </Label>
          )}

          {disablePortal ? (
            popup
          ) : (
            <SelectBase.Portal container={dialogContainer}>{popup}</SelectBase.Portal>
          )}
        </SelectRoot>
      </div>
    </div>
  );
};
