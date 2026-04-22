import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChangePassword } from "@components/ChangePassword";
import { Select } from "@components/shared/Select/Select";
import { getDefaultTheme, setDefaultTheme } from "@utils/theme";
import { LANGUAGES, THEMES } from "./constants";
import type { Theme } from "./types";

export function SettingPage() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<Theme>(getDefaultTheme() as Theme);
  const [language, setLanguage] = useState<string>(() => {
    const fallback = "en";
    const detected = (i18n.resolvedLanguage ?? i18n.language ?? fallback)
      .toLowerCase()
      .split("-")[0];
    const initial = detected || fallback;

    return LANGUAGES.some((l) => l.value === initial) ? initial : fallback;
  });

  const handleThemeChange = (value: string) => {
    const next = value as Theme;
    setTheme(next);
    setDefaultTheme(next);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    void i18n.changeLanguage(value);
  };

  const themesList = THEMES.map((item) => ({
    ...item,
    label: t(`theme.${item.value}`),
  }));

  return (
    <div className="flex flex-col mt-10 gap-8 mx-auto">
      <Select
        className="w-[852px]"
        label={t("page.setting.theme")}
        list={themesList}
        placeholder={t("page.setting.selectThemePlaceholder")}
        value={theme}
        onValueChange={handleThemeChange}
      />
      <Select
        className="w-[852px]"
        label={t("page.setting.language")}
        list={LANGUAGES}
        placeholder={t("page.setting.selectLanguagePlaceholder")}
        value={language}
        onValueChange={handleLanguageChange}
      />
      <ChangePassword className="mt-2" />
    </div>
  );
}
