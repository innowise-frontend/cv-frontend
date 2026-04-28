import { useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handleOnClickOutside: () => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        handleOnClickOutside();
      }

      const target = event.target;

      if (!ref.current || !(target instanceof Node) || ref.current.contains(target)) {
        return;
      }

      handleOnClickOutside();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
      document.removeEventListener("keydown", listener);
    };
  }, [ref, handleOnClickOutside]);
};
