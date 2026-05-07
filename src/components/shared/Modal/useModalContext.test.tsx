import { render, screen, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ModalContext, useModalContext } from "./useModalContext";

describe("useModalContext", () => {
  it("throws when used outside ModalContext provider", () => {
    expect(() => {
      renderHook(() => useModalContext());
    }).toThrow(/inside <Modal>/);
  });

  it("returns context value when wrapped in ModalContext provider", () => {
    const value = {
      isOpen: false,
      openModal: vi.fn(),
      closeModal: vi.fn(),
    };

    const { result } = renderHook(() => useModalContext(), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      ),
    });

    expect(result.current).toBe(value);
  });
});

describe("ModalContext provider wiring", () => {
  it("supplies context to children", () => {
    const value = {
      isOpen: true,
      openModal: vi.fn(),
      closeModal: vi.fn(),
    };

    function Child() {
      const ctx = useModalContext();

      return <span data-testid="open">{String(ctx.isOpen)}</span>;
    }

    render(
      <ModalContext.Provider value={value}>
        <Child />
      </ModalContext.Provider>,
    );

    expect(screen.getByTestId("open")).toHaveTextContent("true");
  });
});
