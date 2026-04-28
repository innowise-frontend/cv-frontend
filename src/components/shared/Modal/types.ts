export interface ModalProps {
  inProp: boolean;
  children: React.ReactNode;
  showOverlay?: boolean;
  closeModal: () => void;
}
