import { useMemo } from "react";
import { de, enUS, es, fr, it, pl, pt, ru } from "react-day-picker/locale";
import { useTranslation } from "react-i18next";
import type { DayPickerLocale, Labels } from "react-day-picker";

const CALENDAR_LOCALES: Record<string, DayPickerLocale> = {
  en: enUS,
  ru,
  de,
  pl,
  it,
  es,
  fr,
  pt,
};

export const getCalendarLocale = (language: string): DayPickerLocale => {
  const languageCode = language.split("-")[0] ?? "en";

  return CALENDAR_LOCALES[languageCode] ?? enUS;
};

export const useCalendarConfig = () => {
  const { i18n, t } = useTranslation();

  const locale = useMemo(() => getCalendarLocale(i18n.language), [i18n.language]);

  const labels = useMemo<Partial<Labels>>(
    () => ({
      labelPrevious: () => t("page.calendar.previousMonth"),
      labelNext: () => t("page.calendar.nextMonth"),
    }),
    [t],
  );

  return { locale, labels };
};
