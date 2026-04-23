import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

const debounceMock = vi.hoisted(() => vi.fn());

vi.mock("@root/lib", () => ({
  debounce: (...args: unknown[]) => debounceMock(...args),
}));

describe("useDebounce", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create debounced function with default timeout", () => {
    const callback = vi.fn();
    const debouncedCallback = vi.fn();
    debounceMock.mockReturnValue(debouncedCallback);

    const { result } = renderHook(() => useDebounce(callback));

    expect(debounceMock).toHaveBeenCalledWith(callback, 300);
    expect(result.current).toBe(debouncedCallback);
  });

  it("should memoize debounced function for same callback reference", () => {
    const callback = vi.fn();
    const debouncedCallback = vi.fn();
    debounceMock.mockReturnValue(debouncedCallback);

    const { result, rerender } = renderHook(({ cb }: { cb: typeof callback }) => useDebounce(cb), {
      initialProps: { cb: callback },
    });

    const firstResult = result.current;
    rerender({ cb: callback });

    expect(debounceMock).toHaveBeenCalledWith(callback, 300);
    expect(result.current).toBe(firstResult);
  });

  it("should recreate debounced function when callback reference changes", () => {
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();
    const firstDebounced = vi.fn();
    const secondDebounced = vi.fn();
    debounceMock.mockReturnValueOnce(firstDebounced).mockReturnValueOnce(secondDebounced);

    const { result, rerender } = renderHook(
      ({ cb }: { cb: typeof firstCallback }) => useDebounce(cb),
      {
        initialProps: { cb: firstCallback },
      },
    );

    expect(result.current).toBe(firstDebounced);

    rerender({ cb: secondCallback });

    expect(debounceMock).toHaveBeenCalledWith(firstCallback, 300);
    expect(debounceMock).toHaveBeenCalledWith(secondCallback, 300);
    expect(result.current).toBe(secondDebounced);
  });
});
