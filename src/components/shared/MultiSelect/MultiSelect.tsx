import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { ChevronDownIcon } from "lucide-react";
import { type MouseEvent, useCallback, useId, useState } from "react";
import { customPlaceholderClassName } from "@components/shared/formFieldStyles";
import CloseIcon from "@root/assets/icon/CloseIcon.svg?react";
import { Command, CommandGroup, CommandItem, CommandList } from "@root/components/ui/command";
import { Label } from "@root/components/ui/label";
import { Popover, PopoverTrigger } from "@root/components/ui/popover";
import { cn } from "@root/lib/utils";
import { MultiSelectOption, MultiSelectProps } from "./types";

export function MultiSelect<
  TValue extends string,
  TOption extends MultiSelectOption<TValue> = MultiSelectOption<TValue>,
>({
  label,
  data,
  options,
  disabled = false,
  disablePortal = false,
  onChange,
  className,
  placeholder,
}: MultiSelectProps<TValue, TOption>) {
  const [open, setOpen] = useState(false);
  const triggerId = useId();
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null);
  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    setContainerNode(node);
  }, []);
  const dialogContainer = containerNode?.closest("dialog");
  const positionMethod = disablePortal ? "absolute" : "fixed";
  const collisionSide = disablePortal ? "flip" : "shift";

  const hasValue = data.length > 0;
  const isLabelFloating = hasValue || open;

  const toggleValue = (value: TValue) => {
    if (disabled) return;
    const exists = data.includes(value);
    const next = exists ? data.filter((item) => item !== value) : [...data, value];
    onChange(next);
  };

  const removeValue = (value: TValue) => {
    if (disabled) return;
    onChange(data.filter((item) => item !== value));
  };

  const getSelectedLabel = (value: TValue) =>
    options.find((opt) => opt.value === value)?.label ?? value;

  const createRemoveHandler = (value: TValue) => (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeValue(value);
  };

  const renderSelectedChip = (value: TValue) => (
    <div
      key={value}
      className={cn(
        "inline-flex h-6 max-w-full items-center gap-1 rounded-full border border-gray-2 bg-gray-8 px-2 py-0.5 text-xs leading-none text-gray-2 dark:border-gray-8 dark:bg-gray-2 dark:text-gray-8",
        disabled &&
          "cursor-not-allowed border-gray-5 bg-gray-6 text-gray-5 dark:border-gray-5 dark:bg-gray-3 dark:text-gray-5",
      )}
    >
      <span>{getSelectedLabel(value)}</span>
      {!disabled && (
        <span
          className={cn(
            "inline-flex size-3 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-5 p-0 outline-none dark:bg-gray-5",
          )}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={createRemoveHandler(value)}
          role="button"
        >
          <CloseIcon className="size-1.5 text-gray-8 dark:text-gray-4" aria-hidden />
        </span>
      )}
    </div>
  );

  const popup = (
    <PopoverPrimitive.Positioner
      side="bottom"
      align="start"
      sideOffset={4}
      positionMethod={positionMethod}
      collisionAvoidance={{ side: collisionSide, align: "none" }}
      className="isolate z-50"
    >
      <PopoverPrimitive.Popup
        data-slot="popover-content"
        className="absolute -top-[5px] z-50 flex max-h-[min(240px,var(--available-height,240px))] w-(--anchor-width) min-w-36 flex-col overflow-hidden border border-gray-5 bg-gray-8 p-0 text-gray-2 shadow-none ring-0 dark:bg-gray-2 dark:text-gray-5"
      >
        <Command className="rounded-none! bg-transparent p-0">
          <CommandList className="max-h-[min(240px,var(--available-height,240px))] overflow-y-auto">
            <CommandGroup className="p-0">
              {options.map((opt) => {
                const isSelected = data.includes(opt.value);

                return (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => toggleValue(opt.value)}
                    className={cn(
                      "cursor-pointer pl-2.5 pr-2.5",
                      isSelected && "bg-gray-6 text-gray-2 dark:bg-gray-4 dark:text-gray-8",
                    )}
                  >
                    {opt.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverPrimitive.Popup>
    </PopoverPrimitive.Positioner>
  );

  return (
    <div ref={setContainerRef} className={cn("relative flex w-full flex-col", className)}>
      <div className="relative">
        <Popover
          open={open}
          onOpenChange={(next) => {
            if (disabled) return;
            setOpen(next);
          }}
        >
          <PopoverTrigger
            id={triggerId}
            disabled={disabled}
            className={cn(
              "flex w-full cursor-pointer items-center gap-1.5 border-gray-5 shadow-none outline-none transition-all duration-300",
              "min-h-12! h-auto px-3 py-3 text-base leading-6 dark:text-gray-5",
              "disabled:bg-gray-6 dark:disabled:bg-gray-3",
              "focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:shadow-none",
              "rounded-md border bg-gray-8 dark:border-gray-5 dark:bg-gray-2",
            )}
          >
            <div className="flex min-h-6 flex-1 flex-wrap items-center gap-2 text-left">
              {data.length === 0 ? (
                <span
                  className={cn(
                    customPlaceholderClassName,
                    "transition-opacity duration-300",
                    open && "opacity-0",
                    disabled && "text-gray-2 dark:text-gray-6",
                  )}
                >
                  {placeholder}
                </span>
              ) : (
                data.map(renderSelectedChip)
              )}
            </div>
            <ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-gray-5 dark:text-gray-5" />
          </PopoverTrigger>

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

          {!disabled && (
            <PopoverPrimitive.Portal
              container={disablePortal ? (containerNode ?? undefined) : dialogContainer}
            >
              {popup}
            </PopoverPrimitive.Portal>
          )}
        </Popover>
      </div>
    </div>
  );
}
