export type TableColumnHeaderTable = {
  getRowModel: () => { rows: unknown[] };
};

export interface TableColumnHeaderProps {
  title: string;
  sortOrder?: "ASC" | "DESC";
  onChangeSorting?: () => void;
  table?: TableColumnHeaderTable;
}
