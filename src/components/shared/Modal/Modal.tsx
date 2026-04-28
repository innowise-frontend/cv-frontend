import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@assets/icon/CloseIcon.svg?react";
import { useClickOutside } from "@root/hooks";
import { ModalProps } from "./types";
import { Button } from "../Button/Button";

export const Modal = ({ inProp, children, showOverlay = true, closeModal }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inProp) {
      document.body.classList.add("scroll-hidden");
    }

    return () => document.body.classList.remove("scroll-hidden");
  }, [inProp]);

  useClickOutside(modalRef, () => {
    if (inProp) {
      closeModal();
    }
  });

  return createPortal(
    <div
      className={`fixed inset-0 z-50 h-screen flex items-center justify-center transition-opacity duration-250 ${
        inProp ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {showOverlay && (
        <div
          className={`absolute w-full h-full bg-black/50 transition-opacity duration-250 ${
            inProp ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <div
        ref={modalRef}
        className={`fixed bg-gray-8 min-w-155 max-w-215 min-h-50 max-h-131 px-6 py-4 transition-all duration-250 ${
          inProp ? "translate-y-0 opacity-100 scale-100" : "translate-y-2 opacity-0 scale-95"
        }`}
      >
        <Button onClick={closeModal} variant="ghost" className="absolute top-0 right-5">
          <CloseIcon width={12} height={12} />
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
