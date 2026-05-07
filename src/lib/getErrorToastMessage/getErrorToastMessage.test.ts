import { GraphQLError } from "graphql";
import { ClientError } from "graphql-request";
import { describe, expect, it, vi } from "vitest";
import { getErrorToastMessage } from "./getErrorToastMessage";

vi.mock("@root/i18n/i18n", () => ({
  default: {
    t: (key: string) => `translated:${key}`,
  },
}));

describe("getErrorToastMessage", () => {
  it("returns translated message for known client error code", () => {
    const error = new ClientError(
      {
        status: 403,
        headers: new Headers(),
        body: "{}",
        errors: [new GraphQLError("Forbidden", { extensions: { code: "FORBIDDEN" } })],
      },
      { query: "{}" },
    );

    expect(getErrorToastMessage(error)).toBe("translated:page.error.api.forbidden");
  });

  it("returns raw error message when no mapped code is found", () => {
    expect(getErrorToastMessage(new Error("Network down"))).toBe("Network down");
  });

  it("returns default translated message for unknown values", () => {
    expect(getErrorToastMessage("oops")).toBe("translated:page.error.api.default");
  });
});
