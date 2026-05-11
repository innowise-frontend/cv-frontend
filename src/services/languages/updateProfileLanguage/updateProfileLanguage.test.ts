import { describe, expect, it, vi } from "vitest";
import { Proficiency } from "@root/services/graphql/__generated__/graphql";
import { updateProfileLanguage } from "./updateProfileLanguage";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  UpdateProfileLanguageDocument: "UPDATE_PROFILE_LANGUAGE_DOCUMENT",
  Proficiency: {
    C1: "C1",
  },
}));

describe("updateProfileLanguage service", () => {
  it("sends update payload and returns updated profile language", async () => {
    const language = { userId: "u-1", name: "English", proficiency: Proficiency.C1 };
    requestWithAuthMock.mockResolvedValue({ updateProfileLanguage: { ok: true } });

    const result = await updateProfileLanguage(language);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_PROFILE_LANGUAGE_DOCUMENT", {
      language,
    });
    expect(result).toEqual({ ok: true });
  });
});
