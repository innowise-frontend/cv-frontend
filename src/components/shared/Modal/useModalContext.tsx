import { createContext, useContext } from "react";
import { useModal } from "@root/hooks";

export const ModalContext = createContext<ReturnType<typeof useModal> | null>(null);

export const useModalContext = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    throw new Error("Modal.* components must be used inside <Modal>");
  }

  return ctx;
};
