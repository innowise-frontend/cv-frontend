import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RenderWithQueryClient, renderWithFileRoutes } from "@root/lib/testUtils";
import { ForgotPasswordPage } from "./ForgotPasswordPage";

const forgotPasswordMock = vi.fn<(email: string) => Promise<void>>();
const toastError = vi.fn();

vi.mock("@root/services/auth/forgotPassword/forgotPassword", () => ({
  forgotPassword: (email: string): Promise<void> => forgotPasswordMock(email),
}));

vi.mock("sonner", () => ({
  toast: {
    error: (...args: unknown[]) => toastError(...args),
  },
}));

async function renderPage() {
  return renderWithFileRoutes(
    <RenderWithQueryClient>
      <ForgotPasswordPage />
    </RenderWithQueryClient>,
  );
}

describe("ForgotPasswordPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form correctly", async () => {
    await renderPage();

    expect(screen.getByText("Forgot password")).toBeInTheDocument();
    expect(
      screen.getByText("We will send you an email with further instructions"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset password/i })).toBeInTheDocument();
  });

  it("disables submit button when email is empty", async () => {
    await renderPage();

    const button = screen.getByRole("button", { name: /reset password/i });
    expect(button).toBeDisabled();
  });

  it("calls mutation on submit (success case)", async () => {
    const user = userEvent.setup();
    forgotPasswordMock.mockResolvedValueOnce(undefined);

    await renderPage();

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    fireEvent.submit(screen.getByRole("button", { name: /reset password/i }).closest("form")!);

    await waitFor(() => expect(forgotPasswordMock).toHaveBeenCalledTimes(1));
    expect(forgotPasswordMock).toHaveBeenCalledWith("");
  });

  it("shows toast error when request fails", async () => {
    const user = userEvent.setup();
    forgotPasswordMock.mockRejectedValueOnce(new Error("Not found"));

    await renderPage();

    await user.type(screen.getByPlaceholderText("Email"), "fail@test.com");
    fireEvent.submit(screen.getByRole("button", { name: /reset password/i }).closest("form")!);

    await waitFor(() => expect(toastError).toHaveBeenCalledWith("Email doesn't exist."));
  });

  it('navigates to "/auth" when "cancel" is clicked', async () => {
    await renderPage();

    const cancelLink = screen.getByRole("link", { name: "Cancel" });
    expect(cancelLink).toHaveAttribute("href", "/auth?mode=login");
  });
});
