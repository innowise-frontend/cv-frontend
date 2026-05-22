import type { TFunction } from "i18next";

export interface TabConfig {
  value: string;
  labelKey: string;
}

export const getTabs = (items: TabConfig[], t: TFunction) =>
  items.map(({ value, labelKey }) => ({ value, label: t(labelKey) }));
