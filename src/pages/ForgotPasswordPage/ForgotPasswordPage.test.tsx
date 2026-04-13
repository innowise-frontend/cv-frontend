import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import type { ReactNode } from "react";

const forgotPasswordMock = vi.fn<(email: string) => Promise<void>>();

vi.mock("@services/auth/password", () => ({
  forgotPassword: (email: string): Promise<void> => forgotPasswordMock(email),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
}));

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ForgotPasswordPage />
    </QueryClientProvider>,
  );
}

describe("ForgotPasswordPage", () => {
  it("renders form correctly", () => {
    renderPage();

    expect(screen.getByText("Forgot password")).toBeInTheDocument();
    expect(
      screen.getByText("We will send you an email with further instructions"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset password/i })).toBeInTheDocument();
  });

  it("disables submit button when email is empty", () => {
    renderPage();

    const button = screen.getByRole("button", { name: /reset password/i });
    expect(button).toBeDisabled();
  });

  it("calls mutation on submit (success case)", async () => {
    const user = userEvent.setup();
    forgotPasswordMock.mockResolvedValueOnce(undefined);

    renderPage();

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.click(screen.getByRole("button", { name: /reset password/i }));

    await waitFor(() => expect(forgotPasswordMock).toHaveBeenCalledTimes(1));
    expect(forgotPasswordMock).toHaveBeenCalledWith("test@test.com");
  });

  it("shows error when email does not exist", async () => {
    const user = userEvent.setup();
    forgotPasswordMock.mockRejectedValueOnce(new Error("Not found"));

    renderPage();

    await user.type(screen.getByPlaceholderText("Email"), "fail@test.com");
    await user.click(screen.getByRole("button", { name: /reset password/i }));

    expect(await screen.findByText("Email doesn't exist.")).toBeInTheDocument();
  });

  it('navigates to "/signup" when "cancel" is clicked', async () => {
    const user = userEvent.setup();
    renderPage();

    const cancelLink = screen.getByRole("link", { name: "Cancel" });
    expect(cancelLink).toHaveAttribute("href", "/signup");

    await user.click(cancelLink);
    expect(cancelLink).toHaveAttribute("href", "/signup");
  });
});
