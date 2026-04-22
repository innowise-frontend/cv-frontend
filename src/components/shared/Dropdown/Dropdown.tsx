import VerticalDotsIcon from "@assets/icon/VerticalDotsIcon.svg?react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { DropdownProps } from "./types";

export const Dropdown = ({ options }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-sm p-0 data-[state=open]:bg-muted">
        <span className="sr-only">open dropdown</span>
        <VerticalDotsIcon className="h-10 w-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="text-gray-5 rounded-[8px] bg-gray-8 dark:bg-gray-2"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.label}
            onClick={option.onClick}
            className="text-gray-2 hover:bg-gray-7 hover:text-gray-2 cursor-pointer dark:text-gray-8 dark:hover:bg-gray-3"
          >
            {option.icon}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
