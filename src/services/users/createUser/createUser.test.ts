import { describe, expect, it, vi } from "vitest";
import type { CreateUserInput } from "@services/graphql/__generated__/graphql";
import { createUser } from "./createUser";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  CreateUserDocument: "CREATE_USER_DOCUMENT",
}));

describe("createUser service", () => {
  it("should send create user mutation and return created user", async () => {
    const created = { id: "user-1", email: "a@b.com" };
    requestWithAuthMock.mockResolvedValue({ createUser: created });

    const input = {
      auth: { email: "a@b.com", password: "secret12" },
      profile: { first_name: "A", last_name: "B" },
      departmentId: "d1",
      positionId: "p1",
      role: "Employee",
      cvsIds: [],
    } as CreateUserInput;

    const result = await createUser(input);

    expect(requestWithAuthMock).toHaveBeenCalledWith("CREATE_USER_DOCUMENT", {
      user: input,
    });
    expect(result).toEqual(created);
  });
});
