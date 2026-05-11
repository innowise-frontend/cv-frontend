import { describe, expect, it, vi } from "vitest";
import { getUsers } from "./getUsers";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  UsersDocument: "USERS_DOCUMENT",
}));

describe("getUsers service", () => {
  it("should request users with provided search pagination params", async () => {
    requestWithAuthMock.mockResolvedValue({
      users: {
        items: [{ id: "1", first_name: "Anna" }],
        total_pages: 5,
      },
    });

    const params = {
      search: "anna",
      page: 2,
      limit: 20,
      sort_order: "ASC" as const,
      sort_by: "department" as const,
    };

    const result = await getUsers(params);

    expect(requestWithAuthMock).toHaveBeenCalledWith("USERS_DOCUMENT", {
      params,
    });
    expect(result).toEqual({
      items: [{ id: "1", first_name: "Anna" }],
      total_pages: 5,
    });
  });
});
