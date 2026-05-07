import { describe, expect, it, vi } from "vitest";
import { sendVerification } from "./sendVerification";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  SendVerificationDocument: "SEND_VERIFICATION_DOCUMENT",
}));

describe("sendVerification service", () => {
  it("trims email and sends verification request", async () => {
    requestWithAuthMock.mockResolvedValue(undefined);

    await sendVerification("  user@example.com  ");

    expect(requestWithAuthMock).toHaveBeenCalledWith("SEND_VERIFICATION_DOCUMENT", {
      email: "user@example.com",
    });
  });
});
