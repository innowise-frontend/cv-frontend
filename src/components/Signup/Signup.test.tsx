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

vi.mock("@services/auth/signup", () => ({
  signup: (...args: unknown[]) => signupMock(...args),
}));

function renderSignup() {
  return render(
    <RenderWithQueryClient>
      <Signup />
    </RenderWithQueryClient>,
  );
}

describe("Signup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    signupMock.mockReset();
    localStorage.clear();
  });

  it("should render welcome copy, the auth form, and link to login", () => {
    renderSignup();

    expect(screen.getByRole("heading", { name: "Sign up now" })).toBeInTheDocument();
    expect(screen.getByText("Welcome! Sign up to continue")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create account" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "I have an account" })).toBeInTheDocument();
  });

  it("should navigate to login when I have an account is clicked", async () => {
    const user = userEvent.setup();
    renderSignup();

    await user.click(screen.getByRole("button", { name: "I have an account" }));

    expect(mockNavigate).toHaveBeenCalledWith({
      to: "/auth",
      search: { mode: "login" },
    });
  });

  it.each([{ role: "admin" as const }, { role: "user" as const }])(
    "should store token, persist role $role, and navigate home on successful signup",
    async ({ role }) => {
      const user = userEvent.setup();
      signupMock.mockResolvedValue({
        access_token: "jwt-token",
        user: { role },
      });

      renderSignup();

      await user.type(screen.getByPlaceholderText("Email"), "new@example.com");
      await user.type(screen.getByPlaceholderText("Password"), "secret12");
      await user.click(screen.getByRole("button", { name: "Create account" }));

      await waitFor(() => {
        expect(signupMock).toHaveBeenCalledWith({
          email: "new@example.com",
          password: "secret12",
        });
      });

      await waitFor(() => {
        expect(localStorage.getItem("access_token")).toBe("jwt-token");
        expect(mockNavigate).toHaveBeenCalledWith({ to: "/" });
      });
    },
  );

  it("should show a toast with the first GraphQL error message on ClientError", async () => {
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

    await user.type(screen.getByPlaceholderText("Email"), "taken@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret12");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Email already registered");
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should show a toast with Error.message for non-GraphQL failures", async () => {
    const user = userEvent.setup();
    signupMock.mockRejectedValue(new Error("Network down"));

    renderSignup();

    await user.type(screen.getByPlaceholderText("Email"), "new@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret12");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Network down");
    });
  });
});
