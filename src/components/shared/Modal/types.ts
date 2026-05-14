export interface ModalComponentProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalContentProps extends Omit<React.ComponentProps<"dialog">, "onCancel"> {
  onCancel?: () => void;
}
