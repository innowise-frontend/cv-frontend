import { useCallback, useEffect, useRef } from "react";

const DEBOUNCE_TIMEOUT = 300;

export const useDebounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
): T => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedFunction = useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, DEBOUNCE_TIMEOUT);
  }, []) as T;

  return debouncedFunction;
};
