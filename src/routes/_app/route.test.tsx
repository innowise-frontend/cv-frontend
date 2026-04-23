import { beforeEach, describe, expect, it, vi } from "vitest";
import { Route } from "./route";

const redirectMock = vi.hoisted(() => vi.fn((options) => ({ type: "redirect", options })));

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: unknown) => options,
  redirect: (options: unknown) => redirectMock(options),
  Outlet: () => <div />,
}));

vi.mock("@components/Sidebar", () => ({
  Sidebar: () => <div />,
}));

const beforeLoad = (Route as unknown as { beforeLoad: (args: unknown) => unknown }).beforeLoad;

describe("routes/_app beforeLoad", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should allow navigation while auth is in first load", () => {
    const result = beforeLoad({
      context: { auth: { isFirstLoad: true, isAuthenticated: false } },
    });

    expect(result).toBeUndefined();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("should throw redirect to auth when user is unauthenticated", () => {
    try {
      beforeLoad({
        context: { auth: { isFirstLoad: false, isAuthenticated: false } },
      });
    } catch (error) {
      expect(redirectMock).toHaveBeenCalledWith({
        to: "/auth",
        search: { mode: "login" },
      });
      expect(error).toEqual({
        type: "redirect",
        options: {
          to: "/auth",
          search: { mode: "login" },
        },
      });

      return;
    }

    throw new Error("Expected beforeLoad to throw redirect");
  });

  it("should allow authenticated users", () => {
    const result = beforeLoad({
      context: { auth: { isFirstLoad: false, isAuthenticated: true } },
    });

    expect(result).toBeUndefined();
    expect(redirectMock).not.toHaveBeenCalled();
  });
});
