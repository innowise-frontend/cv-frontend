import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClientError } from "graphql-request";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RenderWithQueryClient } from "@root/lib/testUtils";
import { Signup } from "./Signup";
import type { GraphQLError } from "graphql";

const mockNavigate = vi.hoisted(() => vi.fn());
const signupMock = vi.hoisted(() => vi.fn());
const toastError = vi.hoisted(() => vi.fn());
const getMeMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
  useNavigate: () => mockNavigate,
}));

vi.mock("sonner", () => ({
  toast: {
    error: (...args: unknown[]) => toastError(...args),
  },
}));

vi.mock("@services/auth", () => ({
  signup: (...args: unknown[]) => signupMock(...args),
  getMe: (...args: unknown[]) => getMeMock(...args),
}));

vi.mock("@components/AuthForm", () => ({
  AuthForm: ({
    onSubmit,
    label,
  }: {
    onSubmit: (data: { email: string; password: string; confirmPassword?: string }) => void;
    label: string;
  }) => (
    <button
      type="button"
      onClick={() =>
        onSubmit({
          email: "new@example.com",
          password: "secret12",
          confirmPassword: "secret12",
        })
      }
    >
      {label}
    </button>
  ),
  AuthFormValues: {},
}));

function renderSignup() {
  return render(
    <RenderWithQueryClient>
      <Signup />
    </RenderWithQueryClient>,
  );
}

async function submitSignupForm() {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Create account" }));
}

const readStored = (key: string) => JSON.parse(localStorage.getItem(key) ?? "null");

describe("Signup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    signupMock.mockReset();
    getMeMock.mockReset();
    getMeMock.mockResolvedValue({ id: "user-id", role: "USER" });
    localStorage.clear();
  });

  it("renders title, form controls, and login switch button", () => {
    renderSignup();

    expect(screen.getByRole("heading", { name: "Sign up now" })).toBeInTheDocument();
    expect(screen.getByText("Welcome! Sign up to continue")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "I have an account" })).toBeInTheDocument();
  });

  it("navigates to login mode when account switch button is clicked", async () => {
    const user = userEvent.setup();
    renderSignup();

    await user.click(screen.getByRole("button", { name: "I have an account" }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/auth",
      search: { mode: "login" },
    });
  });

  it.each([{ role: "admin" as const }, { role: "user" as const }])(
    "submits signup, stores tokens, prefetches me, and navigates home ($role)",
    async ({ role }) => {
      signupMock.mockResolvedValue({
        access_token: "jwt-token",
        refresh_token: "jwt-refresh-token",
        user: { role },
      });

      renderSignup();
      await submitSignupForm();

      await waitFor(() => {
        expect(signupMock).toHaveBeenCalledWith({
          email: "new@example.com",
          password: "secret12",
          confirmPassword: "secret12",
        });
      });

      await waitFor(() => {
        expect(readStored("access_token")).toBe("jwt-token");
        expect(readStored("refresh_token")).toBe("jwt-refresh-token");
        expect(getMeMock).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith({
          to: "/",
          search: expect.any(Function),
        });
      });

      const [navigateArg] = mockNavigate.mock.calls[0] as [{ search: (prev: object) => object }];
      expect(navigateArg.search({})).toEqual({ search: undefined });
    },
  );

  it("shows GraphQL error message from ClientError", async () => {
    const user = userEvent.setup();
    const clientError = new ClientError(
      {
        status: 400,
        headers: new Headers(),
        body: "{}",
        errors: [{ message: "Email already registered" } as GraphQLError],
      },
      { query: "{}" },
    );
    signupMock.mockRejectedValue(clientError);

    renderSignup();

    await user.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(expect.stringContaining("Email already registered"));
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("shows fallback error message for non-GraphQL failures", async () => {
    signupMock.mockRejectedValue(new Error("Network down"));

    renderSignup();
    await submitSignupForm();

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Network down");
    });
  });
});
