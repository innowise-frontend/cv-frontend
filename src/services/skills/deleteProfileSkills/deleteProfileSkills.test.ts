import { describe, expect, it, vi } from "vitest";
import { deleteProfileSkills } from "./deleteProfileSkills";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", () => ({
  DeleteProfileSkillDocument: "DELETE_PROFILE_SKILL_DOCUMENT",
}));

describe("deleteProfileSkills", () => {
  it("calls requestWithAuth with the skill input and returns the result", async () => {
    const skill = { userId: "u1", name: ["React", "Vue"] };
    const deleted = { affected: 2 };
    requestWithAuthMock.mockResolvedValue({ deleteProfileSkill: deleted });

    const result = await deleteProfileSkills(skill);

    expect(requestWithAuthMock).toHaveBeenCalledWith("DELETE_PROFILE_SKILL_DOCUMENT", { skill });
    expect(result).toEqual(deleted);
  });
});
