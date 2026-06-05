export const parseResponsibilities = (value: string): string[] =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const formatResponsibilities = (items: string[]): string => items.join(", ");
