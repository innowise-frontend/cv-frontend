export interface TableColumnHeaderProps {
  title: string;
  sortOrder?: "ASC" | "DESC";
  onChangeSorting?: () => void;
}
