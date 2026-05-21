import { describe, expect, it, vi } from "vitest";
import { Mastery, type AddProfileSkillInput } from "@root/services/graphql/__generated__/graphql";
import { addProfileSkill } from "./addProfileSkill";

const requestWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@root/services/graphql/client", () => ({
  requestWithAuth: (...args: unknown[]) => requestWithAuthMock(...args),
}));

vi.mock("@root/services/graphql/__generated__/graphql", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@root/services/graphql/__generated__/graphql")>();

  return {
    ...actual,
    AddProfileSkillDocument: "ADD_PROFILE_SKILL_DOCUMENT",
  };
});

describe("addProfileSkill", () => {
  it("calls requestWithAuth with the skill input and returns the result", async () => {
    const skill: AddProfileSkillInput = {
      userId: "u1",
      name: "React",
      mastery: Mastery.Expert,
      categoryId: "c1",
    };
    const added = { name: "React", mastery: "Expert" };
    requestWithAuthMock.mockResolvedValue({ addProfileSkill: added });

    const result = await addProfileSkill(skill);

    expect(requestWithAuthMock).toHaveBeenCalledWith("ADD_PROFILE_SKILL_DOCUMENT", { skill });
    expect(result).toEqual(added);
  });
});
