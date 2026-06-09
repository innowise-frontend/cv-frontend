import VerticalDotsIcon from "@assets/icon/VerticalDotsIcon.svg?react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { cn } from "@root/lib/utils";
import { DropdownProps } from "./types";

export const Dropdown = ({ options, keepMounted = false }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-8 items-center justify-center rounded-sm p-0 text-gray-3 data-[state=open]:bg-gray-7 dark:text-gray-8 dark:data-[state=open]:bg-gray-3">
        <span className="sr-only">open dropdown</span>
        <VerticalDotsIcon className="h-10 w-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        keepMounted={keepMounted}
        align="end"
        className={cn(
          "w-[90px] min-w-[90px] border-gray-5 bg-gray-2 text-gray-5 rounded-[8px] px-0",
          "dark:border-gray-3 dark:bg-gray-4 dark:text-gray-8",
        )}
      >
        {options.map((option, index) => (
          <DropdownMenuItem
            key={typeof option.label === "string" ? option.label : index}
            onClick={() => {
              option.onClick?.();
            }}
            className={cn(
              "h-8 w-full text-gray-5 dark:text-gray-8 hover:bg-gray-7 cursor-pointer dark:hover:bg-gray-3",
              "[&_button]:text-gray-5 [&_button]:hover:bg-transparent dark:[&_button]:text-gray-8",
            )}
          >
            {option.icon}
            {typeof option.label === "string" ? <span>{option.label}</span> : option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
