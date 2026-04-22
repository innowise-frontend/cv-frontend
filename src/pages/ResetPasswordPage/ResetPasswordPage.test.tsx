import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RenderWithQueryClient } from "@root/lib/testUtils";
import { ResetPasswordPage } from "./ResetPasswordPage";
import type { ReactNode } from "react";

const resetPasswordMock =
  vi.fn<(token: string, newPassword: string, confirmPassword: string) => Promise<void>>();

const navigateMock = vi.fn();

vi.mock("@services/auth/password", () => ({
  resetPassword: (token: string, newPassword: string, confirmPassword: string): Promise<void> =>
    resetPasswordMock(token, newPassword, confirmPassword),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a href="#">{children}</a>,
  useNavigate: () => navigateMock,
  useSearch: () => ({ token: "test-token" }),
}));

function renderPage() {
  return render(
    <RenderWithQueryClient>
      <ResetPasswordPage />
    </RenderWithQueryClient>,
  );
}

describe("ResetPasswordPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("disables submit until form is valid", async () => {
    const user = userEvent.setup();
    renderPage();

    const submit = screen.getByRole("button", { name: "Submit" });
    expect(submit).toBeDisabled();

    await user.type(screen.getByPlaceholderText("New password"), "123");
    await user.type(screen.getByPlaceholderText("Confirm password"), "123");
    expect(submit).toBeDisabled();

    await user.clear(screen.getByPlaceholderText("New password"));
    await user.type(screen.getByPlaceholderText("New password"), "123456");
    await user.clear(screen.getByPlaceholderText("Confirm password"));
    await user.type(screen.getByPlaceholderText("Confirm password"), "123456");

    expect(submit).toBeEnabled();
  });

  it("submits resetPassword with token and navigates on success", async () => {
    const user = userEvent.setup();
    resetPasswordMock.mockResolvedValueOnce(undefined);
    renderPage();

    await user.type(screen.getByPlaceholderText("New password"), "123456");
    await user.type(screen.getByPlaceholderText("Confirm password"), "123456");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(resetPasswordMock).toHaveBeenCalledTimes(1));
    expect(resetPasswordMock).toHaveBeenCalledWith("test-token", "123456", "123456");

    await waitFor(() => expect(navigateMock).toHaveBeenCalledTimes(1));
    expect(navigateMock).toHaveBeenCalledWith({ to: "/auth", search: { mode: "login" } });
  });

  it("shows mismatch error and does not submit when passwords differ", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText("New password"), "123456");
    await user.type(screen.getByPlaceholderText("Confirm password"), "123457");

    expect(await screen.findByText("Passwords don't match")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
    expect(resetPasswordMock).not.toHaveBeenCalled();
  });
});
