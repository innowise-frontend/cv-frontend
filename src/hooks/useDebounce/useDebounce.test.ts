import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  it("should debounce callback with default timeout", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback));

    result.current("hello");
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(299);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledWith("hello");
  });

  it("should keep stable function for same callback reference", () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(({ cb }: { cb: typeof callback }) => useDebounce(cb), {
      initialProps: { cb: callback },
    });

    const firstResult = result.current;
    rerender({ cb: callback });

    expect(result.current).toBe(firstResult);
  });

  it("should keep function stable and call latest callback when callback changes", () => {
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();

    const { result, rerender } = renderHook(
      ({ cb }: { cb: typeof firstCallback }) => useDebounce(cb),
      {
        initialProps: { cb: firstCallback },
      },
    );

    const stableDebounced = result.current;

    rerender({ cb: secondCallback });
    expect(result.current).toBe(stableDebounced);

    result.current("next");
    vi.advanceTimersByTime(300);
    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledWith("next");
  });
});
