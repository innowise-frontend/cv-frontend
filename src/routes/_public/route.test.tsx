import { beforeEach, describe, expect, it, vi } from "vitest";
import { Route } from "./route";

const redirectMock = vi.hoisted(() => vi.fn((options) => ({ type: "redirect", options })));

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => options,
  redirect: (options: unknown) => redirectMock(options),
  Outlet: () => <div />,
}));

const beforeLoad = (Route as unknown as { beforeLoad: (args: unknown) => unknown }).beforeLoad;

describe("routes/_public beforeLoad", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should allow unauthenticated users", () => {
    const result = beforeLoad({
      context: { auth: { isAuthenticated: false } },
      location: { pathname: "/auth" },
    });

    expect(result).toBeUndefined();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("should allow authenticated users on verify-email route", () => {
    const result = beforeLoad({
      context: { auth: { isAuthenticated: true } },
      location: { pathname: "/verify-email" },
    });

    expect(result).toBeUndefined();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("should allow authenticated users on not-found route", () => {
    const result = beforeLoad({
      context: { auth: { isAuthenticated: true } },
      location: { pathname: "/not-found" },
    });

    expect(result).toBeUndefined();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("should redirect authenticated users away from public routes", () => {
    try {
      beforeLoad({
        context: { auth: { isAuthenticated: true } },
        location: { pathname: "/auth" },
      });
    } catch (error) {
      expect(redirectMock).toHaveBeenCalledWith({
        to: "/",
        search: { search: undefined },
      });
      expect(error).toEqual({
        type: "redirect",
        options: {
          to: "/",
          search: { search: undefined },
        },
      });

      return;
    }

    throw new Error("Expected beforeLoad to throw redirect");
  });
});
