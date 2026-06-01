import { describe, expect, it } from "vitest";
import {
  defaultProjectFormValues,
  getEnvironmentOptions,
  getSkillNamesFromSkillsData,
} from "./shared";

describe("defaultProjectFormValues", () => {
  it("provides empty defaults for all fields", () => {
    expect(defaultProjectFormValues).toEqual({
      name: "",
      domain: "",
      description: "",
      startDate: "",
      endDate: "",
      environment: [],
    });
  });
});

describe("getSkillNamesFromSkillsData", () => {
  it("returns unique trimmed skill names", () => {
    const result = getSkillNamesFromSkillsData({
      items: [
        { name: " React " },
        { name: "TypeScript" },
        { name: "React" },
        { name: "  " },
        { name: undefined },
      ],
    } as never);

    expect(result).toEqual(["React", "TypeScript"]);
  });

  it("returns empty array when skills data is missing", () => {
    expect(getSkillNamesFromSkillsData()).toEqual([]);
    expect(getSkillNamesFromSkillsData({ items: [] })).toEqual([]);
  });
});

describe("getEnvironmentOptions", () => {
  it("maps names to label/value options", () => {
    expect(getEnvironmentOptions(["React", "Node"])).toEqual([
      { label: "React", value: "React" },
      { label: "Node", value: "Node" },
    ]);
  });
});
