import { describe, expect, it, vi } from "vitest";
import { updateSkill } from "./updateSkill";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  UpdateSkillDocument: "UPDATE_SKILL_DOCUMENT",
}));

describe("updateSkill", () => {
  it("calls requestWithAuth with the skill input and returns updated skill", async () => {
    const skill = { skillId: "s1", name: "TypeScript", categoryId: "c1" };
    const updated = { id: "s1", name: "TypeScript" };
    requestWithAuthMock.mockResolvedValue({ updateSkill: updated });

    const result = await updateSkill(skill);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_SKILL_DOCUMENT", { skill });
    expect(result).toEqual(updated);
  });
});
