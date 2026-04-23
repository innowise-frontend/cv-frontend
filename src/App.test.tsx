import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

const invalidateMock = vi.hoisted(() => vi.fn());
const useAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@tanstack/react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@tanstack/react-router")>();

  return {
    ...actual,
    createRouter: () => ({
      invalidate: invalidateMock,
    }),
    RouterProvider: ({
      context,
    }: {
      context: { auth: { isAuthenticated: boolean; isFirstLoad: boolean } };
    }) => (
      <div data-testid="router-provider">
        {`${String(context.auth.isAuthenticated)}-${String(context.auth.isFirstLoad)}`}
      </div>
    ),
  };
});

vi.mock("./hooks/useAuth/useAuth", () => ({
  useAuth: () => useAuthMock(),
}));

vi.mock("./context/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("App", () => {
  it("passes auth state to RouterProvider context", () => {
    useAuthMock.mockReturnValue({ isAuthenticated: true, isFirstLoad: false, isAdmin: false });

    render(<App />);

    expect(screen.getByTestId("router-provider")).toHaveTextContent("true-false");
  });

  it("invalidates router on mount and auth dependency changes", () => {
    useAuthMock
      .mockReturnValueOnce({ isAuthenticated: false, isFirstLoad: true, isAdmin: false })
      .mockReturnValueOnce({ isAuthenticated: true, isFirstLoad: false, isAdmin: false });

    const { rerender } = render(<App />);
    const callsAfterMount = invalidateMock.mock.calls.length;
    rerender(<App />);

    expect(callsAfterMount).toBeGreaterThan(0);
    expect(invalidateMock.mock.calls.length).toBeGreaterThan(callsAfterMount);
  });
});
