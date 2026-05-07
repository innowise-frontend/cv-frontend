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
  login: (...args: unknown[]) => loginMock(...args),
  getMe: (...args: unknown[]) => getMeMock(...args),
}));

function renderLogin() {
  return render(
    <RenderWithQueryClient>
      <Login />
    </RenderWithQueryClient>,
  );
}

async function submitLoginForm() {
  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText("Email"), "user@example.com");
  await user.type(screen.getByPlaceholderText("Password"), "secret12");
  await user.click(screen.getByRole("button", { name: "Sign in" }));
}

const readStored = (key: string) => JSON.parse(localStorage.getItem(key) ?? "null");

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    loginMock.mockReset();
    getMeMock.mockReset();
    getMeMock.mockResolvedValue({ id: "user-id", role: "USER" });
    localStorage.clear();
  });

  it("renders title, form controls, and forgot-password link", () => {
    renderLogin();

    expect(screen.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    expect(screen.getByText("Hello again! Sign in to continue")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();

    const forgot = screen.getByRole("link", { name: "Forgot password" });
    expect(forgot).toHaveAttribute("href", "/forgot-password");
  });

  it("submits credentials, stores tokens, prefetches me, and navigates home", async () => {
    loginMock.mockResolvedValue({
      access_token: "jwt-token",
      refresh_token: "jwt-refresh-token",
    });

    renderLogin();
    await submitLoginForm();

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "secret12",
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
  });

  it("shows GraphQL error message from ClientError", async () => {
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
    await submitLoginForm();

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith(expect.stringContaining("Invalid credentials"));
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("shows fallback error message for non-GraphQL failures", async () => {
    loginMock.mockRejectedValue(new Error("Network down"));

    renderLogin();
    await submitLoginForm();

    await waitFor(() => {
      expect(toastError).toHaveBeenCalledWith("Network down");
    });
  });
});
