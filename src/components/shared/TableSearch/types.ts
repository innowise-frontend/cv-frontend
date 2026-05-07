export interface TableSearchProps {
  action: React.ReactNode | null;
  searchValue: string;
  onSearch: (value: string) => void;
}
