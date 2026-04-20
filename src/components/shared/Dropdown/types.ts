export interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  options: DropdownItem[];
}
