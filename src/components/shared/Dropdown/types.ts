export interface DropdownItem {
  label: string | React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  options: DropdownItem[];
  keepMounted?: boolean;
}
