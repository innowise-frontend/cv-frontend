import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@assets/icon/CloseIcon.svg?react";
import { Button } from "@components/shared";
import { useModal } from "@root/hooks";
import { cn } from "@root/lib";
import { ModalContext, useModalContext } from "./useModalContext";
import type { ModalComponentProps, ModalContentProps } from "./types";

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

const ModalContent = ({ children, ref, className = "", onCancel, ...props }: ModalContentProps) => {
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

    if (!isOpen && dialog.open) {
      onCancel?.();
      dialog.close();
    }
  }, [isOpen, onCancel]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("scroll-hidden");
    }

    return () => document.body.classList.remove("scroll-hidden");
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      onCancel?.();
      closeModal();
    }
  };

  const handleDialogCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onCancel?.();
    closeModal();

    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  };

  return createPortal(
    <>
      {isOpen && <div className="fixed inset-0 bg-gray/50 z-50" onClick={closeModal} />}
      <dialog
        {...props}
        onCancel={handleDialogCancel}
        onClick={handleBackdropClick}
        className={cn(
          "fixed top-1/2 left-1/2 m-0 min-w-155 max-w-215 min-h-50 -translate-x-1/2 -translate-y-1/2 overflow-visible bg-gray-8 px-6 py-4 shadow-2xl will-change-transform will-change-opacity transition-[opacity,transform] duration-300 ease-out dark:bg-gray-2 backdrop:bg-gray/50 z-100",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className,
        )}
        ref={dialogRef}
      >
        {children}
      </dialog>
    </>,
    document.body,
  );
};

const ModalClose = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
} & React.ComponentProps<typeof Button>) => {
  const { closeModal } = useModalContext();

  return (
    <Button onClick={closeModal} {...props}>
      {children ?? <CloseIcon />}
    </Button>
  );
};

const ModalHeader = ({ children, className = "" }: ModalComponentProps) => {
  return (
    <header className={cn("flex items-center justify-between", className)}>
      <h2 className="text-lg font-bold">{children}</h2>
      <Modal.Close className="ml-auto h-7.5 w-7.5 rounded-full p-0" />
    </header>
  );
};

const ModalBody = ({ children, className = "" }: ModalComponentProps) => {
  return <div className={cn("py-6.5", className)}>{children}</div>;
};

const ModalFooter = ({ children, className = "" }: ModalComponentProps) => {
  return <div className={cn("flex items-center justify-end gap-6", className)}>{children}</div>;
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Close = ModalClose;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export { Modal };
