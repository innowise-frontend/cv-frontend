import { Mastery, Proficiency } from "@root/services/graphql/__generated__/graphql";
import { createStylesMap } from "./progressLevelStyles";

export const MASTERY_ORDER: readonly Mastery[] = [
  Mastery.Novice,
  Mastery.Advanced,
  Mastery.Competent,
  Mastery.Proficient,
  Mastery.Expert,
];

export const PROFICIENCY_ORDER: readonly Proficiency[] = [
  Proficiency.A1,
  Proficiency.A2,
  Proficiency.B1,
  Proficiency.B2,
  Proficiency.C1,
  Proficiency.C2,
  Proficiency.Native,
];

export const COLORS = {
  gray: {
    trackClassName: "bg-gray-5 dark:bg-gray-4",
    indicatorClassName: "bg-gray-3",
  },
  blue: {
    trackClassName: "bg-blue-4 dark:bg-blue-2",
    indicatorClassName: "bg-blue-3",
  },
  green: {
    trackClassName: "bg-green-4 dark:bg-green-2",
    indicatorClassName: "bg-green-3",
  },
  yellow: {
    trackClassName: "bg-yellow-3 dark:bg-yellow-2",
    indicatorClassName: "bg-yellow",
  },
  red: {
    trackClassName: "bg-red",
    indicatorClassName: "bg-red",
  },
  default: {
    trackClassName: "bg-gray-5 dark:bg-gray-4",
    indicatorClassName: "bg-gray-5 dark:bg-gray-4",
  },
} as const;

export const MASTERY_STYLES = createStylesMap<Mastery>({
  [Mastery.Novice]: COLORS.gray,
  [Mastery.Advanced]: COLORS.blue,
  [Mastery.Competent]: COLORS.green,
  [Mastery.Proficient]: COLORS.yellow,
  [Mastery.Expert]: COLORS.red,
});

export const PROFICIENCY_STYLES = createStylesMap<Proficiency>({
  [Proficiency.A1]: COLORS.default,
  [Proficiency.A2]: COLORS.gray,
  [Proficiency.B1]: COLORS.blue,
  [Proficiency.B2]: COLORS.green,
  [Proficiency.C1]: COLORS.yellow,
  [Proficiency.C2]: COLORS.red,
  [Proficiency.Native]: COLORS.red,
});
