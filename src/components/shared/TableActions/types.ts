export interface TableActionsProps {
  userId: string;
  actions: {
    label: string;
    onClick: (userId: string) => void;
  }[];
}
