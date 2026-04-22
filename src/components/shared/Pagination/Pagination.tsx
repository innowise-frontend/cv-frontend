import { cn } from "tailwind-variants";
import ChevronRightIcon from "@assets/icon/ChevronRightIcon.svg?react";
import { Button } from "@components/shared";
import {
  PaginationItem,
  Pagination as UIPagination,
  PaginationLink,
  PaginationContent,
} from "@components/ui/pagination";
import { PaginationProps } from "./types";
import { Select } from "../Select/Select";

export const Pagination = ({
  pagesCount,
  currentPage,
  onPreviousPage,
  onNextPage,
  onPageChange,
  viewOptions,
  onChangeViewOption,
  className,
}: PaginationProps) => {
  const paginationPages = Array.from({ length: pagesCount }, (_, index) => index + 1);

  return (
    <UIPagination className={cn("flex items-center w-full bg-gray-8 dark:bg-gray-2", className)}>
      <PaginationContent>
        <PaginationItem>
          <Button variant="ghost" onClick={onPreviousPage} disabled={currentPage === 0}>
            <ChevronRightIcon className="rotate-180" />
          </Button>
        </PaginationItem>
        {paginationPages.map((item) => (
          <PaginationItem key={item}>
            <PaginationLink
              size="xs"
              isActive={currentPage === item - 1}
              className={cn(
                "cursor-pointer shadow-none border-none hover:bg-gray-7 rounded-[4px] dark:hover:bg-gray-3",
                currentPage === item - 1 && "text-red font-bold bg-gray-7 dark:bg-gray-3",
              )}
              onClick={() => onPageChange(item - 1)}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant="ghost"
            onClick={() => onNextPage(currentPage + 1)}
            disabled={currentPage === pagesCount - 1}
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
      <Select options={viewOptions} onValueChange={onChangeViewOption} />
    </UIPagination>
  );
};
