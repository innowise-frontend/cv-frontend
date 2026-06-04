import { format, isAfter, isBefore, isValid, parse, startOfDay } from "date-fns";

const DISPLAY_FORMAT = "dd/MM/yyyy";

export const API_DATE_FORMAT = "yyyy-MM-dd";

const PARSE_FORMATS = ["dd/MM/yyyy", "yyyy-MM-dd", "MM/dd/yyyy", "d/M/yyyy", "d/M/yy"] as const;

export function parseProjectDate(value?: string | null): Date | undefined {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return undefined;

  for (const dateFormat of PARSE_FORMATS) {
    const date = parse(trimmed, dateFormat, new Date());
    if (isValid(date)) return date;
  }

  return undefined;
}

export function formatProjectDate(date: Date): string {
  return format(date, DISPLAY_FORMAT);
}

export function formatProjectDateDisplay(value?: string | null): string {
  const date = parseProjectDate(value);

  return date ? formatProjectDate(date) : "";
}

export function toApiProjectDate(value?: string | null): string | undefined {
  const date = parseProjectDate(value);

  return date ? format(date, API_DATE_FORMAT) : undefined;
}

export function toFormProjectDate(value?: string | null): string {
  if (!value?.trim()) return "";

  return formatProjectDateDisplay(value);
}

export function isDateInRange(date: Date, minDate?: Date, maxDate?: Date): boolean {
  const day = startOfDay(date);

  if (minDate && isBefore(day, startOfDay(minDate))) return false;
  if (maxDate && isAfter(day, startOfDay(maxDate))) return false;

  return true;
}

export function createDateDisabledMatcher(minDate?: Date, maxDate?: Date) {
  return (date: Date) => !isDateInRange(date, minDate, maxDate);
}
