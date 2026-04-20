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

export const Pagination = ({
  pagesCount,
  currentPage,
  onPreviousPage,
  onNextPage,
  onPageChange,
  className,
}: PaginationProps) => {
  const getPaginationPages = () => {
    const items = [];

    if (pagesCount <= 5) {
      for (let i = 0; i < pagesCount; i++) {
        items.push(i);
      }
    }

    return items;
  };

  return (
    <UIPagination className={cn("flex items-center w-full", className)}>
      <PaginationContent>
        <PaginationItem>
          <Button variant="ghost" onClick={onPreviousPage} disabled={currentPage === 0}>
            <ChevronRightIcon className="rotate-180" />
          </Button>
        </PaginationItem>
        {getPaginationPages().map((item) => (
          <PaginationItem key={item + 1}>
            <PaginationLink
              size="xs"
              isActive={currentPage === item}
              className={cn(
                "cursor-pointer shadow-none border-none hover:bg-gray-7 rounded-[4px] dark:hover:bg-gray-3",
                currentPage === item && "text-red font-bold bg-gray-7 dark:bg-gray-3",
              )}
              onClick={() => onPageChange(item)}
            >
              {item + 1}
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
    </UIPagination>
  );
};
