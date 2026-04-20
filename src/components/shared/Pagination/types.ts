export interface PaginationProps {
  pagesCount: number;
  currentPage: number;
  onPreviousPage: () => void;
  onNextPage: (page: number) => void;
  onPageChange: (page: number) => void;
  className?: string;
}
