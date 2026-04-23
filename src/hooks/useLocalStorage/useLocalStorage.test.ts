import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should initialize with localStorage value when present", () => {
    localStorage.setItem("count", JSON.stringify(5));

    const { result } = renderHook(() => useLocalStorage("count", 0));

    expect(result.current[0]).toBe(5);
  });

  it("should initialize with initial value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("theme", "light"));

    expect(result.current[0]).toBe("light");
  });

  it("should set value directly and persist to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("name", "guest"));

    act(() => {
      result.current[1]("john");
    });

    expect(result.current[0]).toBe("john");
    expect(localStorage.getItem("name")).toBe(JSON.stringify("john"));
  });

  it("should set value from updater function and persist", () => {
    const { result } = renderHook(() => useLocalStorage("counter", 1));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(localStorage.getItem("counter")).toBe(JSON.stringify(2));
  });

  it("should fallback to initial value when stored JSON is invalid", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    localStorage.setItem("broken", "{invalid");

    const { result } = renderHook(() => useLocalStorage("broken", "safe"));

    expect(result.current[0]).toBe("safe");
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
