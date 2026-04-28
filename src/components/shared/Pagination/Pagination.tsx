import { cn } from "tailwind-variants";
import ChevronRightIcon from "@assets/icon/ChevronRightIcon.svg?react";
import { Button } from "@components/shared";
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
  // viewOptions,
}: PaginationProps) => {
  const paginationPages = getPaginationPages(pagesCount, currentPage);

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
    </UIPagination>
  );
};
