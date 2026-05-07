import { describe, expect, it, vi } from "vitest";
import { Proficiency } from "@root/services/graphql/__generated__/graphql";
import { addProfileLanguage } from "./addProfileLanguage";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  AddProfileLanguageDocument: "ADD_PROFILE_LANGUAGE_DOCUMENT",
  Proficiency: {
    B2: "B2",
  },
}));

describe("addProfileLanguage service", () => {
  it("sends language payload and returns created profile language", async () => {
    const language = { userId: "u-1", name: "English", proficiency: Proficiency.B2 } as const;
    requestWithAuthMock.mockResolvedValue({ addProfileLanguage: { ok: true } });

    const result = await addProfileLanguage(language);

    expect(requestWithAuthMock).toHaveBeenCalledWith("ADD_PROFILE_LANGUAGE_DOCUMENT", { language });
    expect(result).toEqual({ ok: true });
  });
});
