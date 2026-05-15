import { describe, expect, it, vi } from "vitest";
import { deleteUser } from "./deleteUser";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  DeleteUserDocument: "DELETE_USER_DOCUMENT",
}));

describe("deleteUser service", () => {
  it("should send delete user mutation with user id", async () => {
    const deleted = { id: "user-9", email: "gone@b.com" };
    requestWithAuthMock.mockResolvedValue({ deleteUser: deleted });

    const result = await deleteUser("user-9");

    expect(requestWithAuthMock).toHaveBeenCalledWith("DELETE_USER_DOCUMENT", {
      userId: "user-9",
    });
    expect(result).toEqual(deleted);
  });
});
