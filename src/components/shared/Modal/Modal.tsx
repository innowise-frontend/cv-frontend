import { createContext, useContext, useEffect, useRef } from "react";
import CloseIcon from "@assets/icon/CloseIcon.svg?react";
import { Button } from "@components/shared";
import { useModal } from "@root/hooks";
import { cn } from "@root/lib";

const ModalContext = createContext<ReturnType<typeof useModal> | null>(null);

const useModalContext = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    throw new Error("Modal.* components must be used inside <Modal>");
  }

  return ctx;
};

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return <ModalContext value={{ isOpen, openModal, closeModal }}>{children}</ModalContext>;
};

const ModalTrigger = ({
  children,
  className = "",
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { openModal } = useModalContext();

  return (
    <Button {...props} className={className} onClick={openModal}>
      {children}
    </Button>
  );
};

const ModalContent = ({
  children,
  ref,
  className = "",
  ...props
}: React.ComponentProps<"dialog">) => {
  const { isOpen, closeModal } = useModalContext();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (typeof ref === "function") ref(dialogRef.current);
    else if (ref) ref.current = dialogRef.current;
  }, [ref]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("scroll-hidden");
    }

    return () => document.body.classList.remove("scroll-hidden");
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      closeModal();
    }
  };

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    event.preventDefault();
    closeModal();
  };

  return (
    <dialog
      {...props}
      onClick={handleBackdropClick}
      onCancel={handleCancel}
      className={cn(
        "fixed top-1/2 left-1/2 m-0 min-w-155 max-w-215 min-h-50 max-h-131 -translate-x-1/2 -translate-y-1/2 bg-gray-8 px-6 py-4 shadow-2xl will-change-transform will-change-opacity transition-[opacity,transform] duration-300 ease-out dark:bg-gray-2 backdrop:bg-gray/50",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className,
      )}
      ref={dialogRef}
    >
      {children}
    </dialog>
  );
};

const ModalClose = ({ children }: { children?: React.ReactNode }) => {
  const { closeModal } = useModalContext();

  return (
    <Button
      onClick={closeModal}
      variant="ghost"
      className="absolute top-3 right-5 h-7.5 w-7.5 rounded-full p-0"
    >
      {children ?? <CloseIcon />}
    </Button>
  );
};

const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="flex items-center justify-between">
      <h2 className="text-lg font-bold">{children}</h2>
    </header>
  );
};

const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-6.5">{children}</div>;
};

const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-end gap-6 fixed bottom-3 right-5">{children}</div>
  );
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Close = ModalClose;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export { Modal };
