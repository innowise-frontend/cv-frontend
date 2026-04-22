import { Mastery, Proficiency } from "@root/services/graphql/__generated__/graphql";

export type LevelBarStyles = {
  value: number;
  trackClassName: string;
  indicatorClassName: string;
};

export type ProgressBarProps =
  | {
      label: string;
      mastery: Mastery;
      proficiency?: undefined;
      className?: string;
    }
  | {
      label: string;
      proficiency: Proficiency;
      mastery?: undefined;
      className?: string;
    };
