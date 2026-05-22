import { useState } from "react";
import { cn } from "tailwind-variants";
import ChevronRightIcon from "@assets/icon/ChevronRightIcon.svg?react";
import { Button, Select } from "@components/shared";
import {
  PaginationItem,
  Pagination as UIPagination,
  PaginationLink,
  PaginationContent,
  PaginationEllipsis,
} from "@components/ui/pagination";
import { getPaginationPages } from "@root/lib/getPaginationPages/getPaginationPages";
import { PaginationProps } from "./types";

export const Pagination = ({
  pagesCount,
  currentPage,
  onPageChange,
  className,
  viewOptions,
  viewOptionValue,
  onChangeViewOption,
}: PaginationProps) => {
  const paginationPages = getPaginationPages(pagesCount, currentPage);
  const selectOptions = (viewOptions ?? []).map((option) => ({
    label: option.label,
    value: String(option.value),
  }));
  const defaultViewOption = selectOptions[0]?.value ?? "";
  const [uncontrolledViewOption, setUncontrolledViewOption] = useState(defaultViewOption);
  const selectedViewOption =
    viewOptionValue !== undefined ? String(viewOptionValue) : uncontrolledViewOption;

  const handleViewOptionChange = (value: string) => {
    if (viewOptionValue === undefined) {
      setUncontrolledViewOption(value);
    }

    onChangeViewOption?.(Number(value));
  };

  return (
    <UIPagination className={cn("flex items-center w-full bg-gray-8 dark:bg-gray-2", className)}>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronRightIcon className="rotate-180" />
          </Button>
        </PaginationItem>
        {paginationPages.map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                size="xs"
                isActive={currentPage === item}
                className={cn(
                  "cursor-pointer shadow-none border-none hover:bg-gray-7 rounded-[4px] dark:hover:bg-gray-3",
                  currentPage === item && "text-red font-bold bg-gray-7 dark:bg-gray-3",
                )}
                onClick={() => onPageChange(Number(item))}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= pagesCount}
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
      <Select
        list={selectOptions}
        label=""
        side="top"
        align="end"
        className="flex w-15 **:data-[slot=select-trigger]:border-none **:data-[slot=select-trigger]:text-xs **:data-[slot=select-trigger]:px-2 **:data-[slot=select-trigger]:py-1 **:data-[slot=select-trigger]:h-auto **:data-[slot=select-trigger]:min-h-0 **:data-[slot=select-trigger]:shadow-none"
        popupClassName="min-w-0 -translate-y-px shadow-xs"
        itemClassName="px-2 py-1 text-xs"
        value={selectedViewOption}
        onValueChange={handleViewOptionChange}
      />
    </UIPagination>
  );
};
