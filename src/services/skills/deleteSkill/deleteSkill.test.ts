import { describe, expect, it, vi } from "vitest";
import { deleteSkill } from "./deleteSkill";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@services/graphql/__generated__/graphql", () => ({
  DeleteSkillDocument: "DELETE_SKILL_DOCUMENT",
}));

describe("deleteSkill", () => {
  it("calls requestWithAuth with the skill input and returns delete result", async () => {
    const skill = { skillId: "s1" };
    const deleteResult = { affected: 1 };
    requestWithAuthMock.mockResolvedValue({ deleteSkill: deleteResult });

    const result = await deleteSkill(skill);

    expect(requestWithAuthMock).toHaveBeenCalledWith("DELETE_SKILL_DOCUMENT", { skill });
    expect(result).toEqual(deleteResult);
  });
});
