import { ColumnDef } from "@tanstack/react-table";

export interface TableProps<TData> {
  data: TData[];

  // TanStack tables can contain columns with different accessor value types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  viewOptions: {
    label: string;
    value: number;
  }[];
  onChangeViewOption: (value: number) => void;
}
