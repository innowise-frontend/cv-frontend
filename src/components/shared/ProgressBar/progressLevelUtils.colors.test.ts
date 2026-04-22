import { describe, expect, it } from "vitest";
import { Mastery, Proficiency } from "@root/services/graphql/__generated__/graphql";
import { COLORS, MASTERY_STYLES, PROFICIENCY_STYLES } from "./constants";

describe("Progress level color mapping", () => {
  describe("MASTERY_STYLES", () => {
    it("matches expected colors for each mastery level", () => {
      expect(MASTERY_STYLES[Mastery.Novice]).toEqual(COLORS.gray);
      expect(MASTERY_STYLES[Mastery.Advanced]).toEqual(COLORS.blue);
      expect(MASTERY_STYLES[Mastery.Competent]).toEqual(COLORS.green);
      expect(MASTERY_STYLES[Mastery.Proficient]).toEqual(COLORS.yellow);
      expect(MASTERY_STYLES[Mastery.Expert]).toEqual(COLORS.red);
    });
  });

  describe("PROFICIENCY_STYLES", () => {
    it("matches expected colors for each proficiency level", () => {
      expect(PROFICIENCY_STYLES[Proficiency.A1]).toEqual(COLORS.default);
      expect(PROFICIENCY_STYLES[Proficiency.A2]).toEqual(COLORS.gray);
      expect(PROFICIENCY_STYLES[Proficiency.B1]).toEqual(COLORS.blue);
      expect(PROFICIENCY_STYLES[Proficiency.B2]).toEqual(COLORS.green);
      expect(PROFICIENCY_STYLES[Proficiency.C1]).toEqual(COLORS.yellow);
      expect(PROFICIENCY_STYLES[Proficiency.C2]).toEqual(COLORS.red);
      expect(PROFICIENCY_STYLES[Proficiency.Native]).toEqual(COLORS.red);
    });
  });
});
