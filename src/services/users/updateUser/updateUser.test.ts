import { describe, expect, it, vi } from "vitest";
import type { UpdateUserInput } from "@services/graphql/__generated__/graphql";
import { updateUser } from "./updateUser";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  UpdateUserDocument: "UPDATE_USER_DOCUMENT",
}));

describe("updateUser service", () => {
  it("should send update user mutation and return updated user", async () => {
    const updated = { id: "user-1", email: "new@b.com" };
    requestWithAuthMock.mockResolvedValue({ updateUser: updated });

    const input = {
      userId: "user-1",
      departmentId: "d1",
      positionId: "p1",
      role: "Admin",
    } as UpdateUserInput;

    const result = await updateUser(input);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_USER_DOCUMENT", {
      user: input,
    });
    expect(result).toEqual(updated);
  });
});
