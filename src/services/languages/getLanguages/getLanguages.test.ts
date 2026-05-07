import { describe, expect, it, vi } from "vitest";
import { getLanguages } from "./getLanguages";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  LanguagesDocument: "LANGUAGES_DOCUMENT",
}));

describe("getLanguages service", () => {
  it("requests languages with pagination params", async () => {
    const params = {
      search: "eng",
      page: 1,
      limit: 20,
      sort_order: "ASC",
      sort_by: "name",
    } as const;
    requestWithAuthMock.mockResolvedValue({ languages: { items: [{ id: "1", name: "English" }] } });

    const result = await getLanguages(params);

    expect(requestWithAuthMock).toHaveBeenCalledWith("LANGUAGES_DOCUMENT", { params });
    expect(result).toEqual({ items: [{ id: "1", name: "English" }] });
  });
});
