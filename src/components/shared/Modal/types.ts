export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  showOverlay?: boolean;
  closeModal: () => void;
  actions: React.ReactNode;
  title: string;
}
