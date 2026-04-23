import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useHandleSearch } from "./useHandleSearch";

const useSearchMock = vi.hoisted(() => vi.fn());
const useNavigateMock = vi.hoisted(() => vi.fn());
const useDebounceMock = vi.hoisted(() => vi.fn());
const navigateMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  useSearch: (...args: unknown[]) => useSearchMock(...args),
  useNavigate: (...args: unknown[]) => useNavigateMock(...args),
}));

vi.mock("../useDebounce/useDebounce", () => ({
  useDebounce: (...args: unknown[]) => useDebounceMock(...args),
}));

describe("useHandleSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not navigate when value is same as current search", () => {
    useSearchMock.mockReturnValue({ search: "anna" });
    useNavigateMock.mockReturnValue(navigateMock);
    useDebounceMock.mockImplementation((callback) => callback);

    const { result } = renderHook(() => useHandleSearch());
    result.current.onSearch("anna");

    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("should clear search param when empty value is provided", () => {
    useSearchMock.mockReturnValue({ search: "anna" });
    useNavigateMock.mockReturnValue(navigateMock);
    useDebounceMock.mockImplementation((callback) => callback);

    const { result } = renderHook(() => useHandleSearch());
    result.current.onSearch("");

    expect(navigateMock).toHaveBeenCalledWith({
      search: expect.any(Function),
      replace: true,
    });

    const [navigateArg] = navigateMock.mock.calls[0] as [{ search: (prev: object) => object }];
    expect(navigateArg.search({ page: 2, search: "anna" })).toEqual({ page: 2, search: undefined });
  });

  it("should set search param when non-empty value is provided", () => {
    useSearchMock.mockReturnValue({ search: "" });
    useNavigateMock.mockReturnValue(navigateMock);
    useDebounceMock.mockImplementation((callback) => callback);

    const { result } = renderHook(() => useHandleSearch());
    result.current.onSearch("john");

    expect(navigateMock).toHaveBeenCalledWith({
      search: expect.any(Function),
      replace: true,
    });

    const [navigateArg] = navigateMock.mock.calls[0] as [{ search: (prev: object) => object }];
    expect(navigateArg.search({ page: 1 })).toEqual({ page: 1, search: "john" });
  });

  it("should pass search handler into useDebounce", () => {
    useSearchMock.mockReturnValue({ search: "" });
    useNavigateMock.mockReturnValue(navigateMock);
    useDebounceMock.mockImplementation((callback) => callback);

    renderHook(() => useHandleSearch());

    expect(useDebounceMock).toHaveBeenCalled();
    const [handlerArg] = useDebounceMock.mock.calls.at(-1) as [(value: string) => void];
    expect(handlerArg).toEqual(expect.any(Function));
  });
});
