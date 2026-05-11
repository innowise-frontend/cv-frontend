import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useHandleSearch } from "./useHandleSearch";

const useDebounceMock = vi.hoisted(() => vi.fn());

vi.mock("../useDebounce/useDebounce", () => ({
  useDebounce: (...args: unknown[]) => useDebounceMock(...args),
}));

describe("useHandleSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not navigate when value is same as current search", () => {
    const onSearchChange = vi.fn();
    useDebounceMock.mockImplementation((callback) => callback);

    const { result } = renderHook(() => useHandleSearch({ searchValue: "anna", onSearchChange }));
    result.current.onSearch("anna");

    expect(onSearchChange).not.toHaveBeenCalled();
  });

  it("should clear search param when empty value is provided", () => {
    const onSearchChange = vi.fn();
    useDebounceMock.mockImplementation((callback) => callback);

    const { result } = renderHook(() => useHandleSearch({ searchValue: "anna", onSearchChange }));
    result.current.onSearch("");

    expect(onSearchChange).toHaveBeenCalledWith("");
  });

  it("should set search param when non-empty value is provided", () => {
    const onSearchChange = vi.fn();
    useDebounceMock.mockImplementation((callback) => callback);

    const { result } = renderHook(() => useHandleSearch({ searchValue: "", onSearchChange }));
    result.current.onSearch("john");

    expect(onSearchChange).toHaveBeenCalledWith("john");
  });

  it("should pass search handler into useDebounce", () => {
    const onSearchChange = vi.fn();
    useDebounceMock.mockImplementation((callback) => callback);

    renderHook(() => useHandleSearch({ searchValue: "", onSearchChange }));

    expect(useDebounceMock).toHaveBeenCalled();
    const [handlerArg] = useDebounceMock.mock.calls.at(-1) as [(value: string) => void];
    expect(handlerArg).toEqual(expect.any(Function));
  });
});
