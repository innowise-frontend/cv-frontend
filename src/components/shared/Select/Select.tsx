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
import type { SelectProps } from "./types";

export function Select(props: SelectProps) {
  const { list, placeholder, label, className, multiple = false } = props;
  const triggerId = useId();

  const valueToLabel = useMemo(() => new Map(list.map((i) => [i.value, i.label])), [list]);
  const labelFor = (value: string) => valueToLabel.get(value) ?? value;

  const singleValue = multiple ? null : (props as Extract<SelectProps, { multiple?: false }>).value;
  const multiValue = multiple ? (props as Extract<SelectProps, { multiple: true }>).value : [];

  function handleRootValueChange(next: string | string[] | null) {
    if (multiple) {
      (props as Extract<SelectProps, { multiple: true }>).onValueChange(
        Array.isArray(next) ? next : [],
      );
    } else {
      (props as Extract<SelectProps, { multiple?: false }>).onValueChange(
        (next as string | null) ?? "",
      );
    }
  }

  function removeChip(item: string) {
    if (!multiple) return;
    const p = props as Extract<SelectProps, { multiple: true }>;
    p.onValueChange(p.value.filter((v) => v !== item));
  }

  const itemClassName = cn(
    "pl-2.5 pr-2.5 text-gray-2 dark:text-gray-5",
    "data-selected:bg-gray-6 data-selected:text-gray dark:data-selected:bg-gray-4 dark:data-selected:text-gray-8",
    "[&_svg]:hidden",
  );

  const rootValue = multiple ? multiValue : singleValue;

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <Label
        htmlFor={triggerId}
        className="justify-start pl-3 text-left text-xs font-normal text-gray-3 dark:text-gray-5"
      >
        {label}
      </Label>
      <SelectShadcn
        multiple={multiple}
        value={rootValue as never}
        onValueChange={handleRootValueChange as never}
      >
        <SelectTrigger
          id={triggerId}
          className={cn(
            "w-full border-gray-5 text-gray-2 dark:text-gray-5",
            multiple &&
              "h-auto min-h-9 py-2.5 px-3 items-center whitespace-normal bg-gray-6 border-gray-5 text-gray-3 dark:bg-gray-2 dark:text-gray-5 dark:border-gray-5 data-[size=default]:h-auto",
          )}
        >
          {multiple ? (
            <SelectValue
              placeholder={placeholder}
              className="flex flex-1 flex-wrap items-center gap-4"
            >
              {(values) => {
                if (values.length === 0) {
                  return <span className="text-gray-5 dark:text-gray-5">{placeholder}</span>;
                }

                return values.map((v: string) => (
                  <span
                    key={v}
                    className="h-6 inline-flex max-w-full items-center gap-1 rounded-full border border-gray-5 bg-gray-6 py-0.5 pl-2 pr-1 text-xs leading-none text-gray-5 dark:border-gray-5 dark:bg-gray-3 dark:text-gray-8"
                  >
                    <span className="">{labelFor(v)}</span>
                    <button
                      type="button"
                      className={cn(
                        "inline-flex size-3 shrink-0 items-center justify-center rounded-full p-0 outline-none",
                        "bg-gray-5 dark:bg-gray-5",
                      )}
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeChip(v);
                      }}
                    >
                      <CloseIcon className="size-1.5 text-gray-6 dark:text-gray-4" aria-hidden />
                    </button>
                  </span>
                ));
              }}
            </SelectValue>
          ) : (
            <SelectValue placeholder={placeholder}>
              {singleValue ? labelFor(singleValue) : placeholder}
            </SelectValue>
          )}
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
}
