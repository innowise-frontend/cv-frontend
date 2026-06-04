import { ColumnDef, Row, RowData } from "@tanstack/react-table";

export interface TableProps<TData> {
  data: TData[];

  // TanStack tables can contain columns with different accessor value types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  pagesAmount: number;
  currentPage: number;
  currentSort: "ASC" | "DESC";
  onChangePage: (page: number) => void;
  actions?: {
    label: string;
    onClick: (params: string) => void;
  }[];
  viewOptions?: {
    label: string;
    value: number;
  }[];
  currentViewOption?: number;
  onChangeViewOption?: (value: number) => void;
  onSort?: (sortBy?: string) => void;
  currentSortBy?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  renderSubRow?: (row: Row<TData>) => React.ReactNode;
}

export type ColumnAlign = "left" | "center" | "right";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onSort?: (sortBy?: string) => void;
    currentSort?: "ASC" | "DESC";
    currentSortBy?: string;
    actions?: {
      label: string;
      onClick: (params: string) => void;
    }[];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: ColumnAlign;
  }
}
