import { ChevronDownIcon } from "lucide-react";
import { useId, useState } from "react";
import CloseIcon from "@root/assets/icon/CloseIcon.svg?react";
import { Command, CommandGroup, CommandItem, CommandList } from "@root/components/ui/command";
import { Label } from "@root/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@root/components/ui/popover";
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
  onChange,
  className,
  placeholder,
}: MultiSelectProps<TValue, TOption>) {
  const [open, setOpen] = useState(false);
  const triggerId = useId();

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

  return (
    <div className={cn("flex w-full flex-col relative", className)}>
      {data.length !== 0 && (
        <Label
          htmlFor={triggerId}
          className="absolute z-10 left-2.5 -top-4 px-1 text-xs text-gray-3 dark:text-gray-5"
        >
          {label}
        </Label>
      )}
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
            "w-full border-gray-8 text-gray-8 dark:text-gray-5",
            "h-auto min-h-9 items-center whitespace-normal border-gray-5 bg-gray-8 px-3 py-2.5 text-gray-3 data-[size=default]:h-auto dark:border-gray-5 dark:bg-gray-2 dark:text-gray-5",
            "disabled:bg-gray-6 dark:disabled:bg-gray-3",
            "flex rounded-md border text-sm outline-none focus-visible:ring-0",
          )}
        >
          <div className="flex flex-1 flex-wrap items-center gap-3 text-left">
            {data.length === 0 ? (
              <span className="text-gray-5 dark:text-gray-5">{placeholder}</span>
            ) : (
              data.map((value) => {
                const selectedLabel = options.find((opt) => opt.value === value)?.label ?? value;

                return (
                  <div
                    key={value}
                    className={cn(
                      "inline-flex h-6 max-w-full items-center gap-1 rounded-full border border-gray-2 bg-gray-8 py-0.5 px-2 text-xs leading-none text-gray-2 dark:border-gray-8 dark:bg-gray-2 dark:text-gray-8 dark:disabled:bg-gray-6",
                      disabled &&
                        "bg-gray-6 text-gray-5 border-gray-5 cursor-not-allowed dark:bg-gray-3 dark:border-gray-5 dark:text-gray-5",
                    )}
                  >
                    <span>{selectedLabel}</span>
                    {!disabled && (
                      <span
                        className={cn(
                          "inline-flex size-3 shrink-0 items-center justify-center rounded-full p-0 outline-none",
                          "bg-gray-5 dark:bg-gray-5 cursor-pointer",
                        )}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeValue(value);
                        }}
                        role="button"
                      >
                        <CloseIcon className="size-1.5 text-gray-8 dark:text-gray-4" aria-hidden />
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-gray-5 dark:text-gray-5" />
        </PopoverTrigger>

        {!disabled && (
          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={4}
            positionMethod="fixed"
            collisionAvoidance={{ side: "shift", align: "none" }}
            className="absolute -top-[5px] w-(--anchor-width) p-0 border border-gray-5 bg-gray-8 text-gray-2 shadow-none ring-0 dark:bg-gray-2 dark:text-gray-5"
          >
            <Command className="rounded-none! bg-transparent p-0">
              <CommandList>
                <CommandGroup className="p-0">
                  {options.map((opt) => {
                    const isSelected = data.includes(opt.value);

                    return (
                      <CommandItem
                        key={opt.value}
                        value={opt.value}
                        onSelect={() => toggleValue(opt.value)}
                        className={cn(
                          "pl-2.5 pr-2.5 cursor-pointer",
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
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
