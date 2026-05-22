export interface PaginationProps {
  pagesCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  viewOptions?: {
    label: string;
    value: number;
  }[];
  viewOptionValue?: number;
  onChangeViewOption?: (value: number) => void;
}
