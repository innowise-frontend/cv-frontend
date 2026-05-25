import { describe, expect, it, vi } from "vitest";
import { createSkill } from "./createSkill";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  CreateSkillDocument: "CREATE_SKILL_DOCUMENT",
}));

describe("createSkill", () => {
  it("calls requestWithAuth with the skill input and returns created skill", async () => {
    const skill = { name: "TypeScript", categoryId: "c1" };
    const created = { id: "s1", name: "TypeScript" };
    requestWithAuthMock.mockResolvedValue({ createSkill: created });

    const result = await createSkill(skill);

    expect(requestWithAuthMock).toHaveBeenCalledWith("CREATE_SKILL_DOCUMENT", { skill });
    expect(result).toEqual(created);
  });
});
