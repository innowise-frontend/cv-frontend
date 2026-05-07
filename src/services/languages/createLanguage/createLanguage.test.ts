import { describe, expect, it, vi } from "vitest";
import { createLanguage } from "./createLanguage";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  CreateLanguageDocument: "CREATE_LANGUAGE_DOCUMENT",
}));

describe("createLanguage service", () => {
  it("sends create payload and returns created language", async () => {
    const language = { name: "English", iso2: "en", native_name: "English" } as const;
    requestWithAuthMock.mockResolvedValue({ createLanguage: { id: "1", ...language } });

    const result = await createLanguage(language);

    expect(requestWithAuthMock).toHaveBeenCalledWith("CREATE_LANGUAGE_DOCUMENT", { language });
    expect(result).toEqual({ id: "1", ...language });
  });
});
