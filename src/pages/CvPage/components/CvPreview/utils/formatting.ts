import { format } from "date-fns";
import { parseProjectDate } from "@components/shared";

export const formatCvPreviewMonthYear = (value?: string | null): string => {
  const date = parseProjectDate(value);

  return date ? format(date, "MM.yyyy") : (value ?? "");
};

export const hasProjectEndDate = (endDate?: string | null): boolean =>
  Boolean(endDate?.trim() && parseProjectDate(endDate));

export const formatCvPreviewPeriod = (
  startDate: string,
  endDate: string | null | undefined,
  tillNowLabel: string,
): string => {
  const start = formatCvPreviewMonthYear(startDate);

  if (!hasProjectEndDate(endDate)) {
    return `${start} – ${tillNowLabel}`;
  }

  return `${start} – ${formatCvPreviewMonthYear(endDate)}`;
};

export const formatSkillMetric = (value: number | null): string =>
  value === null ? "—" : String(value);
