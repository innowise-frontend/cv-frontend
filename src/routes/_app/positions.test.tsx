import { beforeEach, describe, expect, it, vi } from "vitest";
import { Route } from "./positions";

const notFoundMock = vi.hoisted(() =>
  vi.fn(() => {
    throw { type: "notFound" };
  }),
);

vi.mock("@tanstack/react-router", async () => {
  const actual =
    await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");

  return {
    ...actual,
    createFileRoute: () => (options: unknown) => options,
    notFound: () => notFoundMock(),
    isNotFound: (error: unknown) =>
      typeof error === "object" && error !== null && "type" in error && error.type === "notFound",
  };
});

vi.mock("@pages/PositionsPage", () => ({
  PositionsPage: () => <div />,
}));

const beforeLoad = (Route as unknown as { beforeLoad: (args: unknown) => unknown }).beforeLoad;
const errorComponent = (Route as unknown as { errorComponent: (args: unknown) => unknown })
  .errorComponent;

describe("routes/_app/positions beforeLoad", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw notFound for non-admin users", () => {
    expect(() =>
      beforeLoad({
        context: { auth: { isAdmin: false } },
      }),
    ).toThrow();

    expect(notFoundMock).toHaveBeenCalled();
  });

  it("should allow admin users", () => {
    const result = beforeLoad({
      context: { auth: { isAdmin: true } },
    });

    expect(result).toBeUndefined();
    expect(notFoundMock).not.toHaveBeenCalled();
  });
});

describe("routes/_app/positions errorComponent", () => {
  it("should rethrow notFound errors", () => {
    const notFoundError = { type: "notFound" };

    expect(() => errorComponent({ error: notFoundError })).toThrow(notFoundError);
  });

  it("should not throw for other errors", () => {
    expect(() => errorComponent({ error: new Error("other") })).not.toThrow();
  });
});
