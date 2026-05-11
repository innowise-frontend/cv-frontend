import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Sonner } from "./Sonner";

const toasterSpy = vi.hoisted(() => vi.fn());

vi.mock("@components/ui/sonner", () => ({
  Toaster: (props: {
    position?: string;
    toastOptions?: { classNames?: Record<string, string> };
  }) => {
    toasterSpy(props);

    return <div data-testid="toaster-mock" />;
  },
}));

describe("Sonner", () => {
  beforeEach(() => {
    toasterSpy.mockClear();
  });

  it("should render the UI Toaster", () => {
    const { getByTestId } = render(<Sonner />);

    expect(getByTestId("toaster-mock")).toBeInTheDocument();
    expect(toasterSpy).toHaveBeenCalledTimes(1);
  });

  it("should position toasts at the top center", () => {
    render(<Sonner />);

    expect(toasterSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        position: "top-center",
      }),
    );
  });

  it("should apply custom toast class names for errors and descriptions", () => {
    render(<Sonner />);

    expect(toasterSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        toastOptions: expect.objectContaining({
          classNames: expect.objectContaining({
            success: "z-50 backdrop-blur-sm rounded-md",
            error: "z-50 border-red! text-red! backdrop-blur-sm rounded-md!",
            description: "text-gray-2",
          }),
        }),
      }),
    );
  });
});
