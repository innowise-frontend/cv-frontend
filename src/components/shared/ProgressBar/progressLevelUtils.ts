import { Mastery, Proficiency } from "@root/services/graphql/__generated__/graphql";
import { MASTERY_ORDER, PROFICIENCY_ORDER, MASTERY_STYLES, PROFICIENCY_STYLES } from "./constants";
import { LevelBarStyles } from "./types";

function percentForIndex(index: number, total: number): number {
  if (index < 0 || total <= 0) return 0;

  return Math.round(((index + 1) / total) * 100);
}

export function createStylesMap<T extends string>(map: Record<T, Omit<LevelBarStyles, "value">>) {
  return map;
}

function getBarStyles<T extends string>(
  value: T,
  order: readonly T[],
  stylesMap: Record<T, Omit<LevelBarStyles, "value">>,
): LevelBarStyles {
  const index = order.indexOf(value);
  const percent = percentForIndex(index, order.length);

  const styles = stylesMap[value];

  return {
    value: percent,
    ...styles,
  };
}

export function getMasteryBarStyles(mastery: Mastery): LevelBarStyles {
  return getBarStyles(mastery, MASTERY_ORDER, MASTERY_STYLES);
}

export function getProficiencyBarStyles(proficiency: Proficiency): LevelBarStyles {
  return getBarStyles(proficiency, PROFICIENCY_ORDER, PROFICIENCY_STYLES);
}
