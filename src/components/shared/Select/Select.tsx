import { useId, useMemo } from "react";
import CloseIcon from "@root/assets/icon/CloseIcon.svg?react";
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
import type { MultiSelectProps, SelectProps, SingleSelectProps } from "./types";

const itemClassName = cn(
  "pl-2.5 pr-2.5 text-gray-2 dark:text-gray-5",
  "data-selected:bg-gray-6 data-selected:text-gray dark:data-selected:bg-gray-4 dark:data-selected:text-gray-8",
  "[&_svg]:hidden cursor-pointer",
);

const SelectSingle = ({
  list,
  placeholder,
  label,
  className,
  value,
  onValueChange,
}: SingleSelectProps) => {
  const triggerId = useId();

  const valueToLabel = useMemo(() => new Map(list.map((i) => [i.value, i.label])), [list]);
  const labelFor = (v: string) => valueToLabel.get(v) ?? v;

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <Label
        htmlFor={triggerId}
        className="justify-start pl-3 text-left text-xs font-normal text-gray-3 dark:text-gray-5"
      >
        {label}
      </Label>
      <SelectShadcn
        value={(value ?? "") as never}
        onValueChange={(next) => onValueChange((next as string | null) ?? "")}
      >
        <SelectTrigger id={triggerId} className="w-full border-gray-5 text-gray-2 dark:text-gray-5">
          <SelectValue placeholder={placeholder}>
            {value ? labelFor(value) : placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          side="bottom"
          align="start"
          className="absolute top-[-5px] left-0 border border-gray-5 bg-gray-8 text-gray-2 shadow-none ring-0 dark:bg-gray-2 dark:text-gray-5"
        >
          <SelectGroup className="p-0">
            {list.map((item) => (
              <SelectItem key={item.value} value={item.value} className={itemClassName}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectShadcn>
    </div>
  );
};

const SelectMulti = ({
  list,
  placeholder,
  label,
  className,
  value,
  onValueChange,
}: MultiSelectProps) => {
  const triggerId = useId();

  const valueToLabel = useMemo(() => new Map(list.map((i) => [i.value, i.label])), [list]);
  const labelFor = (v: string) => valueToLabel.get(v) ?? v;

  function removeChip(item: string) {
    onValueChange(value.filter((v) => v !== item));
  }

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <Label
        htmlFor={triggerId}
        className="justify-start pl-3 text-left text-xs font-normal text-gray-3 dark:text-gray-5"
      >
        {label}
      </Label>
      <SelectShadcn
        multiple
        value={value as never}
        onValueChange={(next) => onValueChange((Array.isArray(next) ? next : []) as string[])}
      >
        <SelectTrigger
          id={triggerId}
          className={cn(
            "w-full border-gray-5 text-gray-8 dark:text-gray-5",
            "h-auto min-h-9 items-center whitespace-normal border-gray-5 bg-gray-8 px-3 py-2.5 text-gray-3 data-[size=default]:h-auto dark:border-gray-5 dark:bg-gray-2 dark:text-gray-5",
          )}
        >
          <SelectValue
            placeholder={placeholder}
            className="flex flex-1 flex-wrap items-center gap-4"
          >
            {(values) => {
              if (values.length === 0) {
                return <span className="text-gray-5 dark:text-gray-5">{placeholder}</span>;
              }

              return values.map((v: string) => (
                <div
                  key={v}
                  className="inline-flex h-6 max-w-full items-center gap-1 rounded-full border border-gray-2 bg-gray-8 py-0.5 pl-2 pr-1 text-xs leading-none text-gray-2 dark:border-gray-5 dark:bg-gray-3 dark:text-gray-8"
                >
                  <span>{labelFor(v)}</span>
                  <div
                    className={cn(
                      "inline-flex size-3 shrink-0 items-center justify-center rounded-full p-0 outline-none",
                      "bg-gray-5 dark:bg-gray-5 cursor-pointer",
                    )}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeChip(v);
                    }}
                  >
                    <CloseIcon className="size-1.5 text-gray-8 dark:text-gray-4" aria-hidden />
                  </div>
                </div>
              ));
            }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          side="bottom"
          align="start"
          className="absolute top-[-5px] left-0 border border-gray-5 bg-gray-8 text-gray-2 shadow-none ring-0 dark:bg-gray-2 dark:text-gray-5"
        >
          <SelectGroup className="p-0">
            {list.map((item) => (
              <SelectItem key={item.value} value={item.value} className={itemClassName}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectShadcn>
    </div>
  );
};

export const Select = (props: SelectProps) => {
  return props.multiple ? <SelectMulti {...props} /> : <SelectSingle {...props} />;
};
