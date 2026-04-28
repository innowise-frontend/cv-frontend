export interface DropdownItem {
  label: string;
  onClick: (params: string) => void;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  options: DropdownItem[];
  params?: string;
}
