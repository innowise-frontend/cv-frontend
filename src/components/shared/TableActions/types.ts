export type TableActionsVariant = "dropdown" | "profileLink";

export interface TableActionsProps {
  userId: string;
  actions: {
    label: string | React.ReactNode;
    onClick?: (userId: string) => void;
  }[];
  variant?: TableActionsVariant;
  dropdownKeepMounted?: boolean;
}
