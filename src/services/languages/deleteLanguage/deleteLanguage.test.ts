import { describe, expect, it, vi } from "vitest";
import { deleteLanguage } from "./deleteLanguage";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  DeleteLanguageDocument: "DELETE_LANGUAGE_DOCUMENT",
}));

describe("deleteLanguage service", () => {
  it("sends delete payload and returns response", async () => {
    const language = { languageId: "1" } as const;
    requestWithAuthMock.mockResolvedValue({ deleteLanguage: true });

    const result = await deleteLanguage(language);

    expect(requestWithAuthMock).toHaveBeenCalledWith("DELETE_LANGUAGE_DOCUMENT", { language });
    expect(result).toBe(true);
  });
});
