import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ErrorPage } from "./ErrorPage";

const mockHistoryBack = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({
    history: {
      back: mockHistoryBack,
    },
  }),
}));

describe("ErrorPage", () => {
  it("navigates back when button is clicked", async () => {
    const user = userEvent.setup();
    render(<ErrorPage error="test error" />);

    const button = screen.getByRole("button", { name: "GO BACK" });
    await user.click(button);

    expect(mockHistoryBack).toHaveBeenCalledOnce();
  });
});
