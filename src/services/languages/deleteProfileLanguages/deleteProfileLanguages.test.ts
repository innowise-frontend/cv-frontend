import { describe, expect, it, vi } from "vitest";
import { deleteProfileLanguages } from "./deleteProfileLanguages";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  DeleteProfileLanguageDocument: "DELETE_PROFILE_LANGUAGE_DOCUMENT",
}));

describe("deleteProfileLanguages service", () => {
  it("sends delete profile languages payload and returns response", async () => {
    const language = { userId: "u-1", name: ["English"] };
    requestWithAuthMock.mockResolvedValue({ deleteProfileLanguage: true });

    const result = await deleteProfileLanguages(language);

    expect(requestWithAuthMock).toHaveBeenCalledWith("DELETE_PROFILE_LANGUAGE_DOCUMENT", {
      language,
    });
    expect(result).toBe(true);
  });
});
