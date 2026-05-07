import { describe, expect, it, vi } from "vitest";
import { updateLanguage } from "./updateLanguage";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  UpdateLanguageDocument: "UPDATE_LANGUAGE_DOCUMENT",
}));

describe("updateLanguage service", () => {
  it("sends update payload and returns updated language", async () => {
    const language = {
      languageId: "1",
      name: "German",
      iso2: "de",
      native_name: "Deutsch",
    } as const;
    requestWithAuthMock.mockResolvedValue({ updateLanguage: { id: "1", ...language } });

    const result = await updateLanguage(language);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_LANGUAGE_DOCUMENT", { language });
    expect(result).toEqual({ id: "1", ...language });
  });
});
