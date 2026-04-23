import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RenderWithQueryClient } from "@root/lib/testUtils";
import { ChangePassword } from "./ChangePassword";

const changePasswordMock = vi.fn();
const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();

vi.mock("@services/auth", () => ({
  changePassword: (...args: unknown[]) => changePasswordMock(...args),
}));

vi.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => toastSuccessMock(...args),
    error: (...args: unknown[]) => toastErrorMock(...args),
  },
}));

function renderChangePassword() {
  return render(
    <RenderWithQueryClient>
      <ChangePassword />
    </RenderWithQueryClient>,
  );
}

describe("ChangePassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("access_token", JSON.stringify("token-123"));
  });

  it("renders three password inputs and submit button", () => {
    renderChangePassword();

    expect(screen.getAllByPlaceholderText(/password/i)).toHaveLength(3);
    expect(screen.getByRole("button", { name: /change/i })).toBeInTheDocument();
  });

  it("keeps submit button disabled on initial render", () => {
    renderChangePassword();

    expect(screen.getByRole("button", { name: /change/i })).toBeDisabled();
  });

  it("toggles password visibility from the first input control", async () => {
    const user = userEvent.setup();
    renderChangePassword();
    const [firstPasswordInput] = screen.getAllByPlaceholderText(/password/i);
    const [firstToggle] = screen.getAllByRole("button", { name: /toggle password visibility/i });

    expect(firstPasswordInput).toHaveAttribute("type", "password");
    await user.click(firstToggle);
    expect(firstPasswordInput).toHaveAttribute("type", "text");
  });

  it("submits valid form and shows success toast", async () => {
    const user = userEvent.setup();
    changePasswordMock.mockResolvedValueOnce(undefined);
    renderChangePassword();
    const [oldPasswordInput, newPasswordInput, confirmPasswordInput] =
      screen.getAllByPlaceholderText(/password/i);

    await user.type(oldPasswordInput, "oldpass");
    await user.type(newPasswordInput, "newpass");
    await user.type(confirmPasswordInput, "newpass");

    const submitButton = screen.getByRole("button", { name: /change/i });
    await waitFor(() => expect(submitButton).toBeEnabled());
    await user.click(submitButton);

    await waitFor(() =>
      expect(changePasswordMock).toHaveBeenCalledWith("token-123", {
        oldPassword: "oldpass",
        newPassword: "newpass",
        confirmPassword: "newpass",
      }),
    );
    await waitFor(() => expect(toastSuccessMock).toHaveBeenCalledWith("Password changed"));
  });

  it("shows error toast when token is missing", async () => {
    const user = userEvent.setup();
    localStorage.removeItem("access_token");
    renderChangePassword();
    const [oldPasswordInput, newPasswordInput, confirmPasswordInput] =
      screen.getAllByPlaceholderText(/password/i);

    await user.type(oldPasswordInput, "oldpass");
    await user.type(newPasswordInput, "newpass");
    await user.type(confirmPasswordInput, "newpass");
    await user.click(screen.getByRole("button", { name: /change/i }));

    await waitFor(() =>
      expect(toastErrorMock).toHaveBeenCalledWith("Error! Password wasn't changed"),
    );
    expect(changePasswordMock).not.toHaveBeenCalled();
  });
});
