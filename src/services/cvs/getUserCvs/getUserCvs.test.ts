import { describe, expect, it, vi } from "vitest";
import { getUserCvs } from "./getUserCvs";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  CvsByUserIdDocument: "CVS_BY_USER_ID_DOCUMENT",
}));

describe("getUserCvs", () => {
  it("requests cvs for a specific user", async () => {
    const params = {
      search: "",
      page: 1,
      limit: 10,
      sort_order: "ASC",
      sort_by: "name",
    } as const;
    const paginated = { items: [{ id: "cv-1", name: "CV 1" }], total_pages: 1 };
    requestWithAuthMock.mockResolvedValue({ cvsByUserId: paginated });

    const result = await getUserCvs("user-42", params);

    expect(requestWithAuthMock).toHaveBeenCalledWith("CVS_BY_USER_ID_DOCUMENT", {
      params,
      userId: "user-42",
    });
    expect(result).toEqual(paginated);
  });
});
