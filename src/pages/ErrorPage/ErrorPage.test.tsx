import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import i18n from "@root/i18n/i18n";
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

    const button = screen.getByRole("button", { name: i18n.t("page.error.retry") });
    await user.click(button);

    expect(mockHistoryBack).toHaveBeenCalledOnce();
  });
});
