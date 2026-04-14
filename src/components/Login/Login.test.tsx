import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClientError } from "graphql-request";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RenderWithQueryClient } from "@root/lib/testUtils";
import { Login } from "./Login";
import type { GraphQLError } from "graphql";

const mockNavigate = vi.hoisted(() => vi.fn());
const loginMock = vi.hoisted(() => vi.fn());
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

vi.mock("@services/auth/login", () => ({
  login: (...args: unknown[]) => loginMock(...args),
}));

function renderLogin() {
  return render(
    <RenderWithQueryClient>
      <Login />
    </RenderWithQueryClient>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    loginMock.mockReset();
    localStorage.clear();
  });

  it("should render welcome copy, the auth form, and forgot password link", () => {
    renderLogin();

    expect(screen.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    expect(screen.getByText("Hello again! Sign in to continue")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();

    const forgot = screen.getByRole("link", { name: "Forgot password" });
    expect(forgot).toHaveAttribute("href", "/forgot-password");
  });

  it.each([{ role: "admin" as const }, { role: "user" as const }])(
    "should store token, persist role $role, and navigate home on successful login",
    async ({ role }) => {
      const user = userEvent.setup();
      loginMock.mockResolvedValue({
        access_token: "jwt-token",
        user: { role },
      });

      renderLogin();

      await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
      await user.type(screen.getByPlaceholderText("Password"), "secret12");
      await user.click(screen.getByRole("button", { name: "Sign in" }));

      await waitFor(() => {
        expect(loginMock).toHaveBeenCalledWith({
          email: "user@example.com",
          password: "secret12",
        });
      });

      await waitFor(() => {
        expect(localStorage.getItem("access_token")).toBe("jwt-token");
        expect(localStorage.getItem("role")).toBe(role);
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
        errors: [{ message: "Invalid credentials" } as GraphQLError],
      },
      { query: "{}" },
    );
    loginMock.mockRejectedValue(clientError);

    renderLogin();

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret12");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Invalid credentials");
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should show a toast with Error.message for non-GraphQL failures", async () => {
    const user = userEvent.setup();
    loginMock.mockRejectedValue(new Error("Network down"));

    renderLogin();

    await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret12");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Network down");
    });
  });
});
