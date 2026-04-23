import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ROUTES } from "@root/constants/routes";
import { RenderWithQueryClient, renderWithFileRoutes } from "@root/lib/testUtils";
import { VerifyEmailPage } from "./VerifyEmailPage";
import type { ReactNode } from "react";

const verifyMailMock = vi.fn<(code: string) => Promise<void>>();
const navigateMock = vi.fn();

vi.mock("@services/auth", () => ({
  verifyMail: (code: string): Promise<void> => verifyMailMock(code),
}));

vi.mock("@components/shared", () => ({
  Button: ({
    children,
    disabled,
    onClick,
    type,
  }: {
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit";
  }) => (
    <button type={type ?? "button"} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
  CodeInput: ({
    value,
    onChange,
    error,
  }: {
    value: string;
    onChange: (value: string) => void;
    error: boolean;
  }) => (
    <div>
      <input
        aria-label="Verification code"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <p>Invalid code</p>}
    </div>
  ),
}));

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

async function renderPage() {
  return renderWithFileRoutes(
    <RenderWithQueryClient>
      <VerifyEmailPage />
    </RenderWithQueryClient>,
  );
}

describe("VerifyEmailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders content and keeps confirm disabled until code has 6 characters", async () => {
    const user = userEvent.setup();
    await renderPage();

    expect(screen.getByText("Email verification")).toBeInTheDocument();
    expect(
      screen.getByText("Enter the verification code we sent to your email."),
    ).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    expect(confirmButton).toBeDisabled();

    await user.type(screen.getByLabelText("Verification code"), "12345");
    expect(confirmButton).toBeDisabled();

    await user.type(screen.getByLabelText("Verification code"), "6");
    expect(confirmButton).toBeEnabled();
  });

  it("submits code and navigates to profile on success", async () => {
    const user = userEvent.setup();
    verifyMailMock.mockResolvedValueOnce(undefined);
    await renderPage();

    await user.type(screen.getByLabelText("Verification code"), "123456");
    await user.click(screen.getByRole("button", { name: "Confirm" }));

    await waitFor(() => expect(verifyMailMock).toHaveBeenCalledTimes(1));
    expect(verifyMailMock).toHaveBeenCalledWith("123456");
    expect(navigateMock).toHaveBeenCalledWith({ to: ROUTES.PROFILE });
  });

  it("shows invalid code error when verification request fails", async () => {
    const user = userEvent.setup();
    verifyMailMock.mockRejectedValueOnce(new Error("Wrong otp"));
    await renderPage();

    await user.type(screen.getByLabelText("Verification code"), "000000");
    await user.click(screen.getByRole("button", { name: "Confirm" }));

    expect(await screen.findByText("Invalid code")).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("renders later button as link to root route", async () => {
    await renderPage();

    expect(screen.getByRole("link", { name: "Later" })).toHaveAttribute("href", ROUTES.ROOT);
  });
});
