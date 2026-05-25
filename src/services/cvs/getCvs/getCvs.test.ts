import { describe, expect, it, vi } from "vitest";
import { getCvs } from "./getCvs";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  CvsDocument: "CVS_DOCUMENT",
}));

describe("getCvs", () => {
  it("requests all cvs with pagination params", async () => {
    const params = {
      search: "dev",
      page: 1,
      limit: 10,
      sort_order: "ASC",
      sort_by: "name",
    } as const;
    const paginated = { items: [{ id: "cv-1", name: "CV 1" }], total_pages: 1 };
    requestWithAuthMock.mockResolvedValue({ cvs: paginated });

    const result = await getCvs(params);

    expect(requestWithAuthMock).toHaveBeenCalledWith("CVS_DOCUMENT", { params });
    expect(result).toEqual(paginated);
  });
});
