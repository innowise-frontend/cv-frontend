import { describe, expect, it } from "vitest";
import { Mastery, Proficiency } from "@services/graphql/__generated__/graphql";
import { MASTERY_STYLES, PROFICIENCY_STYLES } from "./constants";
import {
  createStylesMap,
  getMasteryBarStyles,
  getProficiencyBarStyles,
} from "./progressLevelUtils";

describe("progressLevelUtils", () => {
  it("should return mastery styles with expected percentage values", () => {
    expect(getMasteryBarStyles(Mastery.Novice)).toEqual({
      value: 20,
      ...MASTERY_STYLES[Mastery.Novice],
    });
    expect(getMasteryBarStyles(Mastery.Expert)).toEqual({
      value: 100,
      ...MASTERY_STYLES[Mastery.Expert],
    });
  });

  it("should return proficiency styles with expected percentage values", () => {
    expect(getProficiencyBarStyles(Proficiency.A1)).toEqual({
      value: 14,
      ...PROFICIENCY_STYLES[Proficiency.A1],
    });
    expect(getProficiencyBarStyles(Proficiency.Native)).toEqual({
      value: 100,
      ...PROFICIENCY_STYLES[Proficiency.Native],
    });
  });

  it("should keep createStylesMap identity", () => {
    const map = {
      one: { trackClassName: "track-1", indicatorClassName: "indicator-1" },
      two: { trackClassName: "track-2", indicatorClassName: "indicator-2" },
    };

    expect(createStylesMap(map)).toEqual(map);
  });
});
