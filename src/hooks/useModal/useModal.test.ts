import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useModal } from "./useModal";

describe("useModal", () => {
  it("should be closed by default", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
  });

  it("should open modal when openModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should close modal when closeModal is called", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle open state across multiple actions", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.openModal();
    });
    expect(result.current.isOpen).toBe(true);
  });
});
