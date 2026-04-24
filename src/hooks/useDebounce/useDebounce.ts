import { useMemo } from "react";
import { debounce } from "@root/lib";

const DEBOUNCE_TIMEOUT = 300;

export const useDebounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  callback: T,
): T => {
  const debouncedFunction = useMemo(() => debounce(callback, DEBOUNCE_TIMEOUT), [callback]);

  return debouncedFunction;
};
