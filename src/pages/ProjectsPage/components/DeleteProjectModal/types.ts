export interface DeleteProjectModalProps {
  projectId: string;
  name: string;
  onConfirm?: (projectId: string, helpers: { close: () => void }) => void;
  isSubmitting?: boolean;
  headerTitle?: string;
  bodyText?: string;
  confirmLabel?: string;
}
