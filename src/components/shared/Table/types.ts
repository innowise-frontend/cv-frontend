import { ColumnDef, RowData } from "@tanstack/react-table";

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
    onClick: (userId: string) => void;
  }[];
  viewOptions?: {
    label: string;
    value: number;
  }[];
  onChangeViewOption?: (value: number) => void;
  onSort?: () => void;
}

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    onSort?: () => void;
    currentSort?: "ASC" | "DESC";
    actions?: {
      label: string;
      onClick: (userId: string) => void;
    }[];
  }
}
