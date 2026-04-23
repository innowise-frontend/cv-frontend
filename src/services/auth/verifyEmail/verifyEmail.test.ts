import { describe, expect, it, vi } from "vitest";
import { verifyMail } from "./verifyEmail";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  VerifyMailDocument: "VERIFY_MAIL_DOCUMENT",
}));

describe("verifyMail service", () => {
  it("should trim otp and call authorized request", async () => {
    requestWithAuthMock.mockResolvedValue({});

    await verifyMail(" 123456 ");

    expect(requestWithAuthMock).toHaveBeenCalledWith("VERIFY_MAIL_DOCUMENT", {
      otp: "123456",
    });
  });
});
