export interface TableActionsProps {
  userId: string;
  actions: {
    label: string | React.ReactNode;
    onClick?: (userId: string) => void;
  }[];
  dropdownKeepMounted?: boolean;
}
