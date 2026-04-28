import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@assets/icon/CloseIcon.svg?react";
import { Button } from "@components/shared";
import { useClickOutside } from "@root/hooks";
import { cn } from "@root/lib";
import { ModalProps } from "./types";

export const Modal = ({
  children,
  showOverlay = true,
  isOpen,
  closeModal,
  actions,
  title,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("scroll-hidden");
    }

    return () => document.body.classList.remove("scroll-hidden");
  }, [isOpen]);

  useClickOutside(modalRef, () => {
    if (isOpen) {
      closeModal();
    }
  });

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50 h-screen flex items-center justify-center transition-opacity duration-250",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
    >
      {showOverlay && (
        <div
          className={cn(
            "absolute w-full h-full bg-black/50 transition-opacity duration-250",
            isOpen ? "block" : "hidden",
          )}
        />
      )}
      <div
        ref={modalRef}
        className={cn(
          "fixed bg-gray-8 min-w-155 max-w-215 min-h-50 max-h-131 px-6 py-4 transition-all duration-250 dark:bg-gray-2",
          isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-2 opacity-0 scale-95",
        )}
      >
        <ModalHeader closeModal={closeModal} title={title} />
        {children}
        <ModalFooter closeModal={closeModal}>{actions}</ModalFooter>
      </div>
    </div>,
    document.body,
  );
};

function ModalHeader({ closeModal, title }: { title: string; closeModal: () => void }) {
  return (
    <div className="flex items-center justify-between pb-6.5">
      <h2 className="text-lg font-bold">{title}</h2>
      <Button onClick={closeModal} variant="ghost" className="absolute top-0 right-5">
        <CloseIcon width={12} height={12} />
      </Button>
    </div>
  );
}

function ModalFooter({ children }: { children: React.ReactNode; closeModal: () => void }) {
  return (
    <div className="flex items-center justify-end gap-6 fixed bottom-3 right-5 pt-6.5">
      {children}
    </div>
  );
}
