import { describe, expect, it, vi } from "vitest";
import {
  Mastery,
  type UpdateProfileSkillInput,
} from "@root/services/graphql/__generated__/graphql";
import { updateProfileSkill } from "./updateProfileSkill";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@root/services/graphql/__generated__/graphql")>();

  return {
    ...actual,
    UpdateProfileSkillDocument: "UPDATE_PROFILE_SKILL_DOCUMENT",
  };
});

describe("updateProfileSkill", () => {
  it("calls requestWithAuth with the skill input and returns the result", async () => {
    const skill: UpdateProfileSkillInput = {
      userId: "u1",
      name: "React",
      mastery: Mastery.Expert,
      categoryId: "c1",
    };
    const updated = { name: "React", mastery: "Expert" };
    requestWithAuthMock.mockResolvedValue({ updateProfileSkill: updated });

    const result = await updateProfileSkill(skill);

    expect(requestWithAuthMock).toHaveBeenCalledWith("UPDATE_PROFILE_SKILL_DOCUMENT", { skill });
    expect(result).toEqual(updated);
  });
});
